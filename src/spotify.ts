import { SPOTIFY_API_URL } from "./constants";
import { Token } from "./types";

const LIMIT = 50;

interface AlbumsResponse {
  items: Item[];
  total: number;
}

interface Item {
  album: Album;
}

interface Album {}

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

export async function getAlbums({ access_token }: Token): Promise<Album[]> {
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
