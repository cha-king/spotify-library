import { SPOTIFY_API_URL } from "./constants";
import { Token } from "./types";

interface AlbumsResponse {
  items: Item[];
}

interface Item {
  album: Album;
}

interface Album {}

export async function getAlbums({ access_token }: Token): Promise<Album[]> {
  const url = new URL(SPOTIFY_API_URL);
  url.search = new URLSearchParams({
    limit: "50",
  }).toString();

  const response = (await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((response) => response.json())) as AlbumsResponse;

  const albums = response.items.map((item) => item.album);

  return albums;
}
