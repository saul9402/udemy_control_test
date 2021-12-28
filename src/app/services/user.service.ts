import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
//Tap es un "paso" aidicional para el observable
import { tap } from "rxjs/operators";
import { GlobalPropertiesConstants } from '../shared/constants/GlobalPropertiesConstants';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }


  validateToken(): boolean {
    const token = localStorage.getItem(GlobalPropertiesConstants.PROPERTY_TOKEN) || '';

    /**
     * Aqui validaria el token contra el backend para verificar que exista.
     */
    //    this.http.get 
    return token && token != '' ? true : false;
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/user`, formData);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem(GlobalPropertiesConstants.PROPERTY_TOKEN, resp.token);
        })
      )
  }

  logout() {
    localStorage.removeItem(GlobalPropertiesConstants.PROPERTY_TOKEN);
    this.router.navigateByUrl('/login');
  }
}
