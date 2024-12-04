export interface Response<T> {
  data: T | T[]
  status: number
  message: string
  current_page: number
  per_page: number
  first_page_url: string
  from: number
  last_page_url: string
  last_page: number
  links: {url: string, label: string; active: boolean}[]
  prev_page_url: string
  next_page_url: string
  path: string
  to: number
  total: number
}

export interface UploadResponse {
  status: number;
  url: string
}
