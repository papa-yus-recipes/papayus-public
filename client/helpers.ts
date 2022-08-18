export const getCookies = <T extends string[]>(...keys: T) => {
  const document_cookies = document.cookie.split(/;\s*/);
  const cookies: Partial<Record<T[number], string>> = {};
  for (const key of keys) {
    const prefix = `${key}=`;
    const cookie = document_cookies.find((cookie) => cookie.startsWith(prefix));
    if (!cookie) continue;
    cookies[key as T[number]] = cookie.substring(prefix.length);
  }
  return cookies;
};

export const isEven = (n: number) => (n & 1) === 0;

export const minutesToTime = (minutes: number) => {
  const remainder = minutes % 60;
  let time = `${remainder}mins`;
  const hours = (minutes - remainder) / 60;
  if (hours) time = `${hours}h ${time}`;
  return time;
};
