import { useOutletContext, useParams } from "react-router-dom";
import { Library } from "./types";
import { useMemo } from "react";

export default function Artist() {
  const library = useOutletContext<Library>();
  const { artistName } = useParams();

  const albums = useMemo(() => {
    if (artistName === undefined) {
      return null;
    }
    const artist = library.get(artistName);
    if (artist === undefined) {
      return null;
    }
    return Array.from(artist.albums.values()).sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }, [library, artistName]);

  if (albums === null) {
    return null;
  }

  return (
    <ul>
      {albums.map((album) => (
        <li>{album.name}</li>
      ))}
    </ul>
  );
}
