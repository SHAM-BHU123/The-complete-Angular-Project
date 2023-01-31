import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode);
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
    } else {
      this.authService.signup(email, password).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        (errorRes) => {
          console.log(errorRes);

          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error = 'This email exist already';
          }
          this.isLoading = false;
        }
      );
    }
    console.log(form);

    form.reset();
  }

  ngOnInit(): void {}
}
