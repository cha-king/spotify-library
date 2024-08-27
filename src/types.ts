export interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: "Bearer";
  expires_in: number;
  refresh_token: string;
}

export interface Token extends TokenResponse {
  expires_at: number;
}

export interface Album {
  name: string;
  artists: ArtistResponse[];
  tracks: Tracks;
  images: Image[];
}

export interface Image {
  height: number;
  width: number;
  url: string;
}

export interface ArtistResponse {
  name: string;
}

export interface Artist {
  name: string;
  albums: Map<string, Album>;
}

export type Library = Map<string, Artist>;

export interface Track {
  name: string;
}

export interface Tracks {
  items: Track;
}
