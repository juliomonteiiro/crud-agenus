import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '@/services/authService'
import { LoginRequest, AuthState } from '@/types/auth'

interface AuthStore extends AuthState {
	login: (credentials: LoginRequest) => Promise<void>
	logout: () => void
	validateSession: () => Promise<boolean>
	initialize: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			isLoading: false,

			login: async (credentials: LoginRequest) => {
				set({ isLoading: true })
				try {
					const response = await authService.login(credentials)
					set({
						user: response.user,
						token: response.token,
						isAuthenticated: true,
						isLoading: false,
					})
		} catch {
			set({ isLoading: false })
			throw new Error('Erro ao fazer login')
		}
			},

			logout: () => {
				authService.logout()
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					isLoading: false,
				})
			},

			validateSession: async () => {
				set({ isLoading: true })
				try {
					const user = await authService.validateSession()
					if (user) {
						const { token } = authService.getStoredAuth()
						set({
							user,
							token,
							isAuthenticated: true,
							isLoading: false,
						})
						return true
					} else {
						set({
							user: null,
							token: null,
							isAuthenticated: false,
							isLoading: false,
						})
						return false
					}
		} catch {
			set({
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false,
			})
			return false
		}
			},

			initialize: async () => {
				const { token, user } = authService.getStoredAuth()

				if (token && user) {
					set({
						user,
						token,
						isAuthenticated: true,
						isLoading: false,
					})
				} else {
					set({
						user: null,
						token: null,
						isAuthenticated: false,
						isLoading: false,
					})
				}
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
)

