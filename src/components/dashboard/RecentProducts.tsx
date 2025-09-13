'use client'

import Link from 'next/link'
import { useProductStore } from '@/stores/productStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Button } from '@/components/ui'
import { EyeIcon } from '@heroicons/react/24/outline'

export function RecentProducts() {
	const { products, isLoading } = useProductStore()

	const recentProducts = products
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 5)

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Produtos Recentes</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border">
								<div className="h-12 w-12 bg-muted rounded-lg animate-pulse" />
								<div className="flex-1">
									<div className="h-4 w-32 bg-muted rounded animate-pulse mb-1" />
									<div className="h-3 w-24 bg-muted rounded animate-pulse" />
								</div>
								<div className="h-6 w-16 bg-muted rounded animate-pulse" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		)
	}

	if (products.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Produtos Recentes</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center py-8 text-muted-foreground">
						<p>Nenhum produto encontrado</p>
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Produtos Recentes</CardTitle>
				<Link href="/products">
					<Button
						variant="outline"
						size="sm"
					>
						<EyeIcon className="w-4 h-4 mr-2" />
						Ver todos
					</Button>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{recentProducts.map((product) => (
						<div
							key={product.id}
							className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
						>
							<div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
								<span className="text-lg font-semibold text-primary">
									{product.title.charAt(0).toUpperCase()}
								</span>
							</div>
							<div className="flex-1 min-w-0">
								<h4 className="font-medium text-foreground truncate">
									{product.title}
								</h4>
								<p className="text-sm text-muted-foreground">
									Criado em {formatDate(product.createdAt)}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<div className={`px-2 py-1 rounded-full text-xs font-medium ${product.status
										? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
										: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
									}`}>
									{product.status ? 'Ativo' : 'Inativo'}
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

