export interface Cliente {
   id: number;
   nombre: string;
   correo: string;
   cedula: string;
   valor_solicitado: number;
   fecha_pagar: string;
   estado_credito: boolean;
   pago_credito: boolean; 
   solicitado: boolean;
   historial: [];
}