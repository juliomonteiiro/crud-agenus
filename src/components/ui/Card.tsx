'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/helpers'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  hover?: boolean
  clickable?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ className, hover = false, clickable = false, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					'rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
					hover && 'hover:shadow-md hover:border-primary/20',
					clickable && 'cursor-pointer hover:shadow-md hover:border-primary/20 active:scale-[0.98]',
					className
				)}
				{...props}
			/>
		)
	}
)

Card.displayName = 'Card'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('flex flex-col space-y-1.5 p-6', className)}
				{...props}
			/>
		)
	}
)

CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
}

export const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
	({ className, ...props }, ref) => {
		return (
			<h3
				ref={ref}
				className={cn('text-lg font-semibold leading-none tracking-tight', className)}
				{...props}
			/>
		)
	}
)

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
	({ className, ...props }, ref) => {
		return (
			<p
				ref={ref}
				className={cn('text-sm text-muted-foreground', className)}
				{...props}
			/>
		)
	}
)

CardDescription.displayName = 'CardDescription'

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('p-6 pt-0', className)}
				{...props}
			/>
		)
	}
)

CardContent.displayName = 'CardContent'

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('flex items-center p-6 pt-0', className)}
				{...props}
			/>
		)
	}
)

CardFooter.displayName = 'CardFooter'

