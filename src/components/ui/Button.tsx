'use client'

import { Button as HeadlessButton } from '@headlessui/react'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/helpers'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
	size?: 'sm' | 'md' | 'lg'
	loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'primary', size = 'md', loading = false, children, disabled, ...props }, ref) => {
		const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

		const variants = {
			primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary',
			outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground focus:ring-primary',
			ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-primary',
			destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive'
		}

		const sizes = {
			sm: 'h-8 px-3 text-sm',
			md: 'h-10 px-4 py-2',
			lg: 'h-12 px-6 text-lg'
		}

		return (
			<HeadlessButton
				className={cn(
					baseClasses,
					variants[variant],
					sizes[size],
					className
				)}
				ref={ref}
				disabled={disabled || loading}
				{...props}
			>
				{loading && (
					<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
				)}
				{children}
			</HeadlessButton>
		)
	}
)

Button.displayName = 'Button'

