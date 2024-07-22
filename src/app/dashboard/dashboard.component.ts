import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  userAnswers: any[] = [];
  test: any[] = [];
  mergedData: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/test').subscribe((testData: any) => {
      this.test = testData;
            
      for (let i = 0; i < this.test.length; i++) {
        this.test[i].createAt = formatDate(this.test[i].createAt, 'HH:mm - dd/MM/yy', 'en-US');
        this.test[i].testTotalTime = Math.floor(this.test[i].testTotalTime / 60) + ' min ' + (this.test[i].testTotalTime % 60) + ' sec';
      }

      this.test.sort((b, a) => {
        return a.testId - b.testId;
      });
    });
  }
}
