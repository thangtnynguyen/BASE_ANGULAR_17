import { AuthService } from '../../services/auth/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.min(8)]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit() {
    debugger;
    if (this.profileForm.valid) {
      this.authService.login(this.profileForm.value).subscribe((res) => {
        console.log(res);
        localStorage.setItem('token', res);
        this.router.navigateByUrl('/home');
      });
    }
  }
}
