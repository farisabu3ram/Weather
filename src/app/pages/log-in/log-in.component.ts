import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private rout: Router) { }
  form = new FormGroup({
    email: new FormControl('', [Validators.maxLength(180), Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@+(pseu.edu)")]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,11}')])
  })

  ngOnInit() {
  }
  logIn() {
    if (this.email.valid && this.password.valid)
      this.rout.navigate(['/home']);




  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
