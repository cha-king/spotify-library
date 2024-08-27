import { useOutletContext } from "react-router-dom";
import { Track } from "./types";

export default function TrackList() {
  const tracks = useOutletContext<Track[]>();

  return (
    <ul>
      {tracks.map((track) => (
        <li>{track.name}</li>
      ))}
    </ul>
  );
}
