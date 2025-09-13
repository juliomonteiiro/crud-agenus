'use client'

import { useProductStore } from '@/stores/productStore'
import { Card, CardContent } from '@/components/ui'
import {
	CubeIcon,
	CheckCircleIcon,
	XCircleIcon,
	ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

export function MetricsOverview() {
	const { products, isLoading } = useProductStore()

	const totalProducts = products.length
	const activeProducts = products.filter(p => p.status).length
	const inactiveProducts = products.filter(p => !p.status).length

	const growthRate = Math.round((activeProducts / Math.max(totalProducts, 1)) * 100)

	const metrics = [
		{
			title: 'Total de Produtos',
			value: totalProducts,
			icon: CubeIcon,
			color: 'text-blue-600',
			bgColor: 'bg-blue-100 dark:bg-blue-900/30',
			change: '+12%',
			changeType: 'positive'
		},
		{
			title: 'Produtos Ativos',
			value: activeProducts,
			icon: CheckCircleIcon,
			color: 'text-green-600',
			bgColor: 'bg-green-100 dark:bg-green-900/30',
			change: `${growthRate}%`,
			changeType: 'positive'
		},
		{
			title: 'Produtos Inativos',
			value: inactiveProducts,
			icon: XCircleIcon,
			color: 'text-red-600',
			bgColor: 'bg-red-100 dark:bg-red-900/30',
			change: inactiveProducts > 0 ? `${Math.round((inactiveProducts / totalProducts) * 100)}%` : '0%',
			changeType: inactiveProducts > 0 ? 'negative' : 'neutral'
		},
		{
			title: 'Taxa de Crescimento',
			value: `${growthRate}%`,
			icon: ArrowTrendingUpIcon,
			color: 'text-purple-600',
			bgColor: 'bg-purple-100 dark:bg-purple-900/30',
			change: '+5.2%',
			changeType: 'positive'
		}
	]

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{[...Array(4)].map((_, i) => (
					<Card key={i}>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
									<div className="h-8 w-12 bg-muted rounded animate-pulse mb-1" />
									<div className="h-3 w-16 bg-muted rounded animate-pulse" />
								</div>
								<div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{metrics.map((metric, index) => (
				<Card key={index} className="hover:shadow-lg transition-shadow duration-200">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<p className="text-sm font-medium text-muted-foreground mb-1">
									{metric.title}
								</p>
								<p className="text-2xl font-bold text-foreground mb-1">
									{metric.value}
								</p>
								<div className="flex items-center gap-1">
									<span className={`text-xs font-medium ${metric.changeType === 'positive'
											? 'text-green-600'
											: metric.changeType === 'negative'
												? 'text-red-600'
												: 'text-muted-foreground'
										}`}>
										{metric.change}
									</span>
									<span className="text-xs text-muted-foreground">
										vs mês anterior
									</span>
								</div>
							</div>
							<div className={`p-3 rounded-full ${metric.bgColor}`}>
								<metric.icon className={`h-6 w-6 ${metric.color}`} />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
