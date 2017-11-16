import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Renglon, Cotizacion } from './cotizacion-model';
import { Cliente, Producto } from './cotizacion-model';
import { DataService } from '../data.service'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  cotizacionForm: FormGroup;       // This property of type FormGroup holds the entire form.
  
  mostrarClientes = false;
  mostrarIdCliente = false;
  clienteIngresadoPorTeclado = true;

  mostrarProductos = [];
  mostrarIdProducto = [];
  productoIngresadoPorTeclado = [];

  productoPrecio = [];
  productoCantidad = [];
  productoTotal = [];

  totalCotizacion = 0;

  idCliente = "";

  clientes: Cliente[];
  productos: Producto[]; 

  constructor(private fb: FormBuilder, private dataService: DataService ){
    this.createForm();   
    this.chequearInputCliente();
  } 

  ngOnInit() {
    this.addRenglon();
  }

  createForm() {
    this.cotizacionForm = this.fb.group({  
      cliente: ['', Validators.required ], 
      items: this.fb.array([]), 
      condiciones: 'This offer is valid for 15 days.'
    });
  }

  chequearInputCliente(){
    this.cotizacionForm.get('cliente')   
        .valueChanges
        .debounceTime(750)
        .subscribe((entry: string) => { 
          
             if( (this.clienteIngresadoPorTeclado) && entry.length>0 ){
               this.clientes = this.dataService.traerClientes(entry);
               this.mostrarClientes= true;             
             } else {
               this.mostrarClientes= false;
               this.clienteIngresadoPorTeclado = true;
             }            
           });
   }

   chequearInputProducto(index){

    const myItem = this.items.at(index); 
   
    myItem.get('producto')   
        .valueChanges
        .debounceTime(750)
        .subscribe((entry: string) => {
            if( (this.productoIngresadoPorTeclado[index]) && entry.length>0 ){              
               this.productos = this.dataService.traerProductos(entry);
               this.mostrarProductos[index]= true;             
             } else {
               this.mostrarProductos[index]= false;
               this.productoIngresadoPorTeclado[index] = true;
             }        
           });
   }

   chequearInputCantidad(index){
    
        const myItem = this.items.at(index); 
       
        myItem.get('cantidad')   
            .valueChanges
            .debounceTime(750)
            .subscribe((entry: number) => {
                this.productoTotal[index] = entry*this.productoPrecio[index];
                this.calcularTotalCotizacion();    
               });
       }
 
  setRenglones(renglones: Renglon[]) {
    const renglonFormGroups = renglones.map(renglon => this.fb.group(renglon));
    const renglonFormArray = this.fb.array(renglonFormGroups);
    this.cotizacionForm.setControl('items', renglonFormArray);  //Updates 'items' FormArray.
  }

  //FormGroup.get method to acquire a reference to the FormArray:
  get items(): FormArray {
    return this.cotizacionForm.get('items') as FormArray;
  };

  addRenglon() {
    
    this.items.push(this.fb.group(new Renglon()));
    
    const indiceNuevoRenglon = this.items.length -1;
    console.log("indiceNuevoRenglon: "+indiceNuevoRenglon);
    this.mostrarProductos.push(false);
    this.mostrarIdProducto.push(false);
    this.productoIngresadoPorTeclado.push(true);
    this.chequearInputProducto(indiceNuevoRenglon);

  }

  eliminarRenglon(i:number){
    this.items.controls.splice(i,1);
    this.productoCantidad.splice(i,1);
    this.productoPrecio.splice(i,1);
    this.productoTotal.splice(i,1);
    this.calcularTotalCotizacion();
  }
  
  calcularTotalCotizacion(){
    this.totalCotizacion = this.productoTotal.reduce((x, y) => x + y);
  }

  clienteSeleccionado(id:string, clienteSeleccionado:string){
    
    this.clienteIngresadoPorTeclado = false;
    this.cotizacionForm.patchValue({
      cliente: clienteSeleccionado
     });
    this.mostrarClientes= false;
    this.idCliente = id;
    this.mostrarIdCliente = true;
  }

    productoSeleccionado(id:string, productoSeleccionado:string, productoPrecio: number, i:number){
    
    this.productoIngresadoPorTeclado[i] = false;  
    this.items.at(i).patchValue({
      producto: productoSeleccionado
    });
    this.productoPrecio[i] = productoPrecio;
    this.mostrarProductos[i]= false;
    this.chequearInputCantidad(i);
  }

}
