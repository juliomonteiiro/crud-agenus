'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProductListItem } from '@/types/product'
import { useProductStore } from '@/stores/productStore'
import { Card, CardContent, Button } from '@/components/ui'
import {
	PencilIcon,
	TrashIcon,
	EyeIcon,
	PhotoIcon
} from '@heroicons/react/24/outline'

interface ProductCardProps {
	product: ProductListItem
	onEdit: () => void
	onDelete: () => void
	isDeleting?: boolean
}

export function ProductCard({ product, onEdit, onDelete, isDeleting }: ProductCardProps) {
	const [imageError, setImageError] = useState(false)
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
	const [loadingThumbnail, setLoadingThumbnail] = useState(false)
	const { fetchProduct } = useProductStore()

	useEffect(() => {
		const fetchThumbnail = async () => {
			setLoadingThumbnail(true)
			setImageError(false)
			try {
				await fetchProduct(product.id)
				const currentProduct = useProductStore.getState().currentProduct
				if (currentProduct?.thumbnail?.url) {
					setThumbnailUrl(currentProduct.thumbnail.url)
				}
			} catch (error) {
				console.error('Erro ao buscar thumbnail:', error)
			} finally {
				setLoadingThumbnail(false)
			}
		}

		fetchThumbnail()
	}, [product.id, product.updatedAt, fetchProduct])

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		})
	}

	const truncateText = (text: string, maxLength: number) => {
		if (text.length <= maxLength) return text
		return text.substring(0, maxLength) + '...'
	}

	return (
		<Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDeleting ? 'opacity-50 pointer-events-none' : ''
			}`}>
			<div className="relative w-full h-48 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">

				{loadingThumbnail ? (
					<div className="flex flex-col items-center justify-center h-full text-muted-foreground">
						<div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mb-2" />
						<span className="text-sm">Carregando...</span>
					</div>
				) : thumbnailUrl && !imageError ? (
					<Image
						src={`${thumbnailUrl}?t=${product.updatedAt}`}
						alt={product.title}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
						onError={() => setImageError(true)}
					/>
				) : (
					<div className="flex flex-col items-center justify-center h-full text-muted-foreground">
						<PhotoIcon className="w-16 h-16 mb-2 opacity-50" />
						<span className="text-sm">Sem imagem</span>
					</div>
				)}

				<div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${product.status
						? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
						: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
					}`}>
					{product.status ? 'Ativo' : 'Inativo'}
				</div>
			</div>

			<CardContent className="p-5 space-y-4">

				<div>
					<h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
						{product.title}
					</h3>
					<div className="w-8 h-0.5 bg-primary rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
				</div>

				<p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
					{truncateText(product.description, 120)}
				</p>

				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<EyeIcon className="w-4 h-4" />
					<span>Atualizado em {formatDate(product.updatedAt)}</span>
				</div>

				<div className="flex gap-2 pt-2 border-t border-border">
					<Button
						onClick={onEdit}
						variant="outline"
						size="sm"
						className="flex-1"
					>
						<PencilIcon className="w-4 h-4 mr-2" />
						Editar
					</Button>

					<Button
						onClick={onDelete}
						disabled={isDeleting}
						variant="outline"
						size="sm"
						className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
					>
						{isDeleting ? (
							<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
						) : (
							<TrashIcon className="w-4 h-4" />
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
