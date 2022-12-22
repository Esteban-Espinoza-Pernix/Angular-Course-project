import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Budget from './shared/budget.model';

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

  ngOnInit() : void {
    //load budget
  }

  isLogin(): boolean {
    return this.router.url === '/login' || this.router.url === '/signup';
  }
}
