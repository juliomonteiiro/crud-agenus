'use client'

import { Input as HeadlessInput } from '@headlessui/react'
import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/helpers'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
	label?: string
	description?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, error, label, description, id, ...props }, ref) => {
		const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

		return (
			<div className="space-y-2">
				{label && (
					<label htmlFor={inputId} className="text-sm font-medium text-foreground">
						{label}
					</label>
				)}
				<HeadlessInput
					id={inputId}
					className={cn(
						'flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
						error && 'border-destructive focus:ring-destructive',
						className
					)}
					ref={ref}
					{...props}
				/>
				{description && (
					<p className="text-xs text-muted-foreground">{description}</p>
				)}
			</div>
		)
	}
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean
	label?: string
	description?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, label, description, id, ...props }, ref) => {
		const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

		return (
			<div className="space-y-2">
				{label && (
					<label htmlFor={textareaId} className="text-sm font-medium text-foreground">
						{label}
					</label>
				)}
				<HeadlessInput
					as="textarea"
					id={textareaId}
					className={cn(
						'flex min-h-[80px] w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none',
						error && 'border-destructive focus:ring-destructive',
						className
					)}
					ref={ref}
					{...props}
				/>
				{description && (
					<p className="text-xs text-muted-foreground">{description}</p>
				)}
			</div>
		)
	}
)

Textarea.displayName = 'Textarea'

