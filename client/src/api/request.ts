export async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include', // 預設帶 cookie
  })

  if (!res.ok) {
    const errMsg = await res.text()
    throw new Error(errMsg || res.statusText)
  }

  const data = await res.json()
  return data as T
}
