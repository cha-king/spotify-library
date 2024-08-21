import { useOutletContext } from "react-router-dom";
import { Artist } from "./types";

export default function Artists() {
  const artists = useOutletContext<Artist[]>();

  return (
    <ul>
      {artists.map(({ name }, i) => (
        <li key={i}>{name}</li>
      ))}
    </ul>
  );
}
