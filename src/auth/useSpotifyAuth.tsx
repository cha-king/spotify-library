import { useEffect } from "react";

const CLIENT_ID = "ebded317aa0c41048b1cd4ac05c6c37d";
const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const REDIRECT_URI = "http://localhost:3000/redirect";
const STATE = "";
const SCOPE = "user-library-read";

interface Token {
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

  const token = (await response.json()) as Token;

  return token;
}
