import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { auth, login } from '../../../Models/login';
import { Session } from '../../../Models/supaApi/authRequest';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private SupabaseService: SupabaseService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  private showError(message: string) {
    this._snackBar.open('❌ ' + message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-error'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
  async onSubmit() {
    if (this.userForm.invalid) return;
    
    this.loading = true;
    const credentials: login = this.userForm.value;
    const response = await this.SupabaseService.logIn(
      credentials.email,
      credentials.password
    );
    if (response.error) {
      console.log("error:", response)
      this.showError(response.error.message);
      this.loading = false;
      return;
    }

    const userID = response.data?.user?.id;
    const responsePerfil = await this.SupabaseService.getIdRol(userID || '');
    if (responsePerfil.error) {
      this.showError(responsePerfil.error.message);
      this.loading = false;
      return;
    }
    const rol = responsePerfil.data?.rol || 0;
    localStorage.setItem('rol', rol);
    console.log('Rol del usuario:', rol);
    switch (rol) {
      case 1: // Administrador
      console.log('Rol: Administrador');
        this.router.navigate(['/odontologo-dashboard']);
        break;  
    }
    this.loading=false;
    // const { data, error } = await this.SupabaseService.getsession();
    // if (error) {
    //   this.showError(error.message);
    //   this.loading = false;
    //   return;
    // }

    // console.log(data.session?.access_token);
    // this.loading = false;
  }
}
