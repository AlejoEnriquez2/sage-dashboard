import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getUserAnswers(): Observable<any> {
    var url = this.baseUrl + '/user-answers';
    console.log('Fetching data from: ', url);
    return this.http.get<any>(url);
  }

  getUserAnswersById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/user-answers/'+id);
  }

  getTestById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/test/'+id);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/user-answers', data);
  }

  updateConstructionsDraw(id: number, constructionsDraw: string[], grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {constructionsDraw, grade});
  }
  
  updateConstructionsRedraw(id: number, constructionsRedraw: string[], grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {constructionsRedraw, grade});
  }

  updateOrientationMonth(id: number, orientationMonth: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {orientationMonth, grade});
  }

  updateOrientationDay(id: number, orientationDay: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {orientationDay, grade});
  }

  updateOrientationYear(id: number, orientationYear: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {orientationYear, grade});
  }

  updateNaming1(id: number, namingPicture1: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {namingPicture1, grade});
  }
  
  updateNaming2(id: number, namingPicture2: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {namingPicture2, grade});
  }

  updateSimilarities(id: number, similarities: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {similarities, grade});
  }

  updateCalculation1(id: number, calculation1: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {calculation1, grade});
  }
  updateCalculation2(id: number, calculation2: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {calculation2, grade});
  }

  updateVerbal(id: number, verbalWords: string [], grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {verbalWords, grade});
  }

  updateTrail(id: number, executiveTrail: string , grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {executiveTrail, grade});
  }

  updateExecutiveLines(id: number, executiveLines: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {executiveLines, grade});
  }

  updateExecutiveDraw(id: number, executiveDraw: string [], grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {executiveDraw, grade});
  }

  updateMemory(id: number, memoryPhrase: string, grade: number): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/user-answers/'+id, {memoryPhrase, grade});
  }
}
