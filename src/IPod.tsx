import { useNavigate } from "react-router";
import useToken from "./auth/useToken";
import { useEffect } from "react";
import { getAlbums } from "./spotify";

export default function IPod() {
  const navigate = useNavigate();
  const token = useToken();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token !== null) {
      getAlbums(token);
    }
  }, []);

  return <div>Hey</div>;
}
