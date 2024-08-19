import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getAlbums } from "./spotify";
import { hasToken } from "./auth/util";

export default function IPod() {
  const navigate = useNavigate();
  const isLoggedIn = hasToken();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      getAlbums();
    }
  }, [isLoggedIn]);

  return <div>Hey</div>;
}
