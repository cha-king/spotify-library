const API_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = 'ebded317aa0c41048b1cd4ac05c6c37d';
const REDIRECT_URL = 'https://library.cha-king.com';

document.getElementById('auth-button').onclick = async () => {
    let url = API_URL;
    url += '?client_id=' + encodeURIComponent(CLIENT_ID);
    url += '&response_type=token' 
    url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URL);
    url += '&scope=' + 'user-library-read';
    window.location = url;
}