import styles from "./iPod.module.css";

import useAlbums from "./hooks/useAlbums";
import { useMemo } from "react";
import { albumsToArtists } from "./spotify";
import useLoginRedirect from "./hooks/useLoginRedirect";
import { Outlet } from "react-router-dom";

export default function IPod() {
  useLoginRedirect();
  const albums = useAlbums();

  const artists = useMemo(
    () =>
      albums
        ? albumsToArtists(albums).sort((a, b) => a.name.localeCompare(b.name))
        : null,
    [albums]
  );

  return (
    <div className={styles.iPod}>{artists && <Outlet context={artists} />}</div>
  );
}
