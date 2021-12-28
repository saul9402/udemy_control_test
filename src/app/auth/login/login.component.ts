import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    /*   lastName: ['avila', [Validators.required, Validators.minLength(3)]],
    userName: ['saul9402', [Validators.required, Validators.minLength(3)]], */
    password: ['123', [Validators.required, Validators.minLength(3)]],
    rememberMe: [false]
  });

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
  }

  login() {


    this.userService.login(this.loginForm.value).subscribe(resp => {
      if (this.loginForm.get('remeberMe').value) {
        localStorage.setItem('item', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('item');
      }
      this.router.navigateByUrl('/');
    }, err => {
      Swal.fire('Error', err, 'error');
    })
  }

}
