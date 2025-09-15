'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'
import { SimpleThemeToggle } from '@/components/ui/ThemeToggle'
import { 
  HomeIcon, 
  ChartBarIcon, 
  CubeIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const navigation = [
	{ name: 'Home', href: '/', icon: HomeIcon },
	{ name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
	{ name: 'Produtos', href: '/products', icon: CubeIcon },
]

export function Sidebar() {
	const router = useRouter()
	const { logout } = useAuthStore()
	const { sidebarOpen, toggleSidebar } = useUIStore()

	const handleLogout = () => {
		logout()
		router.push('/login')
	}

	return (
		<>
			<aside className={`fixed left-0 top-0 z-40 h-full border-r border-border bg-card/50 backdrop-blur-sm flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
				}`} style={{ borderTop: 'none' }}>
				<div className="flex items-center justify-between p-6 border-b border-border h-16">
					<h2 className="text-lg font-semibold text-foreground">Menu</h2>
					<button
						onClick={toggleSidebar}
						className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
					>
						<XMarkIcon className="h-5 w-5" />
					</button>
				</div>

				<div className="p-6 flex-1">
					<nav className="space-y-1">
						{navigation.map((item, index) => {
							const isActive = router.pathname === item.href
							return (
								<Link
									key={item.name}
									href={item.href}
									className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${isActive
											? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
											: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md'
										}`}
									style={{
										animationDelay: `${index * 100}ms`,
										animation: 'slideInLeft 0.5s ease-out forwards'
									}}
								>
									<item.icon className={`h-5 w-5 transition-all duration-300 ${isActive ? 'text-primary-foreground scale-110' : 'text-muted-foreground group-hover:text-accent-foreground group-hover:scale-110'
										}`} />
									<span className="transition-all duration-300">
										{item.name}
									</span>
								</Link>
							)
						})}
					</nav>
				</div>

				<div className="p-6 border-t border-border space-y-3">

					<SimpleThemeToggle />
					
					<button
						onClick={handleLogout}
						className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground"
					>
						<ArrowRightOnRectangleIcon className="h-4 w-4" />
						<span className="text-sm font-medium">Sair</span>
					</button>
				</div>
			</aside>

		</>
	)
}
