import { TOKEN_KEY } from "../constants";

export default function useToken() {
  return localStorage.getItem(TOKEN_KEY);
}
