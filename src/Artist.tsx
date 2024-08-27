import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Library } from "./types";
import { useMemo } from "react";

export default function Artist() {
  const library = useOutletContext<Library>();
  const { artistName } = useParams();

  const artist = library.get(artistName || "");
  if (artist === undefined) {
    // TODO: Redirect to 404
    return null;
  }

  return <Outlet context={artist} />;
}
