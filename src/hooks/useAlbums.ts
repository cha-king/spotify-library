import { useEffect, useState } from "react";

import { Album } from "../types";
import { getAlbums } from "../spotify";

export default function useAlbums() {
  const [albums, setAlbums] = useState<Album[] | null>(null);

  useEffect(() => {
    if (albums !== null) {
      return;
    }

    getAlbums().then(setAlbums);
  }, [albums]);

  return albums;
}
