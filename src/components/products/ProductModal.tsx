'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProductStore } from '@/stores/productStore'
import { Button, Input, Textarea, Modal, ModalContent, Switch } from '@/components/ui'
import { 
	CloudArrowUpIcon,
	ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const productSchema = z.object({
	title: z.string()
		.min(1, 'Título é obrigatório')
		.min(3, 'Título deve ter pelo menos 3 caracteres')
		.max(100, 'Título deve ter no máximo 100 caracteres')
		.regex(/^[a-zA-Z0-9\s\-_.,!?]+$/, 'Título contém caracteres inválidos'),
	description: z.string()
		.min(1, 'Descrição é obrigatória')
		.min(10, 'Descrição deve ter pelo menos 10 caracteres')
		.max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
	status: z.boolean(),
	thumbnail: z.any().optional()
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductModalProps {
	onClose?: () => void
}

export function ProductModal({}: ProductModalProps) {
	const {
		modalMode,
		editingProduct,
		isLoading,
		error,
		createProduct,
		updateProduct,
		updateThumbnail,
		closeModal
	} = useProductStore()

	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [fileError, setFileError] = useState<string>('')

	const isEditMode = modalMode === 'edit'
	const isCreateMode = modalMode === 'create'

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: '',
			description: '',
			status: true
		}
	})

	useEffect(() => {
		if (isEditMode && editingProduct) {
			reset({
				title: editingProduct.title,
				description: editingProduct.description,
				status: editingProduct.status
			})

		if (editingProduct.thumbnail?.url) {
			setImagePreview(editingProduct.thumbnail.url)
		}
		} else if (isCreateMode) {
			reset({
				title: '',
				description: '',
				status: true
			})
			setSelectedFile(null)
			setImagePreview(null)
		}
	}, [isEditMode, editingProduct, isCreateMode, reset])

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
			if (!validTypes.includes(file.type)) {
				setFileError('Tipo de arquivo inválido. Use JPEG, PNG, WebP ou GIF.')
				return
			}

			const maxSize = 5 * 1024 * 1024
			if (file.size > maxSize) {
				setFileError('Arquivo muito grande. Tamanho máximo: 5MB.')
				return
			}

			setFileError('')
			setSelectedFile(file)
			const reader = new FileReader()
			reader.onload = (e) => {
				setImagePreview(e.target?.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const onSubmit = async (data: ProductFormData) => {
		try {
			if (isCreateMode) {
				const success = await createProduct({
					title: data.title,
					description: data.description,
					thumbnail: selectedFile || undefined
				})

				if (success) {
					closeModal()
				}
			} else if (isEditMode && editingProduct) {
				const success = await updateProduct(editingProduct.id, {
					title: data.title,
					description: data.description,
					status: data.status
				})

				if (success && selectedFile) {
					await updateThumbnail(editingProduct.id, {
						thumbnail: selectedFile
					})
				}

				if (success) {
					closeModal()
					setTimeout(() => {
						useProductStore.getState().fetchProducts(useProductStore.getState().currentPage, useProductStore.getState().pageSize)
					}, 100)
				}
			}
		} catch (error) {
			console.error('Erro ao salvar produto:', error)
		}
	}

	const handleClose = () => {
		closeModal()
	}

	if (!modalMode) return null

	return (
		<Modal
			isOpen={true}
			onClose={handleClose}
			title={isEditMode ? 'Editar Produto' : 'Novo Produto'}
			size="md"
		>
			<ModalContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{error && (
						<div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3">
							<ExclamationTriangleIcon className="w-5 h-5 text-destructive flex-shrink-0" />
							<p className="text-sm text-destructive">{error}</p>
						</div>
					)}

					<Input
						{...register('title')}
						type="text"
						label="Título *"
						placeholder="Digite o título do produto"
						error={!!errors.title}
					/>
					{errors.title && (
						<p className="text-sm text-destructive mt-1">{errors.title.message}</p>
					)}

					<Textarea
						{...register('description')}
						rows={4}
						label="Descrição *"
						placeholder="Digite a descrição do produto"
						error={!!errors.description}
					/>
					{errors.description && (
						<p className="text-sm text-destructive mt-1">{errors.description.message}</p>
					)}

					<div>
						<label className="block text-sm font-medium text-foreground mb-2">
							Thumbnail
						</label>

						{imagePreview && (
							<div className="mb-4 relative w-full h-48">
								<Image
									src={imagePreview}
									alt="Preview"
									fill
									className="object-cover rounded-lg border border-border"
								/>
							</div>
						)}

						<div className="space-y-4">
							<div>
								<input
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="hidden"
									id="thumbnail-upload"
								/>
								<label
									htmlFor="thumbnail-upload"
									className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
								>
									<CloudArrowUpIcon className="w-5 h-5 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">
										{selectedFile ? selectedFile.name : 'Clique para selecionar uma imagem'}
									</span>
								</label>
								{fileError && (
									<p className="text-sm text-destructive mt-2">{fileError}</p>
								)}
								<p className="text-xs text-muted-foreground mt-1">
									Formatos aceitos: JPEG, PNG, WebP, GIF. Tamanho máximo: 5MB
								</p>
							</div>
						</div>
					</div>

					{isEditMode && (
						<Switch
							checked={watch('status')}
							onChange={(checked) => setValue('status', checked)}
							label="Produto ativo"
							description="Produtos ativos são visíveis na listagem"
						/>
					)}

					<div className="flex gap-3 pt-4">
						<Button
							type="button"
							onClick={handleClose}
							variant="outline"
							className="flex-1"
							disabled={isLoading}
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							variant="primary"
							className="flex-1"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center justify-center gap-2">
									<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
									Salvando...
								</div>
							) : (
								isEditMode ? 'Salvar Alterações' : 'Criar Produto'
							)}
						</Button>
					</div>
				</form>
			</ModalContent>
		</Modal>
	)
}
