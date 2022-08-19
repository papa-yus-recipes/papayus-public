type Options = Omit<RequestInit, "method">;

const fetchApi = async <T>(route: string, options: RequestInit) =>
  (await fetch(`/api/${route}`, options)).json() as Promise<T>;

export const get = <T>(route: string, options: Options = {}) =>
  fetchApi<T>(route, { method: "GET", ...options });