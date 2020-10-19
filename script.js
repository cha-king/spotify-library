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
        entry.ondblclick = () => {
            const url = artist.external_url;
            window.open(url);
        }
        entry.onclick = () => {
            const album_list = document.getElementById('album-list');
            while (album_list.firstChild) {
                album_list.removeChild(album_list.firstChild);
            }
            artist.albums.sort((a, b) => {
                return (a.name.replace(/^The /, '') > b.name.replace(/^The /, '')) ? 1 : -1;
            })
            artist.albums.forEach(album => {
                const album_entry = document.createElement('div');
                album_entry.className = 'list-entry';
                album_entry.textContent = album.name;
                album_entry.ondblclick = () => {
                    window.open(album.external_urls.spotify);
                };
                album_list.append(album_entry);
            })
        }
        artist_col.append(entry);
    };
}

const token_match = window.location.hash.match(/access_token=([^&]+)/);
const state_match = window.location.hash.match(/state=([^&]+)/);
if (!(token_match && state_match)) {
    window.location = '/login.html';
}
returned_state = state_match[1];
submit_state = window.sessionStorage.getItem('state');
if (returned_state !== submit_state) {
    throw Error('State value in redirect URI does not match.');
}
const access_token = token_match[1];

getArtists(access_token).then(artists => displayArtists(artists));
