'use client'

import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/react'
import { Button } from './Button'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ConfirmationModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	message?: string
	confirmText?: string
	cancelText?: string
	variant?: 'danger' | 'warning' | 'info'
	isLoading?: boolean
}

export function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title = 'Confirmar ação',
	message = 'Tem certeza que deseja continuar?',
	confirmText = 'Confirmar',
	cancelText = 'Cancelar',
	variant = 'danger',
	isLoading = false
}: ConfirmationModalProps) {
	const handleConfirm = () => {
		onConfirm()
	}

	const getVariantStyles = () => {
		switch (variant) {
			case 'danger':
				return {
					iconColor: 'text-red-500',
					bgColor: 'bg-red-50 dark:bg-red-900/20',
					borderColor: 'border-red-200 dark:border-red-800',
					confirmButton: 'bg-red-600 hover:bg-red-700 text-white'
				}
			case 'warning':
				return {
					iconColor: 'text-yellow-500',
					bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
					borderColor: 'border-yellow-200 dark:border-yellow-800',
					confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white'
				}
			case 'info':
				return {
					iconColor: 'text-blue-500',
					bgColor: 'bg-blue-50 dark:bg-blue-900/20',
					borderColor: 'border-blue-200 dark:border-blue-800',
					confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white'
				}
			default:
				return {
					iconColor: 'text-red-500',
					bgColor: 'bg-red-50 dark:bg-red-900/20',
					borderColor: 'border-red-200 dark:border-red-800',
					confirmButton: 'bg-red-600 hover:bg-red-700 text-white'
				}
		}
	}

	const styles = getVariantStyles()

	return (
		<Dialog open={isOpen} onClose={onClose} className="relative z-50">
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
			
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel className="mx-auto w-full max-w-md bg-background rounded-lg shadow-xl">
					<div className="p-6 space-y-6">
						<div className="flex items-center gap-4">
							<div className={`flex-shrink-0 w-12 h-12 rounded-full ${styles.bgColor} flex items-center justify-center`}>
								<ExclamationTriangleIcon className={`w-6 h-6 ${styles.iconColor}`} />
							</div>
							<div>
								<DialogTitle className="text-lg font-semibold text-foreground">
									{title}
								</DialogTitle>
							</div>
						</div>

						<div className="pl-16">
							<DialogDescription className="text-muted-foreground leading-relaxed">
								{message}
							</DialogDescription>
						</div>

						<div className="flex gap-3 justify-end">
							<Button
								onClick={onClose}
								variant="outline"
								disabled={isLoading}
							>
								{cancelText}
							</Button>
							<Button
								onClick={handleConfirm}
								disabled={isLoading}
								className={`${styles.confirmButton} disabled:opacity-50 disabled:cursor-not-allowed`}
							>
								{isLoading ? (
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
										Excluindo...
									</div>
								) : (
									confirmText
								)}
							</Button>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	)
}

