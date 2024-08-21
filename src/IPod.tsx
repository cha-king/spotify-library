import styles from "./iPod.module.css";

import useAlbums from "./hooks/useAlbums";
import { useMemo } from "react";
import { albumsToArtists } from "./spotify";
import useLoginRedirect from "./hooks/useLoginRedirect";

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
    <div className={styles.iPod}>
      <ul>
        {artists?.map(({ name }, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
