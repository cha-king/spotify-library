import { useOutletContext } from "react-router-dom";
import { Track } from "./types";
import { playTrack } from "./spotify";

export default function TrackList() {
  const tracks = useOutletContext<Track[]>();

  const onTrackClick = ({ uri }: Track) => {
    playTrack(uri);
  };

  return (
    <ul>
      {tracks.map((track) => (
        <li onClick={() => onTrackClick(track)}>{track.name}</li>
      ))}
    </ul>
  );
}
