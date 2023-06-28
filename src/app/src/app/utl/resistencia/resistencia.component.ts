import { Component } from '@angular/core';

@Component({
  selector: 'app-resistencia',
  templateUrl: './resistencia.component.html',
  styleUrls: ['./resistencia.component.css']
})
export class ResistenciaComponent {
  banda1: string = "";
  banda2: string = "";
  banda3: string = "";
  banda4: string = "";
  banda5: string = "";
  tolerancia: string = "";
  resistencia: number = 0;
  valor_maximo: number = 0;
  valor_minimo: number = 0;
  banda1Colors: { [key: string]: string } = {
    negro: '#000000',
    marrón: '#8B4513',
    rojo: '#FF0000',
    naranja: '#FFA500',
    amarillo: '#FFFF00',
    verde: '#008000',
    azul: '#0000FF',
    violeta: '#EE82EE',
    gris: '#808080',
    blanco: '#FFFFFF'
  };

  banda2Colors: { [key: string]: string } = {
    negro: '#000000',
    marrón: '#8B4513',
    rojo: '#FF0000',
    naranja: '#FFA500',
    amarillo: '#FFFF00',
    verde: '#008000',
    azul: '#0000FF',
    violeta: '#EE82EE',
    gris: '#808080',
    blanco: '#FFFFFF'
  };

  banda3Colors: { [key: string]: string } = {
    negro: '#000000',
    marrón: '#8B4513',
    rojo: '#FF0000',
    naranja: '#FFA500',
    amarillo: '#FFFF00',
    verde: '#008000',
    azul: '#0000FF',
    violeta: '#EE82EE',
    gris: '#808080',
    blanco: '#FFFFFF'
  };

  banda4Colors: { [key: string]: string } = {
    dorado: '#FFD700',
    plateado: '#C0C0C0',
    marrón: '#8B4513',
    rojo: '#FF0000',
    verde: '#008000',
    azul: '#0000FF',
    violeta: '#EE82EE',
    gris: '#808080'
  };

  banda5Colors: { [key: string]: string } = {
    dorado: '#FFD700',
    plateado: '#C0C0C0'
  };

  // set the color of each band based on the selected color
  get banda1Color() {
    return this.banda1Colors[this.banda1];
  }

  get banda2Color() {
    return this.banda2Colors[this.banda2];
  }

  get banda3Color() {
    return this.banda3Colors[this.banda3];
  }

  get banda4Color() {
    return this.banda4Colors[this.banda4];
  }

  get banda5Color() {
    return this.banda5Colors[this.banda5];
  }

  get toleranciaColor() {
    return this.banda5Colors[this.tolerancia];
  }

  //metodo de calcular
  calcular(): void {
    let valor1: number;
    let valor2: number;
    let valor3: number;
    let multiplicador: number;
    let tolerancia: number;

    // switch de la banda 1 para saber el valor de la primera cifra de acuerdo a su color
    switch (this.banda1) {
      case 'negro':
        valor1 = 0;
        break;
      case 'marrón':
        valor1 = 1;
        break;
      case 'rojo':
        valor1 = 2;
        break;
      case 'naranja':
        valor1 = 3;
        break;
      case 'amarillo':
        valor1 = 4;
        break;
      case 'verde':
        valor1 = 5;
        break;
      case 'azul':
        valor1 = 6;
        break;
      case 'violeta':
        valor1 = 7;
        break;
      case 'gris':
        valor1 = 8;
        break;
      case 'blanco':
        valor1 = 9;
        break;
      default:
        valor1 = 0;
        break;
    }

    // switch de la banda 2 para saber el valor de la segunda cifra de acuerdo a su color
    switch (this.banda2) {
      case 'negro':
        valor2 = 0;
        break;
      case 'marrón':
        valor2 = 1;
        break;
      case 'rojo':
        valor2 = 2;
        break;
      case 'naranja':
        valor2 = 3;
        break;
      case 'amarillo':
        valor2 = 4;
        break;
      case 'verde':
        valor2 = 5;
        break;
      case 'azul':
        valor2 = 6;
        break;
      case 'violeta':
        valor2 = 7;
        break;
      case 'gris':
        valor2 = 8;
        break;
      case 'blanco':
        valor2 = 9;
        break;
      default:
        valor2 = 0;
        break;
    }

    // switch de la banda 3 para saber el valor del multiplicador de acuerdo a su color
    switch (this.banda3) {
      case 'negro':
        multiplicador = 1;
        break;
      case 'marrón':
        multiplicador = 10;
        break;
      case 'rojo':
        multiplicador = 100;
        break;
      case 'naranja':
        multiplicador = 1000;
        break;
      case 'amarillo':
        multiplicador = 10000;
        break;
      case 'verde':
        multiplicador = 100000;
        break;
      case 'azul':
        multiplicador = 1000000;
        break;
      case 'violeta':
        multiplicador = 10000000;
        break;
      case 'gris':
        multiplicador = 100000000;
        break;
      case 'blanco':
        multiplicador = 1000000000;
        break;
      default:
        multiplicador = 1;
        break;
    }

    // switch de la banda 4 para saber el valor de la tolerancia de acuerdo a su color
    switch (this.banda4) {
      case 'dorado':
        tolerancia = 5;
        break;
      case 'plateado':
        tolerancia = 10;
        break;
      case 'marrón':
        tolerancia = 1;
        break;
      case 'rojo':
        tolerancia = 2;
        break;
      case 'verde':
        tolerancia = 0.5;
        break;
      case 'azul':
        tolerancia = 0.25;
        break;
      case 'violeta':
        tolerancia = 0.1;
        break;
      case 'gris':
        tolerancia = 0.05;
        break;
      default:
        tolerancia = 20;
        break;
    }

    // calcular el valor de la resistencia
    this.resistencia = (valor1 * 10 + valor2) * multiplicador;
    this.valor_maximo = this.resistencia * (1 + tolerancia / 100);
    this.valor_minimo = this.resistencia * (1 - tolerancia / 100);

    // mostrar el resultado en la consola
    console.log(`El valor de la resistencia es ${this.resistencia} ohms con una tolerancia del ${tolerancia}%`);
  }
}