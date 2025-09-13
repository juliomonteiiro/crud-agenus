'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockData = [
	{ month: 'Jan', produtos: 12, vendas: 45 },
	{ month: 'Fev', produtos: 18, vendas: 52 },
	{ month: 'Mar', produtos: 25, vendas: 48 },
	{ month: 'Abr', produtos: 22, vendas: 61 },
	{ month: 'Mai', produtos: 28, vendas: 55 },
	{ month: 'Jun', produtos: 32, vendas: 67 },
	{ month: 'Jul', produtos: 35, vendas: 72 },
	{ month: 'Ago', produtos: 38, vendas: 69 },
	{ month: 'Set', produtos: 42, vendas: 75 },
	{ month: 'Out', produtos: 45, vendas: 82 },
	{ month: 'Nov', produtos: 48, vendas: 78 },
	{ month: 'Dez', produtos: 52, vendas: 85 }
]

export function MonthlyTrendChart() {
	return (
		<div className="h-64">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={mockData}>
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
					<Line
						type="monotone"
						dataKey="produtos"
						stroke="#3b82f6"
						strokeWidth={2}
						dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
						activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
					/>
					<Line
						type="monotone"
						dataKey="vendas"
						stroke="#10b981"
						strokeWidth={2}
						dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
						activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

