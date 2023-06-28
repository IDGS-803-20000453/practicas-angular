import { Component } from '@angular/core';

@Component({
  selector: 'app-cinepolis',
  templateUrl: './cinepolis.component.html',
  styleUrls: ['./cinepolis.component.css']
})
export class CinepolisComponent {
nombre!: string;
cantidadCompradores!: number;
tarjetaCineco: string="No";
cantidadBoletas!: number;
valorPago!: number;

//metodo de calcular
calcular(): void {
  //if de que no se pueda comprar mas de 7 boletas
  if (this.cantidadBoletas > 7*this.cantidadCompradores) {
    this.valorPago =0;
    this.nombre="";
    this.cantidadCompradores=0;
    this.tarjetaCineco="No";
    this.cantidadBoletas=0;
    alert('No se puede comprar mas de 7 boletas por persona');
  }else if(this.cantidadBoletas < 1){
    this.valorPago = 0;
    this.nombre="";
    this.cantidadCompradores=0;
    this.tarjetaCineco="No";
    this.cantidadBoletas=0;
    alert('No se puede comprar menos de 1 boleta');
}else{
  //if de que si la cantidad de compradores es mayor a la cantidad de boletas, no se puede comprar
  if (this.cantidadCompradores > this.cantidadBoletas) {
    this.valorPago = this.valorPago;
    this.nombre="";
    this.cantidadCompradores=0;
    this.tarjetaCineco="No";
    this.cantidadBoletas=0;
    alert('La cantidad de compradores no puede ser mayor a la cantidad de boleta');
    





  }else{
  //if de que si se compra mas de cinco boletas se le da un 15% de descuento, teniendo en cuenta que el boleto cuesta 12 pesos
  if (this.cantidadBoletas > 5) {
    this.valorPago = this.cantidadBoletas * 12 * 0.85;
  }
  //if de que si se compran tres, cuatro o cinco boletas, le dan un 10% de descuento, teniendo en cuenta que el boleto cuesta 12 pesos
  else if (this.cantidadBoletas == 3 || this.cantidadBoletas == 4 || this.cantidadBoletas == 5) {
    this.valorPago = this.cantidadBoletas * 12 * 0.9;
  }
  //if de que si se compra una o dos boletas, no se le da descuento, teniendo en cuenta que el boleto cuesta 12 pesos
  else if (this.cantidadBoletas == 1 || this.cantidadBoletas == 2) {
    this.valorPago = this.cantidadBoletas * 12;
  }

  //if de que si se compra con la tarjeta cineco, se le da un 10% de descuento
  if (this.tarjetaCineco == "Si") {
    this.valorPago = this.valorPago * 0.9;
  }
  else if (this.tarjetaCineco == "No") {
    this.valorPago = this.valorPago;
  }
}
}
}

}
