import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'users-task';

  http = inject(HttpClient);

  ngOnInit() {
    this.http.get(``);
  }
}
