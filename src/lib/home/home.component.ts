import { Component, OnInit } from '@angular/core';
import { FrontendChallenge2020BlasMedinaService } from '../frontend-challenge2020-blas-medina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userStories = [];

  constructor(
    public authService: FrontendChallenge2020BlasMedinaService,
    public router: Router
  ) {
    if (this.authService.isLoggedIn) {
      this.authService.getUserStories().subscribe((res) => {
        this.userStories = res;
      });
    } else {
      router.navigate(['/']);
    }
  }

  getGravatar() {
    const user = this.authService.getUser();
    return user.photo;
  }

  getName() {
    const user = this.authService.getUser();
    return user.username;
  }

  logout() {
    this.authService.doLogout();
  }

  ngOnInit(): void {}
}
