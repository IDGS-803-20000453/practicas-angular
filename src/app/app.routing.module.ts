import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CinepolisComponent } from "./src/app/utl/cinepolis/cinepolis.component";
import { DistanciaComponent } from "./src/app/utl/distancia/distancia.component";
import { ResistenciaComponent } from "./src/app/utl/resistencia/resistencia.component";

const routes: Routes = [

    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'Cinepolis', component: CinepolisComponent},
    {path: 'Formulario', component: DistanciaComponent},
    {path: 'Resistencia', component: ResistenciaComponent},

    //{path: '**', component: PagenotfoundComponent}
    

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }