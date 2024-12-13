import { Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { GuiasService } from '../../services/guias.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';

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
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import {
  Conductores,
  Encomiendas,
  PageEncomienda,
  ProgramacionDto,
  ResponseGrt,
  Root,
} from '../../entity/Root';
import { ProgramacionService } from '../../services/programacion.service';
import { HttpClientModule } from '@angular/common/http';
import { EncomiendasService } from '../../services/encomiendas.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SolicitudgrtService } from '../../services/solicitudgrt.service';
import { Solicitudgrt } from '../../entity/Root';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-dialog-solicitud-grt',
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
    DatePipe,
    HttpClientModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  providers: [ProgramacionService,SolicitudgrtService, provideNativeDateAdapter()],
  templateUrl: './dialog-solicitud-grt.html',
  styleUrl: './dialog-solicitud-grt.scss',
})
export class DialogSolicitudGrtComponent implements OnInit {
  //  conductores: Conductores[];
  loader: boolean = true;
  programacionDto: ProgramacionDto;
  //encomiendas: Encomiendas[];
  fechaActual: Date = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })
  );
  constructor(
    public currentDialog: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private programacionService: ProgramacionService,
    private encomiendasService: EncomiendasService,
    private solicitudgrtService: SolicitudgrtService,
    public dialogo: MatDialog
  ) {}

  ngOnInit(): void {
    this.programacionService
      .getConductores(parseInt(this.data))
      .subscribe((data) => {
        this.programacionDto = data.out_data as ProgramacionDto;
      });

    this.loadEncomiendas(this.pageIndex, this.pageSize, parseInt(this.data));
  }

  dataSource = new MatTableDataSource<any>();
  totalItems = 0;
  totalPages = 0;
  pageIndex = 0;
  pageSize = 5;

  displayedColumns: string[] = [
    'nro',
    'serienumero',
    'destinod',
    'remitente',
    'consignado',
    'nrobultos',
    'pesototal',
    'costototal',
  ];

  downloadFIles() {}

  mostrarDialogo(): void {
    this.dialogo
      .open(DialogConfirmComponent, {
        data: `¿Deseas generar la solicitud de GRT, para generación masíva?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
         
          this.generarSolictud();
          this.currentDialog.close();
         // this.generarSolictud();
          //this.solicitudgrtService.postSolicitudgrt(this.data as Solicitudgrt)
        } else {
         alert("NO se generarán las GRTS")
        
        }
      });
  }

  onPageChange(event: any) {
    console.log(event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadEncomiendas(this.pageIndex, this.pageSize, parseInt(this.data));
  }

  generarSolictud(): void {

    let solicitudgrt:Solicitudgrt = {
      idManifiesto:parseInt(this.data)
    };
    this.solicitudgrtService.postSolicitud(solicitudgrt).subscribe({
      next: (data) => {
        const values = data.out_data as ResponseGrt;
        if(data.out_estado == 201){
          alert("La solicitud de GRT se generó correctamente");
        }

      },
      error: (err) => {
        alert('Error al generar solicitud de GRT:'+ err);
        // Manejo de errores adicional aquí, como mostrar una alerta o mensaje al usuario
      },
      complete: () => {}
      });

  }


  loadEncomiendas(pageIndex: number, pageSize: number, ID: number): void {
    this.encomiendasService.getEncomiendas(pageIndex, pageSize, ID).subscribe({
      next: (data) => {
        const pageData = data.out_data as PageEncomienda;

        if (pageData) {
          this.totalItems = pageData.totalElements ?? 0; // Total de elementos, o 0 si es nulo
          this.totalPages = pageData.totalPages ?? 0; // Total de páginas, o 0 si es nulo
          this.dataSource.data = pageData.content ?? []; // Asigna un array vacío si content es nulo
        }
      },
      complete: () => {
        this.loader = false;
      },
      error: (err) => {
        console.error('Error al cargar las encomiendas:', err);
        // Manejo de errores adicional aquí, como mostrar una alerta o mensaje al usuario
      },
    });
  }
}
