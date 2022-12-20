import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular-Course-project';
  items = [];

  constructor(
    private router: Router
  ) { }

  isLogin(): boolean {
    return this.router.url === '/login' || this.router.url === '/signup';
  }
}
