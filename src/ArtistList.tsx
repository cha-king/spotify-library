import { useNavigate, useOutletContext } from "react-router-dom";
import { Artist, Library } from "./types";
import { useMemo } from "react";

export default function ArtistList() {
  const navigate = useNavigate();
  const library = useOutletContext<Library>();

  const artists = useMemo(() => {
    return Array.from(library.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [library]);

  const onClick = ({ name }: Artist) => {
    navigate(`./${name}`);
  };

  return (
    <ul>
      {artists.map((artist, i) => (
        <li key={i} onClick={() => onClick(artist)}>
          {artist.name}
        </li>
      ))}
    </ul>
  );
}
