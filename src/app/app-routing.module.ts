import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/page-login/login/login.component';
import { OdontologoDashboardComponent } from './components/odontologo-dashboard/odontologo-dashboard.component';
import { RoleGuard } from './guards/role-guard.guard';
import { AsistenteDashboardComponent } from './components/asistente-dashboard/asistente-dashboard.component';
import { PagePacientesComponent } from './components/page-pacientes/page-pacientes/page-pacientes.component';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';
import { PageAgendaComponent } from './components/page-agenda/page-agenda/page-agenda.component';


const routes: Routes = [
  { path:'',redirectTo:'login',pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'odontologo-dashboard',
    component:OdontologoDashboardComponent,
    canActivate:[RoleGuard],
    data:{roles:[1]}
  },
  { path:'asistente-dashboard',
    component:AsistenteDashboardComponent,
    // canActivate:[RoleGuard],
    data:{roles:[2]}
  },
   { path:'agenda-citas',
    component:PageAgendaComponent,
    // canActivate:[RoleGuard],
    data:{roles:[1,2]}
  },
  {
    path:'lista-pacientes',
    component:PagePacientesComponent,
    canActivate:[RoleGuard],
    data:{roles:[1,2]}
  },
  {
    path:'tratamientos',
    component:TratamientosComponent,
    canActivate:[RoleGuard],
    data:{roles:[1,2]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
