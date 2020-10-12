const API_URL = 'https://api.spotify.com/v1/me/albums';


async function getArtists(token) {
    let artists = new Set();
    let url = API_URL + '?limit=50';
    do {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        data.items.forEach(item => {
            item.album.artists.forEach(artist => {
                artists.add(artist.name);
            });
        });
        url = data.next;
        console.log(data);
    } while (url);
    return Array.from(artists).sort((a, b) => {
        return (a.replace(/^The /, '') > b.replace(/^The /, '')) ? 1 : -1;
    });
}


async function displayArtists(artists) {
    console.log(artists);
    const artist_col = document.getElementById('artist_col');
    artists.forEach(artist => {
        let option = document.createElement('option');
        option.text = artist;
        artist_col.append(option);
    });
}

if (!window.location.hash) {
    window.location = '/spotify-library/auth.html';
}

const token = window.location.hash.substring(1).split('&')[0].split('=')[1];

getArtists(token).then(artists => displayArtists(artists));
