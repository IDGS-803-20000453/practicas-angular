import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import swal from 'sweetalert2';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css'],
})
export class PizzasComponent {
  selectedT: string = 'chica';
  ingrediente1!: string ;
  ingrediente2!: string ;
  ingrediente3!: string ;
  nombre!: string ;
  direccion!: string ;
  telefono!: string ;

  numeroPizzas: number = 0;
  tamanio = [
    'chica',
    'mediana',
    'grande'
  ];

  ventasDia: Array<{
    id: number;
    nombre: string;
    total: number;
  }> = [];

  pedido: Array<{
    id: number;
    nombre: string;
    tamanio: string;
    ingredientes: Array<string>;
    numPizas: number;
    subtotal: number;
  }> = [];

  agregarPedido() {
    let subtotal=0;
    var precio = 0;
    if (this.selectedT == "chica"){precio = 40;}
    else if (this.selectedT == "mediana"){precio = 80;}
    else if (this.selectedT == "grande"){precio = 120;}
    
    if (this.ingrediente1 ){precio += 10; this.ingrediente1 = "jamon";}
    if (this.ingrediente2){precio += 10;this.ingrediente2 = "piña";}
    if (this.ingrediente3){precio += 10;this.ingrediente3 = "champiñones";}
    subtotal = precio * this.numeroPizzas;

    this.pedido.push({
      id: this.pedido.length + 1,
      nombre: this.nombre,
      tamanio: this.selectedT,
      ingredientes: [this.ingrediente1, this.ingrediente2, this.ingrediente3],
      numPizas: this.numeroPizzas,
      subtotal: subtotal
    })

    this.ingrediente1 = "";
    this.ingrediente2 = "";
    this.ingrediente3 = "";
  }

  quitarPedido(id: number) {
    this.pedido.splice(id-1);
  }

  mostrarNota() {
    let total=0
    for (let pedido of this.pedido) {
      total += pedido.subtotal;
    }
    Swal.fire({
      title: 'Detalle de compra',
      html: '<b>Total: $' + total + '</b> <br> cliente: ' + this.nombre + ' <br> direccion: ' + this.direccion + ' <br> telefono: ' + this.telefono,
      icon: 'info'
    });

    this.ventasDia.push({
      id: this.ventasDia.length + 1,
      nombre: this.nombre,
      total: total
    });

    this.pedido=[];
    this.numeroPizzas = 0;
    this.nombre="";
    this.direccion="";
    this.telefono="";
  }
}
