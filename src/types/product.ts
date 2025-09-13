export interface Thumbnail {
	id: string
	url: string
	size: number
	originalName: string
	mimeType: string
	key: string
	userId: string
	idModule: string | null
	createdAt: string
	updatedAt: string
}

export interface Product {
	id: string
	userId: string
	title: string
	description: string
	status: boolean
	idThumbnail: string
	createdAt: string
	updatedAt: string
	thumbnail?: Thumbnail
}

export interface ProductListItem {
	id: string
	title: string
	description: string
	status: boolean
	updatedAt: string
	createdAt: string
}

export interface ProductsResponse {
	data: ProductListItem[]
	meta: {
		page: number
		pageSize: number
		total: number
		totalPages: number
	}
}

export interface ProductResponse {
	data: Product
}

export interface ApiResponse {
	codeIntern: string
	message: string
	id?: string
}

export interface CreateProductRequest {
	title: string
	description: string
	thumbnail?: File
}

export interface UpdateProductRequest {
	title: string
	description: string
	status: boolean
}

export interface UpdateThumbnailRequest {
	thumbnail: File
}

