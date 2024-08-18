import { useEffect } from "react";
import {
  CLIENT_ID,
  REDIRECT_URI,
  SPOTIFY_TOKEN_URL,
  TOKEN_KEY,
} from "./constants";
import { useNavigate } from "react-router";

interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: "Bearer";
  expires_in: number;
  refresh_token: string;
}

async function handleRedirect() {
  const params = new URLSearchParams(document.location.search);
  const authCode = params.get("code");
  if (authCode === null) {
    throw new Error("Missing code");
  }

  const verifier = window.sessionStorage.getItem("code_verifier");
  if (verifier === null) {
    throw new Error("Missing verifier");
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier,
    }),
  });
  if (response.status !== 200) {
    return
  }

  const token = (await response.json()) as TokenResponse;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export default function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    handleRedirect().then(() => navigate("/"));
  }, []);

  return null;
}
