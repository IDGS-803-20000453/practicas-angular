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
  pizzaForm!: FormGroup;
  subtotalPizza: number = 0;
  totalPizza: number = 0;
  historialTotalPizza: number = 0;
  pedidos: any[] = []; // Array para almacenar los detalles de cada pizza
  //array para almacenar los detalles de cada pizza para el historial de pedidos
  historialPedidos: any[] = [];
  ingredientes: { nombre: string; selected: boolean }[] = [
    { nombre: 'jamon', selected: false },
    { nombre: 'piña', selected: false },
    { nombre: 'champiñones', selected: false },
  ];
  pedidoTerminado: boolean = true;
  mostrarPizzasAgregadas: boolean = true;
  numeroPizzas: number = 0;
  ingredientesPizza: string = '';
  tamanioPizza: string = '';

  fechaActual: Date = new Date();
  fecha: string = '';

  telefono: string = '';
  direccion: string = '';
  nombre: string = '';

  //string para detalles de la pizza
  detallesPizza: string = '';

  //array para almacenar los detalles de cada pizza para el historial de pedido y llamarlos en la posicion siguiente
  detallesHistorialPizza: string[] = [];

  fechaPizza: string = '';
  //array para almacenar las fechas de cada pizza para el historial de pedido y llamarlos en la posicion siguiente
  fechaHistorialPizza: string[] = [];

  telefonoPizza: string = '';
  //array para almacenar los telefonos de cada pizza para el historial de pedido y llamarlos en la posicion siguiente
  telefonoHistorialPizza: string[] = [];

  direccionPizza: string = '';
  //array para almacenar las direcciones de cada pizza para el historial de pedido y llamarlos en la posicion siguiente
  direccionHistorialPizza: string[] = [];

  nombrePizza: string = '';
  //array para almacenar los nombres de cada pizza para el historial de pedido y llamarlos en la posicion siguiente

  nombreHistorialPizza: string[] = [];

  subtotalPizzaHistorial: number[] = [];

  //string de orden donde se guardaran los detalles de la pizza
  orden: string = '';

  constructor(private fb: FormBuilder) {
    this.pizzaForm = this.initForm();

    // Establecer la fecha predeterminada en el control del formulario
    this.pizzaForm
      .get('fecha')
      ?.patchValue(this.fechaActual.toISOString().split('T')[0]);
  }

  onSubmit(): void {
    if (this.pizzaForm.valid) {
      // Mostrar una alerta de confirmación
      Swal.fire({
        title: '¿Agregar esta pizza al pedido?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.obtenerValores();
          this.resetIngredientesSeleccionados();
          this.pizzaForm.get('numeroPizzas')?.reset();
          this.pizzaForm.get('ingredientes')?.reset();
          this.pizzaForm.get('tamanio')?.reset();

          // Aquí puedes ejecutar el código adicional que deseas realizar después de la confirmación

          Swal.fire(
            '¡Pizza agregada!',
            'La pizza ha sido agregada al pedido.',
            'success'
          );
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar los mensajes de error
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.pizzaForm.controls).forEach((field) => {
      const control = this.pizzaForm.get(field);
      control?.markAsTouched();
    });
  }

  //metodo de nuevo pedido que limpiara todos los campos menos lo de la tabla de pedidos
  nuevoPedido(): void {
    const pedido = {
      nombre: this.pizzaForm.get('nombre')?.value,
      direccion: this.pizzaForm.get('direccion')?.value,
      telefono: this.pizzaForm.get('telefono')?.value,
      fecha: this.pizzaForm.get('fecha')?.value,
      tamanio: this.pizzaForm.get('tamanio')?.value,
      ingredientes: this.ingredientes
        .filter((ingrediente) => ingrediente.selected)
        .map((ingrediente) => ingrediente.nombre),
      numeroPizzas: this.pizzaForm.get('numeroPizzas')?.value,
      subtotal: this.subtotalPizza,
    };

    //this.pedidos.push(pedido); // Agregar los detalles del pedido al array de pedidos

    localStorage.setItem('pedidos', JSON.stringify(this.pedidos)); // Guardar los pedidos en el almacenamiento local

    // Reiniciar el subtotal y total de la pizza
    this.subtotalPizza = 0;
    this.totalPizza = 0;

    this.limpiarFormulario(); // Limpiar los campos del formulario
  }

  //metodo que limpiara el array de pedidos y el array de historial de pedidos
  restaurarPedidos(): void {
    this.pedidos = [];
    this.historialPedidos = [];
    this.historialTotalPizza = 0;
    this.nombreHistorialPizza = [];
    this.direccionHistorialPizza = [];
    this.telefonoHistorialPizza = [];
    this.fechaHistorialPizza = [];
    this.subtotalPizzaHistorial = [];
    this.detallesHistorialPizza = [];
  }
  obtenerValores(): void {
    const nom = this.pizzaForm.get('nombre')?.value;
    const dir = this.pizzaForm.get('direccion')?.value;
    const tel = this.pizzaForm.get('telefono')?.value;
    const fech = this.pizzaForm.get('fecha')?.value;
    const tam = this.pizzaForm.get('tamanio')?.value;
    const ingr = this.pizzaForm.get('ingredientes')?.value ?? [];
    //if de que si ingr no tiene nada o es null, que se le asigne un array con un solo valor el cual sera de Queso
    if (ingr.length == 0) {
      ingr.push('Queso');
    }
    const numPi = this.pizzaForm.get('numeroPizzas')?.value;

    let numIngredientes = ingr.filter((ingrediente: any) => ingrediente).length;

    if (tam === 'Chica') {
      this.subtotalPizza = 40 * numPi;
      this.subtotalPizza += 10 * numIngredientes * numPi;
    } else if (tam === 'Mediana') {
      this.subtotalPizza = 80 * numPi;
      this.subtotalPizza += 10 * numIngredientes * numPi;
    } else if (tam === 'Grande') {
      this.subtotalPizza = 120 * numPi;
      this.subtotalPizza += 10 * numIngredientes * numPi;
    }

    const ingredientesSeleccionados = this.ingredientes
      .filter((ingrediente: any) => ingrediente.selected)
      .map((ingrediente: any) => ingrediente.nombre);
    if (ingredientesSeleccionados.length === 0) {
      ingredientesSeleccionados.push('Queso');
    }
    const pedido = {
      nombre: nom,
      direccion: dir,
      telefono: tel,
      fecha: fech,
      tamanio: tam,
      ingredientes: ingredientesSeleccionados,
      numeroPizzas: numPi,
      subtotal: this.subtotalPizza,
    };

    this.pedidos.push(pedido); // Agregar los detalles del pedido al array de pedidos

    //if de que si la orden tiene algo, se le agregue una coma y un espacio para separar los detalles de la pizza
    if (this.orden != '') {
      this.orden += ', ';
    }
    //obtener la orden que sera el numero de pizzas, el tamaño y los ingredientes concatenados
    this.orden =
      this.orden + numPi + ' pizza(s) ' + tam + ' ' + ingredientesSeleccionados;

    this.subtotalPizza = this.subtotalPizza;
    //agregar subtotal de la pizza al array de subtotales de la pizza
    this.subtotalPizzaHistorial.push(this.subtotalPizza);

    this.nombrePizza = nom;
    //agregar nombre de la pizza al array de nombres de la pizza
    this.nombreHistorialPizza.push(this.nombrePizza);

    this.direccionPizza = dir;

    //agregar direccion de la pizza al array de direcciones de la pizza
    this.direccionHistorialPizza.push(this.direccionPizza);

    this.telefonoPizza = tel;
    //agregar telefono de la pizza al array de telefonos de la pizza
    this.telefonoHistorialPizza.push(this.telefonoPizza);

    this.detallesPizza =
      numPi +
      ' ' +
      'pizza(s), tamaño ' +
      tam +
      ' de: ' +
      ingredientesSeleccionados;

    this.fechaPizza = fech;
    // Agregar detalles de la pizza al array de detalles de la pizza
    this.detallesHistorialPizza.push(this.detallesPizza);

    //agregar fecha de la pizza al array de fechas de la pizza
    this.fechaHistorialPizza.push(this.fechaPizza);

    // Agregar los detalles del pedido al array de historial de pedidos
    this.historialPedidos.push(pedido);

    // obtener el numero de pizzas
    this.numeroPizzas = numPi;

    //obtener los ingredientes seleccionados y concatenarlos
    this.ingredientesPizza = ingredientesSeleccionados.join(', ');
    //if de que si ingredientes seleccionados tiene algo
    if (this.ingredientesPizza != '') {
      this.ingredientesPizza = 'Queso';
    }
    //obtener el tamaño de la pizza
    this.tamanioPizza = tam;
    //obtener la fecha del pedido
    this.fecha = fech;
    //obtener el telefono del pedido
    this.telefono = tel;
    //obtener la direccion del pedido
    this.direccion = dir;
    //obtener el nombre del pedido
    this.nombre = nom;

    this.totalPizza += this.subtotalPizza; // Calcular el total sumando el subtotal de la pizza al total
    this.historialTotalPizza += this.subtotalPizza; // Calcular el total sumando el subtotal de la pizza al total del historial de pedidos
  }

  limpiarFormulario(): void {
    this.pizzaForm.reset();
    this.resetIngredientesSeleccionados();
    //limpiar el array de pedidos
    this.pedidos = [];

    //limpiar los datos del pedido
    this.nombre = '';
    this.direccion = '';
    this.telefono = '';
    this.fecha = '';
    this.tamanioPizza = '';
    this.ingredientesPizza = '';
    this.numeroPizzas = 0;
    this.subtotalPizza = 0;
    this.totalPizza = 0;
    this.orden = '';
    // Volver a asignar el valor predeterminado al campo de fecha
    this.pizzaForm
      .get('fecha')
      ?.patchValue(this.fechaActual.toISOString().split('T')[0]);
  }

  minDateValidator() {
    const currentDate = new Date();
    const maxDate = new Date();
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1); // Restar 1 día para obtener la fecha de ayer
    yesterday.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo la fecha

    maxDate.setDate(yesterday.getDate() + 31); // Añadir 31 días a la fecha de ayer
    yesterday.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo la fecha
    maxDate.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo la fecha

    return (control: FormControl) => {
      const selectedDate = new Date(control.value);
      selectedDate.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo la fecha
      if (
        selectedDate.getTime() < yesterday.getTime() ||
        selectedDate.getTime() > maxDate.getTime()
      ) {
        return { minDate: true };
      }
      return null;
    };
  }

  onCheckboxChange(event: any): void {
    const ingredientesFormArray = this.pizzaForm.get(
      'ingredientes'
    ) as FormArray;
    const checkedIngredients = ingredientesFormArray.value.map(
      (checked: boolean) => checked
    );
    this.ingredientes.forEach(
      (ingrediente, index) => (ingrediente.selected = checkedIngredients[index])
    );
  }

  resetIngredientesSeleccionados(): void {
    this.ingredientes.forEach((ingrediente) => (ingrediente.selected = false));
  }

  initForm(): FormGroup {
    const ingredientesFormArray = new FormArray(
      this.ingredientes.map(() => new FormControl(false))
    );

    return this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)],
      ],
      direccion: ['', [Validators.required, Validators.minLength(8)]], // Puedes ajustar el valor mínimo según tus necesidades
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      fecha: ['', [Validators.required, this.minDateValidator()]],
      tamanio: ['', Validators.required],
      ingredientes: ingredientesFormArray,
      numeroPizzas: ['', [Validators.required, Validators.min(1)]],
    });
  }
}
