import { apiService } from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import type {
  ProductsResponse,
  ProductResponse,
  ApiResponse,
  CreateProductRequest,
  UpdateProductRequest,
  UpdateThumbnailRequest
} from '@/types/product'

export class ProductService {
	static async getProducts(page: number = 1, pageSize: number = 10): Promise<ProductsResponse> {
		return await apiService.get(API_ENDPOINTS.PRODUCTS.LIST, {
			params: { page, pageSize }
		})
	}

	static async getProduct(id: string): Promise<ProductResponse> {
		return await apiService.get(API_ENDPOINTS.PRODUCTS.GET(id))
	}

	static async createProduct(data: CreateProductRequest): Promise<ApiResponse> {
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('description', data.description)

		if (data.thumbnail) {
			formData.append('thumbnail', data.thumbnail)
		}

		return await apiService.post(API_ENDPOINTS.PRODUCTS.CREATE, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}

	static async updateProduct(id: string, data: UpdateProductRequest): Promise<ApiResponse> {
		return await apiService.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), data)
	}

	static async updateThumbnail(id: string, data: UpdateThumbnailRequest): Promise<ApiResponse> {
		const formData = new FormData()
		formData.append('thumbnail', data.thumbnail)

		return await apiService.patch(API_ENDPOINTS.PRODUCTS.UPDATE_THUMBNAIL(id), formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}

	static async deleteProduct(id: string): Promise<ApiResponse> {
		return await apiService.delete(API_ENDPOINTS.PRODUCTS.DELETE(id))
	}

	static async uploadThumbnailFromUrl(url: string): Promise<{ url: string }> {
		return { url }
	}
}
