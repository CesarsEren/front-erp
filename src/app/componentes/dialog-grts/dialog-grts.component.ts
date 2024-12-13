import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { GuiasService } from '../../services/guias.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-grts',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  providers: [GuiasService, provideNativeDateAdapter()],
  templateUrl: './dialog-grts.component.html',
  styleUrl: './dialog-grts.component.scss',
})
export class DialogGrtsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any
,
private guiasService:GuiasService) {}

  dataSource = new MatTableDataSource<any>();
  totalItems = 0;
  totalPages = 0;
  pageIndex = 0;
  pageSize = 20;

  displayedColumns: string[] = [
    'id',
    'guia',
    'cpeEnlazado',
    'destinatario',
    'fechaemision',
    'origen',
    'destino',
    'acction'
  ];

  downloadFIles() {

  }

  onPageChange(){

  }




}
