type Options = Omit<RequestInit, "method">;

const fetchApi = (route: string, options: RequestInit) => fetch(`/api/${route}`, options);

export const get = (route: string, options: Omit<Options, "body"> = {}) =>
  fetchApi(route, { method: "GET", ...options });

export const post = (route: string, options: Options = {}) =>
  fetchApi(route, { method: "POST", ...options });

export const json = <T>(res: Response) => res.json() as Promise<T>;
