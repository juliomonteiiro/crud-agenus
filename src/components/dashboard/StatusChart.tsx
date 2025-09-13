'use client'

import { useProductStore } from '@/stores/productStore'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export function StatusChart() {
	const { products, isLoading } = useProductStore()

	const activeProducts = products.filter(p => p.status).length
	const inactiveProducts = products.filter(p => !p.status).length

	const data = [
		{ name: 'Ativos', value: activeProducts, color: '#10b981' },
		{ name: 'Inativos', value: inactiveProducts, color: '#ef4444' }
	]

	if (isLoading) {
		return (
			<div className="h-64 flex items-center justify-center">
				<div className="w-32 h-32 bg-muted rounded-full animate-pulse" />
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
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={100}
						paddingAngle={5}
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip
						formatter={(value, name) => [value, name]}
						labelStyle={{ color: 'hsl(var(--foreground))' }}
						contentStyle={{
							backgroundColor: 'hsl(var(--background))',
							border: '1px solid hsl(var(--border))',
							borderRadius: '6px'
						}}
					/>
					<Legend
						wrapperStyle={{
							color: 'hsl(var(--foreground))',
							fontSize: '14px'
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

