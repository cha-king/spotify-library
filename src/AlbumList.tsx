import { useNavigate, useOutletContext } from "react-router-dom";
import { Artist } from "./types";

export default function AlbumList() {
  const { albums } = useOutletContext<Artist>();
  const navigate = useNavigate();

  const onClick = (albumName: string) => {
    navigate(`./albums/${albumName}`);
  };

  return (
    <ul>
      {Array.from(albums.values()).map(({ name }) => (
        <li onClick={() => onClick(name)}>{name}</li>
      ))}
    </ul>
  );
}
