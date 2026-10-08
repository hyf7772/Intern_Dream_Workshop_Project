export interface ApiRequestOptions extends RequestInit {
  /** 允许调用方覆盖默认的 JSON 请求头。 */
  headers?: Record<string, string>
}

export class ApiError extends Error {
  readonly status?: number
  readonly code: string
  readonly path: string

  constructor(message: string, options: { code: string; path: string; status?: number }) {
    super(message)
    this.name = 'ApiError'
    this.code = options.code
    this.path = options.path
    this.status = options.status
  }
}

export interface ApiClient {
  request<T>(path: string, options?: ApiRequestOptions): Promise<T>
}

const resolveApiBaseUrl = () => (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

/**
 * 后端接入时的统一 HTTP 边界。未配置地址时不会误发请求，继续使用各业务的 mock service。
 */
export const createApiClient = (baseUrl = resolveApiBaseUrl()): ApiClient => ({
  async request<T>(path: string, options: ApiRequestOptions = {}) {
    if (!baseUrl) throw new ApiError('未配置后端接口地址', { code: 'API_BASE_URL_MISSING', path })

    let response: Response
    try {
      response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
      })
    } catch {
      throw new ApiError('网络请求失败，请检查网络连接', { code: 'NETWORK_ERROR', path })
    }

    const contentType = response.headers.get('content-type') ?? ''
    const payload = contentType.includes('application/json') ? await response.json() : await response.text()
    if (!response.ok) {
      const message = typeof payload === 'object' && payload && 'message' in payload ? String(payload.message) : '接口请求失败'
      throw new ApiError(message, { code: 'HTTP_ERROR', path, status: response.status })
    }
    return payload as T
  },
})

export const apiClient = createApiClient()
