import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/page-login/login/login.component';
import { UserFormComponent } from './components/page-login/user-form/user-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OdontologoDashboardComponent } from './components/odontologo-dashboard/odontologo-dashboard.component';
import { AsistenteDashboardComponent } from './components/asistente-dashboard/asistente-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterNavigationComponent } from './components/footer-navigation/footer-navigation.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';
import { ListaPacientesAgendaComponent } from './components/page-agenda/lista-pacientes-agenda/lista-pacientes-agenda.component';
import { DiasAgendaComponent } from './components/page-agenda/dias-agenda/dias-agenda.component';
import { CircularProgressComponent } from './components/page-agenda/circular-progress/circular-progress.component';
import { CardCitaAgendaComponent } from './components/page-agenda/card-cita-agenda/card-cita-agenda.component';
import { SheetBottomAddCitaComponent } from './components/sheets/sheet-bottom-add-cita/sheet-bottom-add-cita.component';
import { CardPacienteComponent } from './components/page-pacientes/card-paciente/card-paciente.component';
import { PageAgendaComponent } from './components/page-agenda/page-agenda/page-agenda.component';
import { PagePacientesComponent } from './components/page-pacientes/page-pacientes/page-pacientes.component';
import { ListaPacientesComponent } from './components/page-pacientes/lista-pacientes/lista-pacientes.component';
import { ButtonSheetPacienteComponent } from './components/sheets/button-sheet-paciente/button-sheet-paciente.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { StatCardsComponent } from './components/dashboards/stat-cards/stat-cards.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserFormComponent,
    OdontologoDashboardComponent,
    AsistenteDashboardComponent,
    FooterNavigationComponent,
    TratamientosComponent,
    ListaPacientesAgendaComponent,
    DiasAgendaComponent,
    CircularProgressComponent,
    CardCitaAgendaComponent,
    SheetBottomAddCitaComponent,
    CardPacienteComponent,
    PagePacientesComponent,
    ListaPacientesComponent,
    ButtonSheetPacienteComponent,
    FilterPipe,
    PageAgendaComponent,
    StatCardsComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
