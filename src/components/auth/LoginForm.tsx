'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/stores/authStore'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
	const [error, setError] = useState<string>('')
	const [showPassword, setShowPassword] = useState(false)

	const { login, isLoading } = useAuthStore()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (data: LoginFormData) => {
		setError('')

		try {
			await login(data)
			router.push('/')
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Erro ao fazer login')
		}
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="bg-card border border-border rounded-xl shadow-lg p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-card-foreground mb-2">
						CRUD Agenus
					</h1>
					<p className="text-muted-foreground">
						Faça login para acessar o sistema
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label htmlFor="email" className="block text-sm font-semibold text-card-foreground mb-2">
							Email
						</label>
						<input
							id="email"
							type="email"
							{...register('email')}
							className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
								errors.email ? 'border-destructive' : 'border-input'
							}`}
							placeholder="seu@email.com"
							disabled={isLoading}
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
						)}
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-semibold text-card-foreground mb-2">
							Senha
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								{...register('password')}
								className={`w-full h-12 px-4 pr-12 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
									errors.password ? 'border-destructive' : 'border-input'
								}`}
								placeholder="Sua senha"
								disabled={isLoading}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
								disabled={isLoading}
							>
								{showPassword ? (
									<EyeSlashIcon className="h-5 w-5" />
								) : (
									<EyeIcon className="h-5 w-5" />
								)}
							</button>
						</div>
						{errors.password && (
							<p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
						)}
					</div>

					{error && (
						<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
							<p className="text-sm text-destructive font-medium">{error}</p>
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
					>
						{isLoading ? (
							<>
								<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
								Entrando...
							</>
						) : (
							'Entrar'
						)}
					</button>
				</form>
			</div>
		</div>
	)
}
