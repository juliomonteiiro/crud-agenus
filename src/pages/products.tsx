'use client'

import { useEffect, Suspense } from 'react'
import { Layout } from '@/components/layout/Layout'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { ProductList } from '@/components/products/ProductList'
import { ProductModal } from '@/components/products/ProductModal'
import { Button, Card, CardContent } from '@/components/ui'
import { useProductStore } from '@/stores/productStore'

function ProductContent() {
	const { 
		products, 
		isLoading, 
		fetchProducts, 
		isModalOpen,
		closeModal 
	} = useProductStore()

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	if (isLoading && products.length === 0) {
		return <ProductLoadingFallback />
	}

	return (
		<Layout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-foreground">Produtos</h1>
						<p className="text-muted-foreground mt-2">
							Gerencie seus produtos com operações CRUD completas
						</p>
					</div>
					<Button
						onClick={() => useProductStore.getState().openCreateModal()}
						variant="primary"
						size="lg"
					>
						+ Novo Produto
					</Button>
				</div>

				<ProductList />

				{isModalOpen && (
					<ProductModal onClose={closeModal} />
				)}
			</div>
		</Layout>
	)
}

function ProductLoadingFallback() {
	return (
		<Layout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
						<div className="h-4 w-96 bg-muted rounded animate-pulse" />
					</div>
					<div className="h-10 w-32 bg-muted rounded animate-pulse" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(6)].map((_, i) => (
						<Card key={i}>
							<CardContent className="p-6">
								<div className="h-48 bg-muted rounded mb-4 animate-pulse" />
								<div className="h-6 w-3/4 bg-muted rounded mb-2 animate-pulse" />
								<div className="h-4 w-full bg-muted rounded mb-4 animate-pulse" />
								<div className="flex gap-2">
									<div className="h-8 w-16 bg-muted rounded animate-pulse" />
									<div className="h-8 w-16 bg-muted rounded animate-pulse" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</Layout>
	)
}

export default function ProductsPage() {
	return (
		<AuthGuard>
			<Suspense fallback={<ProductLoadingFallback />}>
				<ProductContent />
			</Suspense>
		</AuthGuard>
	)
}
