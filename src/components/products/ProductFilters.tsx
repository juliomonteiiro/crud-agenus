'use client'

import { useState, useEffect } from 'react'
import { useProductStore } from '@/stores/productStore'
import { Input, Button, Select } from '@/components/ui'
import {
	MagnifyingGlassIcon,
	FunnelIcon,
	XMarkIcon,
	ArrowUpIcon,
	ArrowDownIcon
} from '@heroicons/react/24/outline'

export function ProductFilters() {
	const {
		searchQuery,
		sortBy,
		sortOrder,
		statusFilter,
		setSearchQuery,
		setSortBy,
		setSortOrder,
		setStatusFilter,
		applyFilters,
		clearFilters
	} = useProductStore()

	const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
	const [showFilters, setShowFilters] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchQuery(localSearchQuery)
			applyFilters()
		}, 300)

		return () => clearTimeout(timer)
	}, [localSearchQuery, setSearchQuery, applyFilters])

  const handleSort = (field: 'title' | 'createdAt' | 'updatedAt' | 'status'): void => {
		if (sortBy === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(field)
			setSortOrder('asc')
		}
		applyFilters()
	}

	const handleStatusFilter = (status: 'all' | 'active' | 'inactive') => {
		setStatusFilter(status)
		applyFilters()
	}

	const handleClearFilters = async () => {
		setLocalSearchQuery('')
		await clearFilters()
	}

	const getSortIcon = (field: string) => {
		if (sortBy !== field) return null
		return sortOrder === 'asc' ? (
			<ArrowUpIcon className="h-4 w-4" />
		) : (
			<ArrowDownIcon className="h-4 w-4" />
		)
	}

	return (
		<div className="space-y-4">
			<div className="flex gap-4 items-center">
				<div className="flex-1 relative">
					<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Buscar produtos por título ou descrição..."
						value={localSearchQuery}
						onChange={(e) => setLocalSearchQuery(e.target.value)}
						className="pl-10"
					/>
				</div>

				<Button
					variant="outline"
					onClick={() => setShowFilters(!showFilters)}
					className="flex items-center gap-2"
				>
					<FunnelIcon className="h-4 w-4" />
					Filtros
				</Button>

				{(searchQuery || statusFilter !== 'all' || sortBy !== 'updatedAt' || sortOrder !== 'desc') && (
					<Button
						variant="ghost"
						onClick={handleClearFilters}
						className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
					>
						<XMarkIcon className="h-4 w-4" />
						Limpar
					</Button>
				)}
			</div>

			{showFilters && (
				<div className="bg-muted/50 rounded-lg p-4 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<div>
							<Select
								label="Status"
								value={statusFilter}
								onChange={(value) => handleStatusFilter(value as 'all' | 'active' | 'inactive')}
								options={[
									{ value: 'all', label: 'Todos' },
									{ value: 'active', label: 'Ativos' },
									{ value: 'inactive', label: 'Inativos' }
								]}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								Ordenar por
							</label>
							<div className="space-y-2">
								<div className="flex flex-wrap gap-2">
									{[
										{ value: 'title', label: 'Nome' },
										{ value: 'status', label: 'Status' },
										{ value: 'createdAt', label: 'Data Criação' },
										{ value: 'updatedAt', label: 'Data Atualização' }
									].map((option) => (
										<button
											key={option.value}
											onClick={() => handleSort(option.value as 'title' | 'createdAt' | 'updatedAt' | 'status')}
											className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-colors ${sortBy === option.value
													? 'bg-primary text-primary-foreground'
													: 'bg-background border border-border hover:bg-accent'
												}`}
										>
											{option.label}
											{getSortIcon(option.value)}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
