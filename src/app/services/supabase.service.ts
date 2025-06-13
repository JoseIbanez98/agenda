import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supaBase: SupabaseClient ;
  constructor() {
    this.supaBase = createClient(environment.SUPABASE_URL, environment.API_KEY);
  }

   logIn(email: string, password: string) {
    return  this.supaBase?.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }
  signUp(email: string, password: string) {
    return this.supaBase?.auth.signUp({
      email: email,
      password: password,
    });
  }
  signout() {
    return this.supaBase?.auth.signOut();
  }
  getsession() {
    return this.supaBase?.auth.getSession();
  }
  getIdRol(id: string) {
    return this.supaBase?.from('profiles').select('rol').eq('id', id).single();
  }
  public get supabase() {
    return this.supaBase;
  }
}
