import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Artist } from "./types";

export default function Album() {
  const { albums } = useOutletContext<Artist>();
  const { albumName } = useParams();

  const album = albums.get(albumName || "");
  if (album === undefined) {
    // TODO: Return 404
    return null;
  }

  return <Outlet context={album.tracks.items} />;
}
