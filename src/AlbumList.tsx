import { useOutletContext } from "react-router-dom";
import { Album } from "./types";

export default function AlbumList() {
  const albums = useOutletContext<Album[]>();

  return (
    <ul>
      {Array.from(albums.values()).map((album) => (
        <li>{album.name}</li>
      ))}
    </ul>
  );
}
