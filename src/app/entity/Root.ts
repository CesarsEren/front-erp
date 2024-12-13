import { Manifiesto } from './Manifiesto';
import { Token } from './Token';
import { SolicitudgrtService } from '../services/solicitudgrt.service';

export interface Root {
  out_data: Token | PageManifiesto | Agencia[] | ProgramacionDto | PageEncomienda | ResponseGrt;
  out_mensaje_interno: string;
  out_mensaje_cliente: string;
  out_estado: number;
}

export interface Agencia {
  codigo: string;
  descripcion: string;
}

export interface PageManifiesto {
  content: Manifiesto[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  sort: Sort2;
  size: number;
  number: number;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface FiltroManifiesto {
  agencia: string;
}

export interface Conductores {
  nombreConductor: string;
  licenciaConductor: string;
}

export interface PageEncomienda{
  content: Encomiendas[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  sort: Sort2;
  size: number;
  number: number;
  empty: boolean;
}

export interface Encomiendas {
  nro: string
  serienumero: string
  destinod:string
  consignado: string
  remitente: string
  nrobultos: string
  pesototal: string
  costototal: string
}

export interface ProgramacionDto{
  nro: string
  destinod: string
  agenciaOrigen: string
  direccionAgenciaOrigen: any
  nroBus: string
  placaBus: string
  marcaBus: string
  conductores: Conductores[]
}


export interface Solicitudgrt{
  idManifiesto:number;
}

export interface ResponseGrt {
  id: number
  idManifiesto: number
  generado: number
  fecha_solicitud: string
}