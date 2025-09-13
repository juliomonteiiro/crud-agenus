'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/stores/authStore'
import { Suspense } from 'react'

interface AuthGuardProps {
	children: React.ReactNode
	fallback?: React.ReactNode
}

function AuthGuardContent({ children, fallback }: AuthGuardProps) {
	const { isAuthenticated, isLoading } = useAuthStore()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/login')
		}
	}, [isAuthenticated, isLoading, router])

	if (isLoading) {
		return fallback || <AuthLoadingFallback />
	}

	if (!isAuthenticated) {
		return fallback || <AuthLoadingFallback />
	}

	return <>{children}</>
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
	return (
		<Suspense fallback={<AuthLoadingFallback />}>
			<AuthGuardContent fallback={fallback}>
				{children}
			</AuthGuardContent>
		</Suspense>
	)
}

function AuthLoadingFallback() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
				<p className="text-muted-foreground">Carregando...</p>
			</div>
		</div>
	)
}

