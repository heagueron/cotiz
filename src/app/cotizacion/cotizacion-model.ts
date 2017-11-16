export class Renglon {
  producto = "";
  cantidad = 0;
  precio = 0;
}

export class Cotizacion {
  id : number;
  cliente : string;
  renglones: Renglon[];
  condiciones = 'This offer is valid for 15 days.';
}

export class Cliente {
  id : number;
  nombre = "";
}

export class Producto {
  id: number;
  nombre: string;
  precio: number;
  existencia: number;
}

export const productos: Producto[] = [
  { id: 1, nombre: 'Leche KLIM polvo 1Kg', precio: 50000, existencia: 300 },
  { id: 2, nombre: 'Quinchoncho La Lucha 500 gr', precio: 23000, existencia: 300 },
  { id: 3, nombre: 'Chimo caja 25 gr', precio: 10000, existencia: 300 },
  { id: 4, nombre: 'Jugo de Jemgibre 500 ml', precio: 50000, existencia: 300 },
  { id: 5, nombre: 'Cacao molido 500 gr', precio: 50000, existencia: 300 },
  { id: 6, nombre: 'Coco rallado 500 gr', precio: 50000, existencia: 300 },
  { id: 7, nombre: 'Ajo en polvo 250 gr', precio: 50000, existencia: 300 },
  { id: 8, nombre: 'Perejil 1kg', precio: 50000, existencia: 300 },
  { id: 9, nombre: 'Berenjena molida 500 gr', precio: 50000, existencia: 300 },
  { id: 10, nombre: 'Bollos de pollo 1kg', precio: 50000, existencia: 300 },
  { id: 11, nombre: 'Azucar morena 1kg', precio: 50000, existencia: 300 }
];

export const clientes: Cliente[] = [
  { id: 1, nombre: 'Bodega El Cantinflas'},
  { id: 2, nombre: 'Ferreteria El Tornillo'},
  { id: 3, nombre: 'Abastos Su Compra'},
  { id: 4, nombre: 'Telas Para Cortar'},
  { id: 5, nombre: 'Taller Te Lo Reparo'},
  { id: 6, nombre: 'Humberto Medina'},
  { id: 7, nombre: 'Casa del Fumador'},
  { id: 8, nombre: 'Pasteles PasteLar'},
  { id: 9, nombre: 'Makro'},
  { id: 10, nombre: 'Ferretotal'},
]


