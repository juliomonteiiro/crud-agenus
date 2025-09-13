'use client'

import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { forwardRef, Fragment } from 'react'
import { cn } from '@/utils/helpers'

interface SelectOption {
	value: string | number
	label: string
	disabled?: boolean
}

interface SelectProps {
	options: SelectOption[]
	value?: string | number
	onChange: (value: string | number) => void
	placeholder?: string
	label?: string
	description?: string
	error?: boolean
	disabled?: boolean
	className?: string
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
	({ 
		options, 
		value, 
		onChange, 
		placeholder = 'Selecione uma opção', 
		label,
		description,
		error,
		disabled,
		className 
	}, ref) => {
		const selectedOption = options.find(option => option.value === value)

		return (
			<div ref={ref} className={cn('space-y-2', className)}>
				{label && (
					<label className="text-sm font-medium text-foreground">
						{label}
					</label>
				)}
				<Listbox value={value} onChange={onChange} disabled={disabled}>
					<div className="relative">
						<ListboxButton className={cn(
							'relative w-full cursor-default rounded-lg border border-border bg-background py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
							error && 'border-destructive focus:ring-destructive'
						)}>
							<span className={cn(
								'block truncate',
								!selectedOption && 'text-muted-foreground'
							)}>
								{selectedOption ? selectedOption.label : placeholder}
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-muted-foreground"
									aria-hidden="true"
								/>
							</span>
						</ListboxButton>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-background py-1 text-base shadow-lg ring-1 ring-border focus:outline-none">
								{options.map((option) => (
									<ListboxOption
										key={option.value}
										value={option.value}
										disabled={option.disabled}
										className={({ active }) =>
											cn(
												'relative cursor-default select-none py-2 pl-10 pr-4',
												active ? 'bg-accent text-accent-foreground' : 'text-foreground',
												option.disabled && 'opacity-50 cursor-not-allowed'
											)
										}
									>
										{({ selected }) => (
											<>
												<span
													className={cn(
														'block truncate',
														selected ? 'font-medium' : 'font-normal'
													)}
												>
													{option.label}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</ListboxOption>
								))}
							</ListboxOptions>
						</Transition>
					</div>
				</Listbox>
				{description && (
					<p className="text-xs text-muted-foreground">{description}</p>
				)}
			</div>
		)
	}
)

Select.displayName = 'Select'
