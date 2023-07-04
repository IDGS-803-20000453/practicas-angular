import {Pipe, PipeTransform} from '@angular/core';
import { IPizzas } from './pizzas';

@Pipe({
    name: 'pizzasFilter'
})
export class PizzasFilterPipe implements PipeTransform{
    transform(value: IPizzas[], args: string): IPizzas[]{
        let filter:string=args?args.toLocaleLowerCase():'';
        return filter?value.filter((pizzas:IPizzas)=>
        pizzas.nombreCompleto.toLocaleLowerCase().indexOf(filter)!==-1):value;
    }
}
