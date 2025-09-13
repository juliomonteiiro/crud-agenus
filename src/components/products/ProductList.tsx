'use client'

import { useProductStore } from '@/stores/productStore'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductFilters } from '@/components/products/ProductFilters'
import { ProductPagination } from '@/components/products/ProductPagination'
import { Button, Card, CardContent, ConfirmationModal } from '@/components/ui'
import { useState } from 'react'

export function ProductList() {
	const {
		products,
		isLoading,
		error,
		currentPage,
		fetchProducts
	} = useProductStore()

	const [deletingId, setDeletingId] = useState<string | null>(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [productToDelete, setProductToDelete] = useState<{ id: string; title: string } | null>(null)

	const handleDeleteClick = (id: string, title: string) => {
		setProductToDelete({ id, title })
		setShowDeleteModal(true)
	}

	const handleDeleteConfirm = async () => {
		if (!productToDelete) return

		setDeletingId(productToDelete.id)
		const success = await useProductStore.getState().deleteProduct(productToDelete.id)
		setDeletingId(null)
		setShowDeleteModal(false)
		setProductToDelete(null)

		if (success) {
			if (products.length === 1 && currentPage > 1) {
				await fetchProducts(currentPage - 1)
			}
		}
	}

	const handleDeleteCancel = () => {
		setShowDeleteModal(false)
		setProductToDelete(null)
	}


	if (error) {
		return (
			<Card>
				<CardContent className="text-center">
					<div className="text-destructive mb-4">
						<svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
						</svg>
						<p className="text-lg font-medium">Erro ao carregar produtos</p>
					</div>
					<p className="text-muted-foreground mb-4">{error}</p>
					<Button
						onClick={() => fetchProducts(currentPage)}
						variant="primary"
					>
						Tentar novamente
					</Button>
				</CardContent>
			</Card>
		)
	}

	if (products.length === 0 && !isLoading) {
		const { searchQuery, statusFilter } = useProductStore.getState()
		const hasFilters = searchQuery || statusFilter !== 'all'

		return (
			<Card>
				<CardContent className="text-center py-12">
					<div className="text-muted-foreground mb-6">
						<svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<p className="text-xl font-medium mb-2">
							{hasFilters ? 'Nenhum produto encontrado com os filtros aplicados' : 'Nenhum produto encontrado'}
						</p>
						<p className="text-muted-foreground">
							{hasFilters
								? 'Tente ajustar os filtros de busca ou limpe os filtros para ver todos os produtos.'
								: 'Comece criando seu primeiro produto!'
							}
						</p>
					</div>
					{hasFilters ? (
						<div className="flex gap-3 justify-center">
							<Button
								onClick={() => useProductStore.getState().clearFilters()}
								variant="outline"
							>
								Limpar Filtros
							</Button>
							<Button
								onClick={() => useProductStore.getState().openCreateModal()}
								variant="primary"
							>
								+ Criar Produto
							</Button>
						</div>
					) : (
						<Button
							onClick={() => useProductStore.getState().openCreateModal()}
							variant="primary"
						>
							+ Criar primeiro produto
						</Button>
					)}
				</CardContent>
			</Card>
		)
	}

	return (
		<div className="space-y-6">

			<ProductFilters />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product) => (
					<ProductCard
						key={`${product.id}-${product.updatedAt}`}
						product={product}
						onEdit={() => {
							useProductStore.getState().fetchProduct(product.id).then(() => {
								const currentProduct = useProductStore.getState().currentProduct
								if (currentProduct) {
									useProductStore.getState().openEditModal(currentProduct)
								}
							})
						}}
						onDelete={() => handleDeleteClick(product.id, product.title)}
						isDeleting={deletingId === product.id}
					/>
				))}
			</div>

			<ProductPagination />

			<ConfirmationModal
				isOpen={showDeleteModal}
				onClose={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				title="Excluir produto"
				message={`Tem certeza que deseja excluir o produto "${productToDelete?.title}"? Esta ação não pode ser desfeita.`}
				confirmText="Excluir"
				cancelText="Cancelar"
				variant="danger"
				isLoading={deletingId === productToDelete?.id}
			/>
		</div>
	)
}
