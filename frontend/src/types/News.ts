export type TipoComunicado = "INFO" | "URGENT" | "EVENT";

export interface News {
  _id: string;
  autor_name: string;
  title: string;
  comments: string;
  created_at: string;
  type: TipoComunicado;
  fixed: boolean;
  expires_at: string | null;
}


export type NewsRequest = {
  autor_name: string;
  title: string;
  comments: string;
  created_at?: string;
  type: TipoComunicado;
  fixed: boolean;
  expires_at?: string;
};