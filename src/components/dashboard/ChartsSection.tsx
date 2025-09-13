'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { ProductsChart } from '@/components/dashboard/ProductsChart'
import { StatusChart } from '@/components/dashboard/StatusChart'
import { MonthlyTrendChart } from '@/components/dashboard/MonthlyTrendChart'
import { CategoryChart } from '@/components/dashboard/CategoryChart'

export function ChartsSection() {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Produtos por Status</CardTitle>
					</CardHeader>
					<CardContent>
						<StatusChart />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Tendência Mensal</CardTitle>
					</CardHeader>
					<CardContent>
						<MonthlyTrendChart />
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Distribuição de Produtos</CardTitle>
					</CardHeader>
					<CardContent>
						<ProductsChart />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Categorias</CardTitle>
					</CardHeader>
					<CardContent>
						<CategoryChart />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
