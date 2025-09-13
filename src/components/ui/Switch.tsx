'use client'

import { Switch as HeadlessSwitch } from '@headlessui/react'
import { forwardRef } from 'react'
import { cn } from '@/utils/helpers'

interface SwitchProps {
	label?: string
	description?: string
	checked?: boolean
	onChange?: (checked: boolean) => void
	className?: string
	disabled?: boolean
}

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
	({ className, label, description, checked, onChange, disabled }, ref) => {
		return (
			<HeadlessSwitch.Group as="div" className="flex items-center space-x-3" ref={ref}>
				<HeadlessSwitch
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					className={cn(
						'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
						checked ? 'bg-primary' : 'bg-muted',
						className
					)}
				>
					<span
						className={cn(
							'inline-block h-5 w-5 transform rounded-full bg-background shadow transition-transform',
							checked ? 'translate-x-6' : 'translate-x-1'
						)}
					/>
				</HeadlessSwitch>
				{(label || description) && (
					<div className="flex flex-col">
						{label && (
							<HeadlessSwitch.Label className="text-sm font-medium text-foreground cursor-pointer">
								{label}
							</HeadlessSwitch.Label>
						)}
						{description && (
							<p className="text-xs text-muted-foreground">
								{description}
							</p>
						)}
					</div>
				)}
			</HeadlessSwitch.Group>
		)
	}
)

Switch.displayName = 'Switch'
