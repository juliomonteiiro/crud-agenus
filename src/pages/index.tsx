'use client'

import { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { Layout } from '@/components/layout/Layout'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { useProductStore } from '@/stores/productStore'
import {
	ShoppingBagIcon,
	ChartBarIcon,
	CogIcon,
	ArrowTrendingUpIcon,
	CheckCircleIcon,
	XCircleIcon
} from '@heroicons/react/24/outline'

function HomeContent() {
	const { products, fetchProducts } = useProductStore()

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	const totalProducts = products.length
	const activeProducts = products.filter(p => p.status).length
	const inactiveProducts = totalProducts - activeProducts
	const recentProducts = products
		.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
		.slice(0, 3)

	return (
		<Layout>
			<div className="space-y-8">
				<div className="text-center py-8">
					<h1 className="text-5xl font-bold text-foreground mb-4">
						CRUD Agenus
					</h1>
					<p className="text-muted-foreground text-xl max-w-2xl mx-auto">
						Sistema completo de gerenciamento de produtos com métricas avançadas e interface moderna
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Total de Produtos</p>
									<p className="text-3xl font-bold text-foreground">{totalProducts}</p>
								</div>
								<ShoppingBagIcon className="h-8 w-8 text-primary" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Produtos Ativos</p>
									<p className="text-3xl font-bold text-green-600">{activeProducts}</p>
								</div>
								<CheckCircleIcon className="h-8 w-8 text-green-600" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Produtos Inativos</p>
									<p className="text-3xl font-bold text-red-600">{inactiveProducts}</p>
								</div>
								<XCircleIcon className="h-8 w-8 text-red-600" />
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<ShoppingBagIcon className="h-6 w-6 text-primary" />
								Produtos
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								Gerencie seus produtos com operações CRUD completas, upload de imagens e controle de status
							</p>
							<Link href="/products" className="w-full">
								<Button
									variant="secondary"
									className="w-full"
								>
									Gerenciar Produtos
								</Button>
							</Link>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<ChartBarIcon className="h-6 w-6 text-primary" />
								Dashboard
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								Visualize métricas detalhadas, gráficos interativos e análises dos seus produtos
							</p>
							<Link href="/dashboard" className="w-full">
								<Button
									variant="secondary"
									className="w-full"
								>
									Ver Dashboard
								</Button>
							</Link>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CogIcon className="h-6 w-6 text-primary" />
								Configurações
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								Configure suas preferências, tema e ajustes do sistema
							</p>
							<Button
								variant="outline"
								className="w-full"
								disabled
							>
								Em Breve
							</Button>
						</CardContent>
					</Card>
				</div>

				{recentProducts.length > 0 && (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<ArrowTrendingUpIcon className="h-6 w-6 text-primary" />
								Produtos Recentes
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{recentProducts.map((product) => (
									<div key={product.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
										<div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
											<ShoppingBagIcon className="h-6 w-6 text-muted-foreground" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="font-medium text-foreground truncate">{product.title}</p>
											<p className="text-sm text-muted-foreground">
												{product.status ? 'Ativo' : 'Inativo'}
											</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</Layout>
	)
}

export default function Home() {
  return (
		<AuthGuard>
			<Suspense fallback={<AuthLoadingFallback />}>
				<HomeContent />
			</Suspense>
		</AuthGuard>
	)
}

function AuthLoadingFallback() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
				<p className="text-muted-foreground">Carregando...</p>
        </div>
    </div>
	)
}
