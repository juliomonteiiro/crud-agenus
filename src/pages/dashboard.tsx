'use client'

import { useEffect, Suspense } from 'react'
import { Layout } from '@/components/layout/Layout'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { MetricsOverview } from '@/components/dashboard/MetricsOverview'
import { ChartsSection } from '@/components/dashboard/ChartsSection'
import { RecentProducts } from '@/components/dashboard/RecentProducts'
import { useProductStore } from '@/stores/productStore'

function DashboardContent() {
	const { fetchProducts } = useProductStore()

	useEffect(() => {
		fetchProducts(1, 100)
	}, [fetchProducts])

	return (
		<Layout>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
					<p className="text-muted-foreground mt-2">
						Visualize métricas e gráficos dos seus produtos
					</p>
				</div>

				<MetricsOverview />

				<ChartsSection />

				<RecentProducts />
			</div>
		</Layout>
	)
}

function DashboardLoadingFallback() {
	return (
		<Layout>
			<div className="space-y-8">
				<div>
					<div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
					<div className="h-4 w-96 bg-muted rounded animate-pulse" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{[...Array(4)].map((_, i) => (
						<div key={i} className="bg-card border border-border rounded-lg p-6">
							<div className="h-6 w-24 bg-muted rounded mb-2 animate-pulse" />
							<div className="h-8 w-16 bg-muted rounded mb-1 animate-pulse" />
							<div className="h-4 w-20 bg-muted rounded animate-pulse" />
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{[...Array(4)].map((_, i) => (
						<div key={i} className="bg-card border border-border rounded-lg p-6">
							<div className="h-6 w-32 bg-muted rounded mb-4 animate-pulse" />
							<div className="h-64 bg-muted rounded animate-pulse" />
						</div>
					))}
				</div>
			</div>
		</Layout>
	)
}

export default function DashboardPage() {
	return (
		<AuthGuard>
			<Suspense fallback={<DashboardLoadingFallback />}>
				<DashboardContent />
			</Suspense>
		</AuthGuard>
	)
}

