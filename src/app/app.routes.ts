import { Routes } from '@angular/router';
import { GuiaRemisionComponent } from './main/pages/grr/guia-remision/guia-remision.component';
import { NavigationComponent } from './main/navigation/navigation.component';
import { NuevaGuiaRemisionComponent } from './main/pages/grr/nueva-guia-remision/nueva-guia-remision.component';
import { LoginComponent } from './security/login/login.component';
import { SendsunatComponent } from './main/pages/sendsunat/sendsunat.component';
import { SearchgrtComponent } from './main/pages/searchgrt/searchgrt.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    {
      path: 'main',
      component: NavigationComponent,
      children: [
        { path: '', redirectTo: 'grr', pathMatch: 'full' },
        { path: 'grr', component: GuiaRemisionComponent },
        { path: 'grr/search', component: SearchgrtComponent },
        { path: 'grr/send', component: SendsunatComponent },
        { path: 'grr/nuevo/:idmanifiesto', component: NuevaGuiaRemisionComponent },
        { path: '**', redirectTo: 'grr', pathMatch: 'full' },
      ],
    },
  ];