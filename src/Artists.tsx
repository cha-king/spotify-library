import { useNavigate, useOutletContext } from "react-router-dom";
import { Artist } from "./types";

export default function Artists() {
  const navigate = useNavigate();
  const artists = useOutletContext<Artist[]>();

  const onClick = ({ name }: Artist) => {
    navigate(`/artist/${name}`);
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
