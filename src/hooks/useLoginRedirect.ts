import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { hasToken } from "../auth/util";

export default function useLoginRedirect() {
  const navigate = useNavigate();
  const isLoggedIn = hasToken();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
}
