'use client'

import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'
import { UserIcon, Bars3Icon } from '@heroicons/react/24/outline'

export function Header() {
	const { user } = useAuthStore()
	const { sidebarOpen, toggleSidebar } = useUIStore()

	return (
		<header className={`fixed top-0 right-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-0'
			}`} style={{ borderLeft: sidebarOpen ? '1px solid hsl(var(--border))' : 'none' }}>
			<div className="flex h-16 items-center justify-between px-6">
				<div className="flex items-center gap-4">
					{!sidebarOpen && (
						<button
							onClick={toggleSidebar}
							className="p-1 text-muted-foreground hover:text-foreground transition-colors"
						>
							<Bars3Icon className="h-6 w-6" />
						</button>
					)}
					<h1 className="text-xl font-bold text-foreground">
						CRUD Agenus
					</h1>
				</div>

				{user && (
					<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
						<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
							<UserIcon className="h-4 w-4 text-primary" />
						</div>
						<div className="flex flex-col">
							<span className="text-xs text-muted-foreground">Logado como</span>
							<span className="text-sm font-medium text-foreground leading-none">
								{user.name.split(' ')[0]}
							</span>
						</div>
					</div>
				)}
			</div>
		</header>
	)
}
