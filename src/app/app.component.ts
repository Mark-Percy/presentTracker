import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'presentTracker';
  date = new Date()
  ngOnInit(): void {
    if(this.date.getMonth() == 11) this.createSnowflakes();
  }
  constructor(private authService: AuthenticationService, private router: Router) {}
  createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowfall-background');
    for (let i = 0; i < 100; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = Math.random().toString();
      snowflake.style.width = Math.random() * 10 + 5 + 'px';
      snowflake.style.height = snowflake.style.width;

      snowflakesContainer?.appendChild(snowflake);
    }
  }

  signout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }

}
