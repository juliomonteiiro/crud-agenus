'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const mockCategoryData = [
	{ name: 'Eletrônicos', value: 35, color: '#3b82f6' },
	{ name: 'Roupas', value: 25, color: '#10b981' },
	{ name: 'Casa & Jardim', value: 20, color: '#f59e0b' },
	{ name: 'Esportes', value: 15, color: '#ef4444' },
	{ name: 'Livros', value: 5, color: '#8b5cf6' }
]

export function CategoryChart() {
	return (
		<div className="h-64">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={mockCategoryData}
						cx="50%"
						cy="50%"
						innerRadius={40}
						outerRadius={80}
						paddingAngle={5}
						dataKey="value"
					>
						{mockCategoryData.map((entry, index) => (
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
							fontSize: '12px'
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

