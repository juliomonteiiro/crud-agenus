'use client'

import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/react'
import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/helpers'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	isOpen: boolean
	onClose: () => void
	title?: string
	description?: string
	children: ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({
	isOpen,
	onClose,
	title,
	description,
	children,
	size = 'md',
	className
}: ModalProps) {
	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-2xl',
		lg: 'max-w-4xl',
		xl: 'max-w-6xl'
	}

	return (
		<Dialog open={isOpen} onClose={onClose} className="relative z-50">
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
			
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel className={cn(
					'mx-auto w-full bg-background rounded-lg shadow-xl max-h-[90vh] overflow-y-auto',
					sizeClasses[size],
					className
				)}>
					{(title || description) && (
						<div className="flex items-center justify-between p-6 border-b border-border">
							<div className="flex-1">
								{title && (
									<DialogTitle className="text-xl font-semibold text-foreground">
										{title}
									</DialogTitle>
								)}
								{description && (
									<DialogDescription className="mt-2 text-sm text-muted-foreground">
										{description}
									</DialogDescription>
								)}
							</div>
							<button
								onClick={onClose}
								className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
							>
								<XMarkIcon className="w-5 h-5" />
							</button>
						</div>
					)}
					{children}
				</DialogPanel>
			</div>
		</Dialog>
	)
}

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function ModalContent({ className, ...props }: ModalContentProps) {
	return (
		<div
			className={cn('p-6', className)}
			{...props}
		/>
	)
}

