import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FrontendChallenge2020BlasMedinaService } from '../frontend-challenge2020-blas-medina.service';

// phbhelloworld@gmail.com
// Nolodire20

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  profileForm = this.fb.group({
    username: ['phbhelloworld@gmail.com', Validators.required],
    password: ['Nolodire20', Validators.required],
  });

  constructor(
    public authService: FrontendChallenge2020BlasMedinaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.signIn(this.profileForm.value);
  }
}
