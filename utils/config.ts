export const BASE_URL = "http://localhost:8000/api/user";
export const getFromLocalStorage = (key: string) =>
  typeof window !== "undefined" ? localStorage.getItem(key) ?? null : null;

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") localStorage.removeItem(key);
};
export const saveToLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") localStorage.setItem(key, value);
};
