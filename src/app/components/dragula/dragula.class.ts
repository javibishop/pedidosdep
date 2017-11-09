import {IDragula} from './dragula.interface'


export class Dragula {
    constructor(
        public id: string,
        public pedidoId: number,
        public nombre: string,
        public numero: string,
        public cliente: string,
        public solicitadinero: boolean,
        public tienedeuda: boolean,
        public estilo: any,
        public tooltip: string
    ){}
}