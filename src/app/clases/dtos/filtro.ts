import {  TipoDeComparacion } from "../enums";

export class Filtro<t>{
    public enabled:boolean=false;
    public filters:FiltroDetalle<t>[]=[];
    constructor(){}
    setCantidadFilters(cantidad:number){
        this.filters = [];
        for (let i = 0;i<cantidad;i++){
            this.filters.push(new FiltroDetalle<t>);
        }
    }
    comprobar(){
        let listaAuxiliar =  this.filters.filter((filtroDetalle) => { return filtroDetalle.comprobar()})
        this.enabled = (listaAuxiliar.length>0);
    }


}
export class FiltroDetalle<t>{
    public enabled=false;
    public campo:t | null = null;
    public terminosDeBusqueda:string[] = [""]
    public tipoBusqueda:TipoDeComparacion = TipoDeComparacion.CONTIENE;
    constructor(){}
    comprobar():boolean{
        this.enabled = this.campo!=null && this.terminosDeBusqueda[0]!="";
        return this.enabled;
    }
}