import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getAlbums } from "./spotify";
import { hasToken } from "./auth/util";

export default function IPod() {
  useEffect(() => {
    if (isLoggedIn) {
      getAlbums();
    }
  }, [isLoggedIn]);

  return <div>Hey</div>;
}
