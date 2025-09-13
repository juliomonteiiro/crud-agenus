'use client'

import { useProductStore } from '@/stores/productStore'
import { Button } from '@/components/ui'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon
} from '@heroicons/react/24/outline'

export function ProductPagination() {
	const {
		currentPage,
		totalPages,
		total,
		pageSize,
		isLoading,
		fetchProducts
	} = useProductStore()

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages && !isLoading) {
			fetchProducts(page, pageSize)
		}
	}

	const getVisiblePages = () => {
		const delta = 2
		const range = []
		const rangeWithDots = []

		for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
			range.push(i)
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...')
		} else {
			rangeWithDots.push(1)
		}

		rangeWithDots.push(...range)

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages)
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages)
		}

		return rangeWithDots
	}

	if (totalPages <= 1) return null

	const startItem = (currentPage - 1) * pageSize + 1
	const endItem = Math.min(currentPage * pageSize, total)

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
			<div className="text-sm text-muted-foreground">
				Mostrando {startItem} a {endItem} de {total} produtos
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => handlePageChange(1)}
					disabled={currentPage === 1 || isLoading}
					className="hidden sm:flex"
				>
					<ChevronDoubleLeftIcon className="h-4 w-4" />
				</Button>

				<Button
					variant="outline"
					size="sm"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1 || isLoading}
				>
					<ChevronLeftIcon className="h-4 w-4" />
				</Button>

				<div className="flex items-center gap-1">
					{getVisiblePages().map((page, index) => (
						<div key={index}>
							{page === '...' ? (
								<span className="px-3 py-2 text-muted-foreground">...</span>
							) : (
								<Button
									variant={currentPage === page ? "primary" : "outline"}
									size="sm"
									onClick={() => handlePageChange(page as number)}
									disabled={isLoading}
									className="min-w-[40px]"
								>
									{page}
								</Button>
							)}
						</div>
					))}
				</div>

				<Button
					variant="outline"
					size="sm"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages || isLoading}
				>
					<ChevronRightIcon className="h-4 w-4" />
				</Button>

				<Button
					variant="outline"
					size="sm"
					onClick={() => handlePageChange(totalPages)}
					disabled={currentPage === totalPages || isLoading}
					className="hidden sm:flex"
				>
					<ChevronDoubleRightIcon className="h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}
