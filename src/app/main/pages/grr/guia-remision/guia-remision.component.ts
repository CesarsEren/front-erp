import { inject, OnInit } from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideNativeDateAdapter, ThemePalette } from '@angular/material/core';
import { ManifiestoService } from '../../../../services/manifiesto.service';
import { AuthInterceptor } from '../../../../services/auth.interceptor';
import { Manifiesto } from '../../../../entity/Manifiesto';
import { Agencia, PageManifiesto, Root } from '../../../../entity/Root';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { AgenciasService } from '../../../../services/agencias.service';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogGrtsComponent } from '../../../../componentes/dialog-grts/dialog-grts.component';
import { DialogSolicitudGrtComponent } from '../../../../componentes/dialog-solicitud-grt/dialog-solicitud-grt';

@Component({
  selector: 'app-guia-remision',
  templateUrl: './guia-remision.component.html',
  styleUrl: './guia-remision.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatDividerModule,
    MatExpansionModule,
    RouterModule,
    FlexLayoutModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [ManifiestoService, provideNativeDateAdapter()],
})
export class GuiaRemisionComponent implements OnInit {
  panelOpenState = false;
  private breakpointObserver = inject(BreakpointObserver);
  /** Based on the screen size, switch from standard to one column per row */
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => {
        return result.matches;
      }),
      shareReplay()
    );

  displayedColumns: string[] = [
    'nro',
    'agencia',
    'nroprogramacion',
    'destino',
    'fecha',
    'servicio',
    'cantidadb',
    'estado',
    'acction',
  ];

  agencias: Agencia[] = [];
  dataSource = new MatTableDataSource<any>();
  totalItems = 0;
  totalPages = 0;
  pageIndex = 0;
  pageSize = 20;

  isFilter: boolean = false;

  selectedAgencia: string = '001';
  selectedFecha: Date = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })
  );

  ngAfterViewInit() {}

  ngOnInit() {
    this.loadAgencias();
  }

  onPageChange(event: any) {
    console.log(event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadManifiestos(
      this.pageIndex,
      this.pageSize,
      this.selectedAgencia,
      this.selectedFecha.toISOString().split('T')[0]
    );
  }

  buscar() {
    this.loadManifiestos(
      0,
      this.pageSize,
      this.selectedAgencia,
      this.selectedFecha.toISOString().split('T')[0]
    );
  }
  limpiar() {
    this.loadManifiestos(
      0,
      this.pageSize,
      this.selectedAgencia,
      this.selectedFecha.toISOString().split('T')[0]
    );
  }
  loadAgencias() {
    this.agenciasService.getAgencias().subscribe({
      next: (data) => {
        this.agencias = data.out_data as Agencia[];
      },
    });
  }

  loadManifiestos(
    pageIndex: number,
    pageSize: number,
    agencia: string,
    fecha: string
  ) {
    this.manifiestoService
      .getManifiestos(pageIndex, pageSize, agencia, fecha)
      .subscribe({
        next: (data) => {
          this.totalItems = (data.out_data as PageManifiesto).totalElements; // Número total de elementos
          this.totalPages = (data.out_data as PageManifiesto).totalPages; // Número total de páginas
          this.dataSource.data = (data.out_data as PageManifiesto).content; // Los datos paginados están en 'content'
        },
      });
  }

  openDialogVerEncomiendas(id: number) {
    //this.dialog.open(DialogGrtsComponent, { id: id });

    this.dialog.open(DialogGrtsComponent, {
      data: id,
      width: '500px', // Set the width
      height: '400px', // Set the height (optional)
      maxWidth: '80vw', // Optional: limit the max width (useful for responsive design)
    });
  }

  openDialogSolicitudGrt(id: number) {
    //this.dialog.open(DialogGrtsComponent, { id: id });

    this.dialog.open(DialogSolicitudGrtComponent, {
      data: id,

      width: '80vw', // Set the width
      height: '600px', // Set the height (optional)
      maxWidth: '80vw', // Optional: limit the max width (useful for responsive design)
    });
  }

  constructor(
    private manifiestoService: ManifiestoService,
    private agenciasService: AgenciasService,
    public dialog: MatDialog
  ) {}  
}
