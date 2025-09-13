'use client'

import { useProductStore } from '@/stores/productStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function ProductsChart() {
	const { products, isLoading } = useProductStore()

	const productsByMonth = products.reduce((acc, product) => {
		const date = new Date(product.createdAt)
		const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

		if (!acc[monthKey]) {
			acc[monthKey] = 0
		}
		acc[monthKey]++

		return acc
	}, {} as Record<string, number>)

	const chartData = Object.entries(productsByMonth)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([month, count]) => ({
			month: new Date(month + '-01').toLocaleDateString('pt-BR', {
				month: 'short',
				year: 'numeric'
			}),
			produtos: count
		}))

	if (isLoading) {
		return (
			<div className="h-64 flex items-center justify-center">
				<div className="w-full h-48 bg-muted rounded animate-pulse" />
			</div>
		)
	}

	if (products.length === 0) {
		return (
			<div className="h-64 flex items-center justify-center text-muted-foreground">
				<p>Nenhum produto encontrado</p>
			</div>
		)
	}

	return (
		<div className="h-64">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={chartData}>
					<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
					<XAxis
						dataKey="month"
						stroke="hsl(var(--muted-foreground))"
						fontSize={12}
					/>
					<YAxis
						stroke="hsl(var(--muted-foreground))"
						fontSize={12}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: 'hsl(var(--background))',
							border: '1px solid hsl(var(--border))',
							borderRadius: '6px'
						}}
						labelStyle={{ color: 'hsl(var(--foreground))' }}
					/>
					<Bar
						dataKey="produtos"
						fill="#8b5cf6"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

