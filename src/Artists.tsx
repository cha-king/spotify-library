import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { Artist, Library } from "./types";
import { useMemo } from "react";

export default function Artists() {
  const library = useOutletContext<Library>();

  return <Outlet context={library} />;
}
