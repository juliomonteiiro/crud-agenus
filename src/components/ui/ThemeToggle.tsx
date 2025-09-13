'use client'

import { useState } from 'react'
import { useThemeStore } from '@/stores/themeStore'
import {
	SunIcon,
	MoonIcon,
	ComputerDesktopIcon
} from '@heroicons/react/24/outline'

export function ThemeToggle() {
	const { theme, setTheme } = useThemeStore()
	const [isOpen, setIsOpen] = useState(false)

	const themes = [
		{ value: 'light' as const, label: 'Claro', icon: SunIcon },
		{ value: 'dark' as const, label: 'Escuro', icon: MoonIcon },
		{ value: 'system' as const, label: 'Sistema', icon: ComputerDesktopIcon },
	]

	const currentTheme = themes.find(t => t.value === theme) || themes[2]

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors duration-200"
				aria-label="Alternar tema"
			>
				<currentTheme.icon className="h-4 w-4" />
				<span className="hidden sm:inline text-sm font-medium">
					{currentTheme.label}
				</span>
			</button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-20">
						<div className="p-1">
							{themes.map((themeOption) => (
								<button
									key={themeOption.value}
									onClick={() => {
										setTheme(themeOption.value)
										setIsOpen(false)
									}}
									className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors duration-200 ${theme === themeOption.value
											? 'bg-accent text-accent-foreground'
											: 'hover:bg-accent hover:text-accent-foreground'
										}`}
								>
									<themeOption.icon className="h-4 w-4" />
									{themeOption.label}
								</button>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export function SimpleThemeToggle() {
	const { theme, toggleTheme } = useThemeStore()

	return (
		<button
			onClick={toggleTheme}
			className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground"
			aria-label="Alternar tema"
		>
			{theme === 'dark' ? (
				<>
					<SunIcon className="h-4 w-4" />
					<span className="text-sm font-medium">Claro</span>
				</>
			) : (
				<>
					<MoonIcon className="h-4 w-4" />
					<span className="text-sm font-medium">Escuro</span>
				</>
			)}
		</button>
	)
}