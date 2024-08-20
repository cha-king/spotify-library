import { getToken } from "./auth/util";
import { SPOTIFY_API_URL } from "./constants";
import { Album, Artist } from "./types";

const LIMIT = 50;

interface AlbumsResponse {
  items: Item[];
  total: number;
}

interface Item {
  album: Album;
}

async function fetchAlbums(access_token: string, offset: number) {
  const url = new URL(SPOTIFY_API_URL);
  url.search = new URLSearchParams({
    limit: LIMIT.toString(),
    offset: offset.toString(),
  }).toString();

  const { items } = (await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((response) => response.json())) as AlbumsResponse;

  const albums = items.map((item) => item.album);

  return albums;
}

export async function getAlbums(): Promise<Album[]> {
  const token = await getToken();
  if (token === null) {
    throw new Error("No token");
  }
  const { access_token } = token;

  const url = new URL(SPOTIFY_API_URL);
  url.search = new URLSearchParams({
    limit: "1",
    offset: "0",
  }).toString();

  const { total } = (await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((response) => response.json())) as AlbumsResponse;

  const promises = [];
  for (let offset = 0; offset < total; offset += LIMIT) {
    const promise = fetchAlbums(access_token, offset);
    promises.push(promise);
  }

  const albums = (await Promise.all(promises)).reduce(
    (albums, albumList) => [...albums, ...albumList],
    []
  );

  return albums;
}

export function albumsToArtists(albums: Album[]): Artist[] {
  const artists = new Map<string, Artist>();
  for (const album of albums) {
    for (const { name: artistName } of album.artists) {
      let artist = artists.get(artistName);
      if (artist === undefined) {
        artist = { name: artistName, albums: [] };
        artists.set(artistName, artist);
      }
      artist.albums.push(album);
    }
  }
  return Array.from(artists.values());
}
