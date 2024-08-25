import styles from "./iPod.module.css";

import useAlbums from "./hooks/useLibrary";
import { useMemo } from "react";
import useLoginRedirect from "./hooks/useLoginRedirect";
import { Outlet } from "react-router-dom";
import useLibrary from "./hooks/useLibrary";

export default function IPod() {
  useLoginRedirect();
  const library = useLibrary();

  return (
    <div className={styles.iPod}>{library && <Outlet context={library} />}</div>
  );
}
