export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  rendaMensal: number;
  cpf: string;
  rg: string;
  telefone: string;
}