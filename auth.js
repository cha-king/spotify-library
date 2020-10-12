const API_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = 'ebded317aa0c41048b1cd4ac05c6c37d';

document.getElementById('auth-button').onclick = async () => {
    let url = API_URL;
    url += '?client_id=' + encodeURIComponent(CLIENT_ID);
    url += '&response_type=token' 
    url += '&redirect_uri=' + encodeURIComponent('http://localhost:8000/index.html');
    url += '&scope' + 'user-library-read';
    /*
    const response = await fetch(url);
    const response_data = await response.json();
    console.log(response_data);
    */
    window.location = url;
}
