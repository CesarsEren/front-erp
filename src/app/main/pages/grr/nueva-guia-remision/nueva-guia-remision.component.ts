import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

import { MatStepperModule } from '@angular/material/stepper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

interface Food {
  value: string;
  viewValue: string;
}
interface Modalidad {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'B002-10', weight: 7, symbol: '150.00'},
  {position: 2, name: 'B002-11', weight: 5, symbol: '133.00'},
  {position: 3, name: 'B002-12', weight: 2, symbol: '41.00'},
];

@Component({
  selector: 'app-nueva-guia-remision',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
  ],
  templateUrl: './nueva-guia-remision.component.html',
  styleUrl: './nueva-guia-remision.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NuevaGuiaRemisionComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  modalidades: Modalidad[] = [
/*    { value: '001', viewValue: 'Transporte Público' },*/
    { value: '002', viewValue: 'Transporte Privado' },
  ];

  tip: Food[] = [
    { value: 'steak-0', viewValue: 'DNI' },
    { value: 'pizza-1', viewValue: 'CARNET' },
  ]; 

  foods: Food[] = [

    { value: 'steak', viewValue: 'F001' },
    { value: 'pizza', viewValue: 'F002' },
    { value: 'tacos', viewValue: 'F003' },
  ];

  foods2: Food[] = [
    { value: 'steak-10', viewValue: 'Vigente' },
    { value: 'pizza-12', viewValue: 'Vencido' },
    { value: 'pizza-12', viewValue: 'Cambio de Agencia' },
  ];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
