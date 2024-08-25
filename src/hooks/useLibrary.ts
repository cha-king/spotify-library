import { useEffect, useState } from "react";

import { Album, Artist, Library } from "../types";
import { getAlbums } from "../spotify";

export default function useLibrary() {
  const [library, setLibrary] = useState<Library | null>(null);

  useEffect(() => {
    if (library !== null) {
      return;
    }

    getAlbums().then((albums) => setLibrary(albumsToLibrary(albums)));
  }, [library]);

  return library;
}

function albumsToLibrary(albums: Album[]): Library {
  const library = new Map<string, Artist>();
  for (const album of albums) {
    for (const { name: artistName } of album.artists) {
      let artist = library.get(artistName);
      if (artist === undefined) {
        artist = { name: artistName, albums: new Map() };
        library.set(artistName, artist);
      }
      artist.albums.set(album.name, album);
    }
  }
  return library;
}
