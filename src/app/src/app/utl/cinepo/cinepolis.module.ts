import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CinepolisComponent } from '../cinepolis/cinepolis.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [CinepolisComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatRadioModule,
        FormsModule,
        MatFormFieldModule
    ],
    exports: [CinepolisComponent]
})
export class CinepolisModule { }