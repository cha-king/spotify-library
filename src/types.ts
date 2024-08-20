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
}

export interface ArtistResponse {
  name: string;
}

export interface Artist {
  name: string;
  albums: Album[];
}
