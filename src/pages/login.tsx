'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/stores/authStore'
import { LoginForm } from '@/components/auth/LoginForm'
import { Suspense } from 'react'

function LoginContent() {
	const { isAuthenticated, isLoading } = useAuthStore()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			router.push('/')
		}
	}, [isAuthenticated, isLoading, router])

	if (isLoading) {
		return <LoginLoadingFallback />
	}

	if (isAuthenticated) {
		return <LoginLoadingFallback />
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<LoginForm />
		</div>
	)
}

export default function LoginPage() {
	return (
		<Suspense fallback={<LoginLoadingFallback />}>
			<LoginContent />
		</Suspense>
	)
}

function LoginLoadingFallback() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
				<p className="text-muted-foreground">Carregando...</p>
			</div>
		</div>
	)
}

