import { useAuthStore } from '@/stores/authStore'
import { LoginRequest } from '@/types/auth'

export function useAuth() {
	const {
		user,
		token,
		isAuthenticated,
		isLoading,
		login,
		logout,
		validateSession,
		initialize,
	} = useAuthStore()

	return {
		user,
		token,
		isAuthenticated,
		isLoading,

		login: async (credentials: LoginRequest) => {
			await login(credentials)
		},
		logout,
		validateSession,
		initialize,
	}
}

