import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  data: any;
  token: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm();
  }

  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.dataService.loginUser(this.form.value).subscribe(resp => {
      this.data = resp;
      console.log(this.data)
      if (this.data.status === 1) {
        this.token = this.data.data.token;
        localStorage.setItem('token', this.token)
        this.router.navigate(['/']);
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        })
      } else if (this.data.status === 0) {
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        })
      }
      this.submitted = false;
      this.form.get('email')?.reset();
      this.form.get('password')?.reset();

    })

  }
}
