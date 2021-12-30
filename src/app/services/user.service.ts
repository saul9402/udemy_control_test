import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  readonly BASE_URL_AUTHENTICATION: string = `${base_url}/authentication`;

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
    const headers = new HttpHeaders();
    headers.append(GlobalPropertiesConstants.CONTENT_TYPE_HEADER, GlobalPropertiesConstants.URL_ENCODED_HEADER_VALUE);
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append(GlobalPropertiesConstants.AUTH_HEADER,
      `${GlobalPropertiesConstants.AUTH_BASIC} ${btoa(`${GlobalPropertiesConstants.CLIENT_ID}:${GlobalPropertiesConstants.SAK}`)}`);
    return this.http.post(`${this.BASE_URL_AUTHENTICATION}/oauth/token`, formData, { headers: headers })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem(GlobalPropertiesConstants.PROPERTY_TOKEN, resp);
        })
      )
  }

  logout() {
    localStorage.removeItem(GlobalPropertiesConstants.PROPERTY_TOKEN);
    this.router.navigateByUrl('/login');
  }
}
