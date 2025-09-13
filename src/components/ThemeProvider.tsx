'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/stores/themeStore'

interface ThemeProviderProps {
	children: React.ReactNode
}

export function ThemeProvider({
	children
}: ThemeProviderProps) {
	const { theme } = useThemeStore()

	useEffect(() => {
		const root = window.document.documentElement
		const resolvedTheme = theme === 'system' 
			? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
			: theme

		root.classList.remove('light', 'dark')
		root.classList.add(resolvedTheme)

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

		const handleChange = () => {
			if (theme === 'system') {
				const newResolvedTheme = mediaQuery.matches ? 'dark' : 'light'
				root.classList.remove('light', 'dark')
				root.classList.add(newResolvedTheme)
			}
		}

		mediaQuery.addEventListener('change', handleChange)

		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [theme])

	return (
		<div className="min-h-screen bg-background text-foreground transition-colors duration-300">
			{children}
		</div>
	)
}
