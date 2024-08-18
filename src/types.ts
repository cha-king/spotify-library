export interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: "Bearer";
  expires_in: number;
  refresh_token: string;
}

export interface Token extends TokenResponse {
  expired_at: number;
}
