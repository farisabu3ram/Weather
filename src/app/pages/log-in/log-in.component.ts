import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  showMessage = 'none';
  showMessagePass = 'none';
  message: string;
  messagePass: string;
  constructor(private rout: Router) { }
  form = new FormGroup({
    email: new FormControl('', [Validators.maxLength(180), Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@+(pseu.edu)")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,11}')])
  })

  ngOnInit() {
  }
  logIn() {
    event.preventDefault();
    if (this.email.valid && this.password.valid)
      this.rout.navigate(['/home']);
    else {
      if (this.email.errors) {
        if (this.email.errors.required) {
          this.message = `Email is required.`
        }
        else if (this.email.errors.maxlength) {
          this.message = `Email can't be over 180digit.`;

        }
        else if (this.email.invalid) {
          this.message = `The Email end of @pseu.edu`;
        }
        this.showMessage = 'flex';
      }
      else
        this.showMessage = 'none';
      if (this.password.errors) {
        if (this.password.errors.required) {
          this.messagePass = `Password is required.`;
        }
        else if (this.password.errors.minlength) {
          this.messagePass = `Password  at least 6 digit.`;

        }
        else if (this.password.errors.maxlength) {
          this.messagePass = `Password can't be over 12 digit.`;

        }
        else if (this.password.invalid) {
          this.messagePass = `Use a mix of letters, numbers & symbols`;
        }
        this.showMessagePass = 'flex';

      }
      else
        this.showMessagePass = 'none';

    }
  }
  disapear() {
    this.showMessage = 'none';
  }
  disapearPass() {
    this.showMessagePass = 'none';
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

}
