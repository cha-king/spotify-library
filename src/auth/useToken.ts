import { TOKEN_KEY } from "../constants";
import { Token } from "../types";

export default function useToken() {
  const tokenRaw = localStorage.getItem(TOKEN_KEY);
  if (tokenRaw === null) {
    return null;
  }

  return JSON.parse(tokenRaw) as Token;
}
