import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { clientes, productos } from './cotizacion/cotizacion-model';

@Injectable()
export class DataService {

  clientes = clientes;
  productos = productos;


traerClientes(entry){
  console.log("entry recibido en fss traerClientes: "+entry); 
  return this.clientes.filter((cliente) => {return cliente.nombre.includes(entry);});
}

traerProductos(entry){
  console.log("entry recibido en fss traerProductos: "+entry);
  return this.productos.filter((producto) => {return producto.nombre.includes(entry);});
  }

}