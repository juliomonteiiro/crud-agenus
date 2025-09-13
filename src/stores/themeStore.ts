'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
	theme: Theme
	resolvedTheme: 'light' | 'dark'
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: 'system',
			resolvedTheme: 'light',
			setTheme: (theme: Theme) => {
				set({ theme })
				const resolvedTheme = theme === 'system' 
					? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
					: theme
				set({ resolvedTheme })
			},
			toggleTheme: () => {
				const { theme } = get()
				const newTheme = theme === 'light' ? 'dark' : 'light'
				set({ theme: newTheme, resolvedTheme: newTheme })
			}
		}),
		{
			name: 'theme-storage',
			onRehydrateStorage: () => (state) => {
				if (state) {
					const resolvedTheme = state.theme === 'system' 
						? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
						: state.theme
					state.resolvedTheme = resolvedTheme
				}
			}
		}
	)
)