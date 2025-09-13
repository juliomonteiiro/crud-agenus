'use client'

import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { useUIStore } from '@/stores/uiStore'

interface LayoutProps {
	children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
	const { sidebarOpen } = useUIStore()

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<Sidebar />
			<main className={`transition-all duration-300 pt-20 ${sidebarOpen ? 'ml-64' : 'ml-0'
				} p-6`}>
				{children}
			</main>
		</div>
	)
}
