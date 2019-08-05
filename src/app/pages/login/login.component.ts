import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../user/shared/user.model';
import { Credencias } from '../user/shared/credencias.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';

import toasrt from "toastr"; /* Para Exibir as Mensagens  */

// personalizando o toasrt (Mensagens)
toasrt.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  formGroup: FormGroup;

  usuario: User;

  /* credencias de acesso */
  creds: Credencias = {
    email: "",
    senha: ""
  }

  constructor(
    private route: Router,
    private auth: LoginService,
    private frmBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    /* incluir os Dados do Formulario*/
    this.formGroup = this.frmBuilder.group({
      'email': ['', [Validators.required]],
      'senha': ['', [Validators.required]],

    });

    this.usuario = new User();

    /* Vinculando o FormGroup com o Objeto Selecioando*/
    this.formGroup.patchValue(this.usuario);

  }

  /* login */
  login() {
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.sucessfulllogin(response.headers.get('Authorization'));
      
      location.replace('reports');
     // this.route.navigate(['reports'])
    },
      error => {
        toasrt.error('Login Falhou!');
      });
  }

  onSubmit(value) {
    this.creds = value as Credencias;
    this.login();
  }



}
