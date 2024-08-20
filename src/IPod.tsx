import useAlbums from "./hooks/useAlbums";

export default function IPod() {
  const albums = useAlbums();

  return <div>Hey</div>;
}
