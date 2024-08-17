import { useEffect } from "react";

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
    const key = generateCodeVerifier();
    const challenge = await generateCodeChallenge(key);
    console.log(challenge);
}

export default function useSpotifyAuth() {
  useEffect(() => {
    auth();
  }, []);
}
