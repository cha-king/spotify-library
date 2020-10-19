const API_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = 'ebded317aa0c41048b1cd4ac05c6c37d';
const REDIRECT_URL = 'https://library.cha-king.com';

document.getElementById('auth-button').onclick = async () => {
    const state = Math.random().toString(36).substring(2);
    window.sessionStorage.setItem('state', state);

    let url = API_URL;
    url += '?client_id=' + encodeURIComponent(CLIENT_ID);
    url += '&response_type=token' 
    url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URL);
    url += '&scope=' + 'user-library-read';
    url += '&state=' + encodeURIComponent(state);
    window.location = url;
}
