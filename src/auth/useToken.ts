const TOKEN_KEY = "token";

export default function useToken() {
  return localStorage.getItem(TOKEN_KEY);
}
