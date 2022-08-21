type FetchOptions = Omit<RequestInit, "credentials">;

const fetchApi = (route: string, options: FetchOptions) =>
  fetch(`/api/${route}`, { ...options, credentials: "include" });

type HelperOptions = Omit<FetchOptions, "method">;

export const get = (route: string, options: Omit<HelperOptions, "body"> = {}) =>
  fetchApi(route, { method: "GET", ...options });

export const post = (route: string, options: HelperOptions = {}) =>
  fetchApi(route, { method: "POST", ...options });

export const json = <T>(res: Response) => res.json() as Promise<T>;
