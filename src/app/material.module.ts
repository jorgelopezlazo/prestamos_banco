import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatTableModule
    ],
    providers: [
        MatDatepickerModule
    ],
})

export class MaterialModule { }