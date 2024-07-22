import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {  
  title = 'sage-dashboard';
  userAnswers: any[] = [];
  error: string | null = null;

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.apiService.getUserAnswers().subscribe(
      (data: any[]) => {
        this.userAnswers = data;
      },
      error => {
        console.error('Error fetching data', error);
        this.error = 'Error fetching data';
      }
    );
  }
}
