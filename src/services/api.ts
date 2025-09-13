import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL } from '@/utils/constants'

class ApiService {
	private instance: AxiosInstance

	constructor() {
		this.instance = axios.create({
			baseURL: API_URL,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			timeout: 10000,
		})

		this.setupInterceptors()
	}

	private setupInterceptors() {
		this.instance.interceptors.request.use(
			(config) => {
				const token = this.getToken()
				if (token) {
					config.headers.Authorization = `Bearer ${token}`
				}
				return config
			},
			(error) => {
				return Promise.reject(error)
			}
		)

		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				return response
			},
			(error) => {
				if (error.response?.status === 401) {
					this.clearAuth()
					window.location.href = '/login'
				}
				return Promise.reject(error)
			}
		)
	}

	private getToken(): string | null {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('auth_token')
		}
		return null
	}

	private clearAuth() {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('auth_token')
			localStorage.removeItem('auth_user')
		}
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.get<T>(url, config)
		return response.data
	}

	async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.post<T>(url, data, config)
		return response.data
	}

	async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.put<T>(url, data, config)
		return response.data
	}

	async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.patch<T>(url, data, config)
		return response.data
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.delete<T>(url, config)
		return response.data
	}
}

export const apiService = new ApiService()
