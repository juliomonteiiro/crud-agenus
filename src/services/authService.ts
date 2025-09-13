import { apiService } from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import { LoginRequest, LoginResponse, User } from '@/types/auth'

export class AuthService {
	async login(credentials: LoginRequest): Promise<LoginResponse> {
		try {
			const response = await apiService.post<LoginResponse>(
				API_ENDPOINTS.AUTH.LOGIN,
				credentials
			)
			this.saveAuthData(response.token, response.user)

			return response
    } catch {
      throw new Error('Erro ao fazer login. Verifique suas credenciais.')
    }
	}

	async validateSession(): Promise<User | null> {
		try {
			const response = await apiService.post<LoginResponse>(
				API_ENDPOINTS.AUTH.SESSION,
				{}
			)

			this.saveAuthData(response.token, response.user)

			return response.user
		} catch {
			this.clearAuthData()
			return null
		}
	}

	logout(): void {
		this.clearAuthData()
	}

	private saveAuthData(token: string, user: User): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem('auth_token', token)
			localStorage.setItem('auth_user', JSON.stringify(user))
		}
	}

	private clearAuthData(): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('auth_token')
			localStorage.removeItem('auth_user')
		}
	}

	getStoredAuth(): { token: string | null; user: User | null } {
		if (typeof window === 'undefined') {
			return { token: null, user: null }
		}

		const token = localStorage.getItem('auth_token')
		const userStr = localStorage.getItem('auth_user')

		let user: User | null = null
		if (userStr) {
			try {
				user = JSON.parse(userStr)
			} catch (error) {
				console.error('Erro ao parsear dados do usuário:', error)
				this.clearAuthData()
			}
		}

		return { token, user }
	}
}

export const authService = new AuthService()

