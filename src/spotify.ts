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

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error(`Invalid status code ${response.status}`);
  }
  const { items } = (await response.json()) as AlbumsResponse;

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

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error(`Invalid status code ${response.status}`);
  }
  const { total } = (await response.json()) as AlbumsResponse;

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
