const API_URL = 'https://api.spotify.com/v1/me/albums';
const API_PAGE_LIMIT = 50;


async function getArtists(token) {
    const artists = {};
    let url = API_URL + '?limit=50';

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    const num_albums = data.total;

    const promises = [];
    for (i = 0; i + API_PAGE_LIMIT <= num_albums + API_PAGE_LIMIT; i += API_PAGE_LIMIT) {
        url = API_URL + `?limit=${API_PAGE_LIMIT}` + `&offset=${i}`;
        const promise = fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(content => {
            content.items.forEach(item => {
                item.album.artists.forEach(artist => {
                    if (!(artist.name in artists)) {
                        artists[artist.name] = {
                            albums: [],
                            external_url: artist.external_urls.spotify
                        };
                    }
                    artists[artist.name].albums.push(item.album);

                });
            });
        });
        promises.push(promise);
    }
    await Promise.all(promises);
    return artists;
}


async function displayArtists(artists) {
    artist_names = Object.keys(artists);
    artist_names.sort((a, b) => {
        return (a.replace(/^The /, '') > b.replace(/^The /, '')) ? 1 : -1;
    });

    const artist_col = document.getElementById('artist-list');
    for (const artist_name of artist_names) {
        const artist = artists[artist_name];
        let entry = document.createElement('div');
        entry.textContent = artist_name;
        entry.className = 'list-entry';
        entry.onclick = () => {
            const url = artist.external_url;
            window.open(url);
        }
        artist_col.append(entry);
    };
}

if (!window.location.hash) {
    window.location = '/auth.html';
}

// TODO: Hash parsing
const token = window.location.hash.substring(1).split('&')[0].split('=')[1];

getArtists(token).then(artists => displayArtists(artists));
