export interface Token {
  out_token: string;
  out_bearer: string;
  out_usuario: string;
  out_authorities: OutAuthority[];
}
export interface OutAuthority {
  authority: string;
}
