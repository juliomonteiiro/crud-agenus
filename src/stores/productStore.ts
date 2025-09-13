import { create } from 'zustand'
import { ProductService } from '@/services/productService'
import type {
	Product,
	ProductListItem,
	CreateProductRequest,
	UpdateProductRequest,
	UpdateThumbnailRequest
} from '@/types/product'

interface ProductStore {
	products: ProductListItem[]
	currentProduct: Product | null
	isLoading: boolean
	error: string | null

	currentPage: number
	pageSize: number
	total: number
	totalPages: number

	searchQuery: string
	sortBy: 'title' | 'createdAt' | 'updatedAt' | 'status'
	sortOrder: 'asc' | 'desc'
	statusFilter: 'all' | 'active' | 'inactive'

	isModalOpen: boolean
	modalMode: 'create' | 'edit' | null
	editingProduct: Product | null

	fetchProducts: (page?: number, pageSize?: number) => Promise<void>
	fetchProduct: (id: string) => Promise<void>
	createProduct: (data: CreateProductRequest) => Promise<boolean>
	updateProduct: (id: string, data: UpdateProductRequest) => Promise<boolean>
	updateThumbnail: (id: string, data: UpdateThumbnailRequest) => Promise<boolean>
	deleteProduct: (id: string) => Promise<boolean>

	setSearchQuery: (query: string) => void
	setSortBy: (sortBy: 'title' | 'createdAt' | 'updatedAt' | 'status') => void
	setSortOrder: (order: 'asc' | 'desc') => void
	setStatusFilter: (filter: 'all' | 'active' | 'inactive') => void
	applyFilters: () => Promise<void>
	clearFilters: () => void

	openCreateModal: () => void
	openEditModal: (product: Product) => void
	closeModal: () => void

	clearError: () => void
	reset: () => void
}

export const useProductStore = create<ProductStore>()((set, get) => ({
	products: [],
	currentProduct: null,
	isLoading: false,
	error: null,

	currentPage: 1,
	pageSize: 10,
	total: 0,
	totalPages: 0,

	searchQuery: '',
	sortBy: 'updatedAt',
	sortOrder: 'desc',
	statusFilter: 'all',

	isModalOpen: false,
	modalMode: null,
	editingProduct: null,

	fetchProducts: async (page = 1, pageSize = 10) => {
		set({ isLoading: true, error: null })

		try {
			const response = await ProductService.getProducts(page, pageSize)
			set({
				products: response.data,
				currentPage: response.meta.page,
				pageSize: response.meta.pageSize,
				total: response.meta.total,
				totalPages: response.meta.totalPages,
				isLoading: false
			})
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar produtos'
			set({
				error: errorMessage,
				isLoading: false
			})
		}
	},

	fetchProduct: async (id: string) => {
		set({ isLoading: true, error: null })

		try {
			const response = await ProductService.getProduct(id)
			set({
				currentProduct: response.data,
				isLoading: false
			})
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar produto'
			set({
				error: errorMessage,
				isLoading: false
			})
		}
	},

	createProduct: async (data: CreateProductRequest) => {
		set({ isLoading: true, error: null })

		try {
			await ProductService.createProduct(data)

			await get().fetchProducts(get().currentPage, get().pageSize)

			set({ isLoading: false })
			return true
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : 'Erro ao criar produto'
			set({
				error: errorMessage,
				isLoading: false
			})
			return false
		}
	},

	updateProduct: async (id: string, data: UpdateProductRequest) => {
		set({ isLoading: true, error: null })

		try {
			await ProductService.updateProduct(id, data)

			await get().fetchProducts(get().currentPage, get().pageSize)

			set({ isLoading: false })
			return true
		} catch (error: unknown) {
			set({
				error: error instanceof Error ? error.message : 'Erro ao atualizar produto',
				isLoading: false
			})
			return false
		}
	},

	updateThumbnail: async (id: string, data: UpdateThumbnailRequest) => {
		set({ isLoading: true, error: null })

		try {
			await ProductService.updateThumbnail(id, data)
			if (get().currentProduct?.id === id) {
				await get().fetchProduct(id)
			}

			await get().fetchProducts(get().currentPage, get().pageSize)
			set({ isLoading: false })
			return true
		} catch (error: unknown) {
			set({
				error: error instanceof Error ? error.message : 'Erro ao atualizar thumbnail',
				isLoading: false
			})
			return false
		}
	},

	deleteProduct: async (id: string) => {
		set({ isLoading: true, error: null })

		try {
			await ProductService.deleteProduct(id)

			set(state => ({
				products: state.products.filter(product => product.id !== id),
				total: state.total - 1,
				isLoading: false
			}))

			return true
		} catch (error: unknown) {
			set({
				error: error instanceof Error ? error.message : 'Erro ao deletar produto',
				isLoading: false
			})
			return false
		}
	},

	openCreateModal: () => {
		set({
			isModalOpen: true,
			modalMode: 'create',
			editingProduct: null
		})
	},

	openEditModal: (product: Product) => {
		set({
			isModalOpen: true,
			modalMode: 'edit',
			editingProduct: product
		})
	},

	closeModal: () => {
		set({
			isModalOpen: false,
			modalMode: null,
			editingProduct: null,
			error: null
		})
	},

	clearError: () => {
		set({ error: null })
	},

	setSearchQuery: (query: string) => {
		set({ searchQuery: query })
	},

	setSortBy: (sortBy: 'title' | 'createdAt' | 'updatedAt' | 'status') => {
		set({ sortBy })
	},

	setSortOrder: (order: 'asc' | 'desc') => {
		set({ sortOrder: order })
	},

	setStatusFilter: (filter: 'all' | 'active' | 'inactive') => {
		set({ statusFilter: filter })
	},

	applyFilters: async () => {
		const { searchQuery, sortBy, sortOrder, statusFilter, currentPage, pageSize } = get()

		set({ isLoading: true, error: null })

		try {
			const allProductsResponse = await ProductService.getProducts(1, 1000)
			let filteredProducts = [...allProductsResponse.data]

			if (searchQuery) {
				filteredProducts = filteredProducts.filter(product =>
					product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.description.toLowerCase().includes(searchQuery.toLowerCase())
				)
			}

			if (statusFilter !== 'all') {
				filteredProducts = filteredProducts.filter(product =>
					statusFilter === 'active' ? product.status : !product.status
				)
			}

			filteredProducts.sort((a, b) => {
				let aValue: string | number, bValue: string | number

				switch (sortBy) {
					case 'title':
						aValue = a.title.toLowerCase()
						bValue = b.title.toLowerCase()
						break
					case 'createdAt':
						aValue = new Date(a.createdAt).getTime()
						bValue = new Date(b.createdAt).getTime()
						break
					case 'updatedAt':
						aValue = new Date(a.updatedAt).getTime()
						bValue = new Date(b.updatedAt).getTime()
						break
					case 'status':
						aValue = a.status ? 1 : 0
						bValue = b.status ? 1 : 0
						break
					default:
						return 0
				}

				if (sortOrder === 'asc') {
					return aValue > bValue ? 1 : -1
				} else {
					return aValue < bValue ? 1 : -1
				}
			})

			const startIndex = (currentPage - 1) * pageSize
			const endIndex = startIndex + pageSize
			const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

			set({
				products: paginatedProducts,
				total: filteredProducts.length,
				totalPages: Math.ceil(filteredProducts.length / pageSize),
				isLoading: false
			})
		} catch (error: unknown) {
			set({
				error: error instanceof Error ? error.message : 'Erro ao aplicar filtros',
				isLoading: false
			})
		}
	},

	clearFilters: async () => {
		set({
			searchQuery: '',
			sortBy: 'updatedAt',
			sortOrder: 'desc',
			statusFilter: 'all',
			currentPage: 1
		})
		await get().fetchProducts()
	},

	reset: () => {
		set({
			products: [],
			currentProduct: null,
			isLoading: false,
			error: null,
			currentPage: 1,
			pageSize: 10,
			total: 0,
			totalPages: 0,
			searchQuery: '',
			sortBy: 'updatedAt',
			sortOrder: 'desc',
			statusFilter: 'all',
			isModalOpen: false,
			modalMode: null,
			editingProduct: null
		})
	}
}))

