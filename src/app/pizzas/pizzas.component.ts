import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent {
  pizzaForm!: FormGroup;
  subtotalPizza: number = 0;
  totalPizza: number = 0;
  pedidos: any[] = []; // Array para almacenar los detalles de cada pizza
  ingredientes: { nombre: string, selected: boolean }[] = [
    { nombre: 'jamon', selected: false },
    { nombre: 'piña', selected: false },
    { nombre: 'champiñones', selected: false }
  ];
  pedidoTerminado: boolean = false;
  mostrarPizzasAgregadas: boolean = true;



  constructor(private fb: FormBuilder) {
    this.pizzaForm = this.initForm();
  }

  onSubmit(): void {
    if (this.pizzaForm.valid) {
      this.obtenerValores();
      this.resetIngredientesSeleccionados();
    } else {
      // Marcar todos los campos como tocados para mostrar los mensajes de error
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.pizzaForm.controls).forEach(field => {
      const control = this.pizzaForm.get(field);
      control?.markAsTouched();
    });
  }

  //metodo de nuevo pedido que limpiara todos los campos menos lo de la tabla de pedidos
  nuevoPedido(): void {
    // Limpiar los campos del formulario excepto los de la tabla de pedidos
    this.pizzaForm.get('nombre')?.reset();
    this.pizzaForm.get('direccion')?.reset();
    this.pizzaForm.get('telefono')?.reset();
    this.pizzaForm.get('fecha')?.reset();
    this.pizzaForm.get('tamanio')?.reset();
    this.pizzaForm.get('numeroPizzas')?.reset();
    this.resetIngredientesSeleccionados();
  
    // Reiniciar el subtotal y total de la pizza
    this.subtotalPizza = 0;
    this.totalPizza = 0;
  }
  

  obtenerValores(): void {
    const nom = this.pizzaForm.get('nombre')?.value;
    const dir = this.pizzaForm.get('direccion')?.value;
    const tel = this.pizzaForm.get('telefono')?.value;
    const fech = this.pizzaForm.get('fecha')?.value;
    const tam = this.pizzaForm.get('tamanio')?.value;
    const ingr = this.pizzaForm.get('ingredientes')?.value ?? [];
    const numPi = this.pizzaForm.get('numeroPizzas')?.value;
  
    let numIngredientes = ingr.filter((ingrediente: any) => ingrediente).length;
  
    if (tam === "Pequeña") {
      this.subtotalPizza = 40 * numPi;
      this.subtotalPizza += 10 * numIngredientes * numPi;
    } else if (tam === "Mediana") {
      this.subtotalPizza = 80 * numPi;
      this.subtotalPizza += 15 * numIngredientes * numPi;
    } else if (tam === "Grande") {
      this.subtotalPizza = 120 * numPi;
      this.subtotalPizza += 20 * numIngredientes * numPi;
    }
  
    const ingredientesSeleccionados = this.ingredientes.filter((ingrediente: any) => ingrediente.selected).map((ingrediente: any) => ingrediente.nombre);
  
    const pedido = {
      nombre: nom,
      direccion: dir,
      telefono: tel,
      fecha: fech,
      tamanio: tam,
      ingredientes: ingredientesSeleccionados,
      numeroPizzas: numPi,
      subtotal: this.subtotalPizza
    };
  
    this.pedidos.push(pedido); // Agregar los detalles del pedido al array de pedidos
  
    this.totalPizza += this.subtotalPizza; // Calcular el total sumando el subtotal de la pizza al total
  }

  onCheckboxChange(event: any): void {
    const ingredientesFormArray = this.pizzaForm.get('ingredientes') as FormArray;
    const checkedIngredients = ingredientesFormArray.value.map((checked: boolean) => checked);
    this.ingredientes.forEach((ingrediente, index) => ingrediente.selected = checkedIngredients[index]);
  }

  resetIngredientesSeleccionados(): void {
    this.ingredientes.forEach((ingrediente) => ingrediente.selected = false);
  }

  initForm(): FormGroup {
    const ingredientesFormArray = new FormArray(this.ingredientes.map(() => new FormControl(false)));

    return this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha: ['', Validators.required],
      tamanio: ['', Validators.required],
      ingredientes: ingredientesFormArray,
      numeroPizzas: ['', Validators.required]
    });
  }
}