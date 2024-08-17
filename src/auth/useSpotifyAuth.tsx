import { useEffect } from "react";

const CLIENT_ID = "ebded317aa0c41048b1cd4ac05c6c37d";
const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3000"
const STATE = "";
const SCOPE = "user-library-read"

function base64UrlEncode(value: string) {
  return btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/\=+$/g, "");
}

function generateCodeVerifier() {
  const randomVals = crypto.getRandomValues(new Uint8Array(32));
  const randomString = Array.from(randomVals).join("");
  const randomBase64 = base64UrlEncode(randomString);

  return randomBase64;
}

async function generateCodeChallenge(codeVerifer: string) {
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(codeVerifer)
  );
  const challenge = base64UrlEncode(
    Array.from(new Uint8Array(digest)).join("")
  );

  return challenge;
}

async function auth() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  window.localStorage.setItem("code_verifier", verifier);
  requestAuthorization(challenge);
}

function requestAuthorization(challenge: string) {
  const url = new URL(SPOTIFY_AUTH_URL);
  const params = new URLSearchParams({
    response_type: "code",
    code_challenge_method: "S256",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    // state: STATE,
    scope: SCOPE,
    code_challenge: challenge,
  });
  url.search = params.toString();

  window.location.href = url.toString();
}

export default function useSpotifyAuth() {
  useEffect(() => {
    if (document.location.pathname === "/auth") {
        auth();
    }
  }, []);
}
