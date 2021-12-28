import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted: boolean = false;

  public registerForm: FormGroup = this.fb.group({
    name: ['Saul', [Validators.required, Validators.minLength(3)]],
    email: ['a@a.com', [Validators.required, Validators.email]],
    /*   lastName: ['avila', [Validators.required, Validators.minLength(3)]],
    userName: ['saul9402', [Validators.required, Validators.minLength(3)]], */
    password: ['123', [Validators.required, Validators.minLength(3)]],
    password2: ['123', [Validators.required, Validators.minLength(3)]],
    terms: [true, [Validators.required]]
  }, {
    validators: this.equalPasswords('password', 'password2')
  });

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
  }

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.userService.createUser(this.registerForm.value).subscribe(resp => {
        console.log("created user")
      }, err => {
        Swal.fire('Error', err, 'error');
      })
    }
    console.log(this.registerForm);
  }

  campoNoValido(field: string): boolean {

    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;

    } else {

      return false;
    }

  }

  passwordsAreNotValid() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }


  equalPasswords(pass1Name: string, pass2Name: string) {


    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      /**Se debe retornar una funcion ya que será el formulario quien ejecutara la misma, 
       * dentro de ella se indica lo que se quiere validar
       * y las condiciones que se deben de cumplir
       */
      if (pass1Control.value === pass2Control.value) {
        /**null si todo es correcto. */
        pass2Control.setErrors(null);
      } else {
        /**
         * el error en true si hay algun error.
         */
        pass2Control.setErrors({ noEsIgual: true });
      }


    }

  }
}
