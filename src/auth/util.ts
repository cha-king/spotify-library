import { TOKEN_KEY } from "../constants";
import { Token, TokenResponse } from "../types";

const CLIENT_ID = "ebded317aa0c41048b1cd4ac05c6c37d";
const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const REDIRECT_URI = "http://localhost:3000/redirect";
const STATE = "";
const SCOPES = ["user-library-read", "user-modify-playback-state"];

export function base64UrlEncode(value: string) {
  return btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/\=+$/g, "");
}

export function arrayToString(array: Uint8Array) {
  return Array.from(array)
    .map((byte) => String.fromCharCode(byte))
    .join("");
}

export function generateCodeVerifier() {
  const randomVals = crypto.getRandomValues(new Uint8Array(32));
  const randomString = arrayToString(randomVals);
  const randomBase64 = base64UrlEncode(randomString);

  return randomBase64;
}

export async function generateCodeChallenge(codeVerifer: string) {
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(codeVerifer)
  );
  const challenge = base64UrlEncode(arrayToString(new Uint8Array(digest)));

  return challenge;
}

export function requestAuthorization(challenge: string) {
  const url = new URL(SPOTIFY_AUTH_URL);
  const params = new URLSearchParams({
    response_type: "code",
    code_challenge_method: "S256",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    // state: STATE,
    scope: SCOPES.join(" "),
    code_challenge: challenge,
  });
  url.search = params.toString();

  window.location.href = url.toString();
}

export async function refreshToken({ refresh_token }: Token) {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
      client_id: CLIENT_ID,
    }),
  });
  if (response.status != 200) {
    throw new Error(`Invalid response code ${response.status}`);
  }

  const tokenResponse = (await response.json()) as TokenResponse;

  const token: Token = {
    ...tokenResponse,
    expires_at: tokenResponse.expires_in * 1000 + Date.now(),
  };

  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  return token;
}

export async function getToken() {
  const tokenRaw = localStorage.getItem(TOKEN_KEY);
  if (tokenRaw === null) {
    return null;
  }

  let token = JSON.parse(tokenRaw) as Token;

  // Refresh token if needed
  if (token.expires_at <= Date.now()) {
    token = await refreshToken(token);
  }

  return token;
}

export function hasToken() {
  return localStorage.getItem(TOKEN_KEY) !== null;
}
