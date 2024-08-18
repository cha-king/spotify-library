import {
  generateCodeChallenge,
  generateCodeVerifier,
  requestAuthorization,
} from "./auth/util";

async function login() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  window.sessionStorage.setItem("code_verifier", verifier);
  requestAuthorization(challenge);
}

export default function Login() {
  return (
    <div>
      <h2>Log In</h2>
      <p>Spotify access is required to continue</p>
      <button onClick={login}>
        <span>Log in with Spotify</span>
      </button>
    </div>
  );
}
