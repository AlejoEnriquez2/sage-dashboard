import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { error } from 'node:console';

@Component({
  selector: 'app-user-answers-detail',
  templateUrl: './user-answers-detail.component.html',
  styleUrl: './user-answers-detail.component.css'
})
export class UserAnswersDetailComponent implements OnInit {
  userAnswers: any;
  redrawButton = '';
  testId = 0;
  answersGrade = 0;
  answersId = 0;
  test: any = {patient: {}};
  redraw = ''; 
  draw = '';
  executiveDraw = '';
  redrawGrade = '';
  drawGrade = '';
  executiveDrawGrade = '';
  crossExecutiveDraw = '';
  verbalGrade = '';
  orientationMonth = [];
  orientationDay = [];
  orientationYear = [];
  naming1 = [];
  naming2 = [];
  similarities = [];
  calculation1 = [];
  calculation2 = [];
  verbal: string[] = [];
  trail = [];
  executiveLines = [];
  memory = [];

  newConstructionsDraw = '';
  newConstructionsRedraw = '';
  
  orientationGrade = 0;
  namingGrade = 0;
  similaritiesGrade = 0;
  calculationGrade = 0;
  constructionGrade = 0;
  verbalFluencyGrade = 0;
  executiveGrade = 0;
  memoryGrade = 0;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ){
    this.route.params.subscribe(params => {
      console.log('Params: ', params);
    });
  }


  async ngOnInit(): Promise<void> {    
    console.log('Component initialized');
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.testId = parseInt(id ?? '0');
      this.apiService.getTestById(this.testId.toString()).subscribe(
        async (data: any) => {
          this.test = data;
          this.answersId = await this.test.answers.answersId;
          console.log("ID: ", this.answersId);
          this.apiService.getUserAnswersById(this.answersId.toString()).subscribe(
            async (data: any) => {
              this.userAnswers = await data;
              console.log("USER ANSWER GRADE: ",this.userAnswers.grade);
              this.answersGrade = await parseInt(this.userAnswers.grade);
              if (this.userAnswers.constructionsRedraw) {
                try {
                  const base64Data = this.userAnswers.constructionsRedraw.split(',')[0];
                  this.redraw = base64Data.slice(2, base64Data.length - 1);
                  this.redrawGrade = this.userAnswers.constructionsRedraw.split(',')[1];
                  if (this.redrawGrade.includes('yes')) {
                    this.redrawGrade = 'yes';
                    this.constructionGrade += 2;
                  } else if (this.redrawGrade.includes('no')) {                    
                    this.redrawGrade = 'no';
                  } else if (this.redrawGrade.includes('maybe')) {
                    this.redrawGrade = 'maybe';
                    this.constructionGrade += 1;
                  }else{
                    this.redrawGrade = 'ungraded';                    
                  }
                  // console.log('Parsed constructionsRedraw: ', this.redraw);
                }
                catch (error) {
                  console.error('Error fetching REDRAW image', error);
                }
              }
              if (this.userAnswers.constructionsDraw) {
                try {
                  const base64Data = this.userAnswers.constructionsDraw.split(',')[0];
                  this.draw = base64Data.slice(2, base64Data.length - 1);
                  this.draw = this.draw.replace('"', '');
                  // console.log('Draw: ', this.draw);
                  console.log(this.userAnswers.constructionsDraw.split(',').length);                  
                  if(this.userAnswers.constructionsDraw.split(',').length > 1){
                    this.drawGrade = this.userAnswers.constructionsDraw.split(',')[1];
                    if (this.drawGrade.includes('yes')) {
                      this.drawGrade = 'yes';
                      this.constructionGrade += 2;
                    } else if (this.drawGrade.includes('no')) {
                      this.drawGrade = 'no';
                    } else if (this.drawGrade.includes('maybe')) {
                      this.drawGrade = 'maybe';
                      this.constructionGrade += 1;
                    }
                  }else{
                    this.drawGrade = 'ungraded';
                  }
                  // console.log('Parsed constructionsDraw: ', this.draw);
                }
                catch (error) {
                  console.error('Error fetching DRAW image', error);
                }
              }
              if (this.userAnswers.executiveDraw) {
                try {
                  const base64Data = this.userAnswers.executiveDraw.split(',')[0];
                  this.executiveDraw = base64Data.slice(2, base64Data.length - 1);
                  this.executiveDrawGrade = this.userAnswers.executiveDraw.split(',')[1];
                  if (this.executiveDrawGrade.includes('yes')) {
                    this.executiveDrawGrade = 'yes';
                    this.executiveGrade += 1;
                  } else if (this.executiveDrawGrade.includes('no')) {
                    this.executiveDrawGrade = 'no';
                  } else if (this.executiveDrawGrade.includes('maybe')) {
                    this.executiveDrawGrade = 'maybe';
                  }
                  // console.log('Parsed constructionsDraw: ', this.executiveDraw);
                }
                catch (error) {
                  console.error('Error fetching DRAW image', error);
                }
              }
              if (this.userAnswers.executiveLinesDraw) {
                try {
                  // const base64Data = this.userAnswers.executiveLinesDraw.split(',')[0];              
                  this.crossExecutiveDraw = this.userAnswers.executiveLinesDraw.slice(2, this.userAnswers.executiveLinesDraw.length - 2);
                  // console.log('Parsed Trail Draw: ', this.crossExecutiveDraw);
                }
                catch (error) {
                  console.error('Error fetching TRAIL image', error);
                }
              }

              this.verbal = this.userAnswers.verbalWords.split('|');
              this.verbalGrade = this.verbal[this.verbal.length - 1];
              this.verbalGrade = this.verbalGrade.slice(0, this.verbalGrade.length - 2);
              
              this.verbal = this.verbal[0].split(',').map(word => word.replace(/["{}]/g, ''));
              // console.log("Verbal ", this.verbal);


              this.orientationMonth = this.userAnswers.orientationMonth.split('|');
              this.orientationDay = this.userAnswers.orientationDay.split('|');
              this.orientationYear = this.userAnswers.orientationYear.split('|');
              this.naming1 = this.userAnswers.namingPicture1.split('|');
              this.naming2 = this.userAnswers.namingPicture2.split('|');
              this.similarities = this.userAnswers.similarities.split('|');
              this.calculation1 = this.userAnswers.calculation1.split('|');
              this.calculation2 = this.userAnswers.calculation2.split('|');
              this.trail = this.userAnswers.executiveTrail.split('|');
              this.executiveLines = this.userAnswers.executiveLines.split('|');
              this.memory = this.userAnswers.memoryPhrase.split('|');

              if (this.orientationMonth[1] == 'correct') {
                this.orientationGrade += 1;
              }
              if (this.orientationDay[1] == 'correct') {
                this.orientationGrade += 2;
              }
              if (this.orientationYear[1] == 'correct') {
                this.orientationGrade += 1;
              }
              if (this.naming1[1] == 'correct') {
                this.namingGrade += 1;
              }
              if (this.naming2[1] == 'correct') {
                this.namingGrade += 1;
              }
              if (this.similarities[1] == 'correct') {
                this.similaritiesGrade += 2;
              }else if (this.similarities[1] == 'half-correct') {
                this.similaritiesGrade += 1;
              }
              if (this.calculation1[1] == 'correct') {
                this.calculationGrade += 1;
              }
              if (this.calculation2[1] == 'correct') {
                this.calculationGrade += 1;
              }
              if (this.verbalGrade == 'correct') {
                this.verbalFluencyGrade += 2;
              }else if(this.verbalGrade == 'half-correct'){
                this.verbalFluencyGrade += 1;
              }
              if (this.trail[1] == 'correct') {
                this.executiveGrade += 2;
              }else if(this.trail[1] == 'half-correct'){
                this.executiveGrade += 1;
              }
              if (this.executiveLines[1] == 'correct') {
                this.executiveGrade += 1;
              }
              if (this.memory[1] == 'correct') {
                this.memoryGrade += 2;
              }else if(this.memory[1] == 'half-correct'){
                this.memoryGrade += 1;
              }
              this.updateGrade();
            },
            error => {
              console.error('Error fetching user answers', error);
            }
          );
        }
      )
    }
  }

  async updateGrade(){
    // console.log("ORIENTATION: ", this.orientationGrade)
    // console.log("NAMING: ", this.namingGrade)
    // console.log("SIMILARITIES: ", this.similaritiesGrade)
    // console.log("CALCULATION: ", this.calculationGrade)
    // console.log("CONSTRUCTION: ", this.constructionGrade)
    // console.log("VERBAL FLUENCY: ", this.verbalFluencyGrade)
    // console.log("EXECUTIVE: ", this.executiveGrade)
    // console.log("MEMORY: ", this.memoryGrade)
    
    this.answersGrade = this.orientationGrade + this.namingGrade + this.similaritiesGrade + this.calculationGrade + this.constructionGrade + this.verbalFluencyGrade + this.executiveGrade + this.memoryGrade;  
    return this.answersGrade;
  }
  

  async updateConstructionsDraw(num : number){
    this.newConstructionsDraw = this.userAnswers.constructionsDraw.replace('\\', '').split(',')[0].slice(2, this.userAnswers.constructionsDraw.length - 1);
    console.log(this.newConstructionsDraw);
    var putDraw: string[] = [];    

    if(num == 3){
      const image = this.newConstructionsDraw.replace('\\', '');
      putDraw = [image.slice(0,image.length - 1), '|no'];       
    }else if(num == 1){
      const image = this.newConstructionsDraw.replace('\\', '');
      putDraw = [image.slice(0,image.length - 1), '|yes'];    
    }else if(num == 2){
      const image = this.newConstructionsDraw.replace('\\', '');
      putDraw = [image.slice(0,image.length - 1), '|maybe'];      
    }
    
    console.log('GRADE TO SAVE: ', this.answersGrade);
    try {
      const response = await this.apiService.updateConstructionsDraw(this.answersId, putDraw, this.answersGrade).toPromise();
      this.userAnswers.constructionsDraw = putDraw;
      this.updateGrade();
      console.log('Updated Grade:', this.answersGrade);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user answers', error);
    }
  }

  async updateConstructionsRedraw(num: number){
    this.newConstructionsRedraw = this.userAnswers.constructionsRedraw.replace('\\', '').split(',')[0].slice(2, this.userAnswers.constructionsRedraw.length - 1);
    console.log(this.newConstructionsRedraw);
    
    if(num == 3){
      const image = this.newConstructionsRedraw.replace('\\', '');
      var putRedraw = [image.slice(0,image.length - 1), '|no'];
      console.log("PUTDRAW YES: ",putRedraw);
    }else if(num == 1){
      const image = this.newConstructionsRedraw.replace('\\', '');
      var putRedraw = [image.slice(0,image.length - 1), '|yes'];
      console.log("PUTDRAW NO: ",putRedraw);
    }else if(num == 2){
      const image = this.newConstructionsRedraw.replace('\\', '');
      var putRedraw = [image.slice(0,image.length - 1), '|maybe'];
      console.log("PUTDRAW UNGRADED: ",putRedraw);
    }else{
      putRedraw = this.userAnswers.constructionsRedraw;
    }
    
    console.log(putRedraw);
    console.log(this.userAnswers.constructionsRedraw);
    try {
      const response = await this.apiService.updateConstructionsRedraw(this.answersId, putRedraw, this.answersGrade).toPromise();
      console.log('Response from update: ', response);
      this.userAnswers.constructionsRedraw = putRedraw;    
      this.updateGrade();
      console.log('Updated Grade:', this.answersGrade);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user answers', error);
    }
  
  }
  
  async updateOrientation(num: number, grade: boolean){
    var gradeParam = '';
    if(grade){
      gradeParam = '|correct';
    }else{
      gradeParam = '|incorrect';
    }

    if(num == 1){
      var month = this.orientationMonth[0];
      console.log('MONTH: ', month);
      var newMonth = month+gradeParam;
      console.log('NEW MONTH: ', newMonth);

      try {
        const response = await this.apiService.updateOrientationMonth(this.answersId, newMonth, this.answersGrade).toPromise();
        console.log('Response from update: ', response);
        this.userAnswers.constructionsRedraw = newMonth;
        this.updateGrade();
        console.log('Updated Grade:', this.answersGrade);
        window.location.reload();
      } catch (error) {
        console.error('Error updating user answers', error);
      }
    }else if(num == 2){
      var day = this.orientationDay[0];
      console.log('DAY: ', day);
      var newDay = day+gradeParam;
      console.log('NEW DAY: ', newDay);

      try {
        const response = await this.apiService.updateOrientationDay(this.answersId, newDay, this.answersGrade).toPromise();
        console.log('Response from update: ', response);
        this.userAnswers.constructionsRedraw = newDay;
        this.updateGrade();
        console.log('Updated Grade:', this.answersGrade);
        window.location.reload();
      } catch (error) {
        console.error('Error updating user answers', error);
      }
    }else if(num == 3){
      var year = this.orientationYear[0];
      console.log('YEAR: ', year);
      var newYear = year+gradeParam;
      console.log('NEW YEAR: ', newYear);

      try {
        const response = await this.apiService.updateOrientationYear(this.answersId, newYear, this.answersGrade).toPromise();
        console.log('Response from update: ', response);
        this.userAnswers.constructionsRedraw = newYear;
        this.updateGrade();
        console.log('Updated Grade:', this.answersGrade);
        window.location.reload();
      } catch (error) {
        console.error('Error updating user answers', error);
      }
    }
    this.updateGrade();
  }

  async updateNaming(num: number, grade: boolean){
    var gradeParam = '';
    if(grade){
      gradeParam = '|correct';
    }else{
      gradeParam = '|incorrect';
    }

    if(num == 1){
      var naming1 = this.naming1[0];
      var newName1 = naming1 + gradeParam;

      try {
        const response = await this.apiService.updateNaming1(this.answersId, newName1, this.answersGrade).toPromise();
        console.log('Response from update: ', response);
        this.userAnswers.constructionsRedraw = newName1;
        this.updateGrade();
        console.log('Updated Grade:', this.answersGrade);
        window.location.reload();
      } catch (error) {
        console.error('Error updating user answers', error);
      }
    }else{
      var naming2 = this.naming2[0];
      var newName2 = naming2 + gradeParam;

      try {
        const response = await this.apiService.updateNaming2(this.answersId, newName2, this.answersGrade).toPromise();
        console.log('Response from update: ', response);
        this.userAnswers.constructionsRedraw = newName2;
        this.updateGrade();
        console.log('Updated Grade:', this.answersGrade);
        window.location.reload();
      } catch (error) {
        console.error('Error updating user answers', error);
      }
    }
  }

  async updateSimilarities(grade: number){
    var gradeParam = '';
    if(grade == 1){
      gradeParam = '|correct';
    }else if(grade == 2){
      gradeParam = '|half-correct';
    }else{
      gradeParam = '|incorrect';
    }

    var similarities = this.similarities[0];
    var newSimilarities = similarities + gradeParam;

    try {
      const response = await this.apiService.updateSimilarities(this.answersId, newSimilarities, this.answersGrade).toPromise();
      console.log('Response from update: ', response);
      this.userAnswers.constructionsRedraw = newSimilarities;
      this.updateGrade();
      console.log('Updated Grade:', this.answersGrade);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user answers', error);
    }
  }

  async updateCalculations(num: number, grade: boolean){
    var gradeParam = '';
    if(grade){
      gradeParam = '|correct';
    }else{
      gradeParam = '|incorrect';
    }

    if(num == 1){
      var calculation1 = this.calculation1[0];
      var newCalculation1 = calculation1 + gradeParam;

      try {
        const response = await this.apiService.updateCalculation1(this.answersId, newCalculation1, this.answersGrade).toPromise();
        console.log('Response from update: ', response);
        this.userAnswers.constructionsRedraw = newCalculation1;
        this.updateGrade();
        console.log('Updated Grade:', this.answersGrade);
        window.location.reload();
      } catch (error) {
        console.error('Error updating user answers', error);
      }
    }else{
      var calculation2 = this.calculation2[0];
      var newCalculation2 = calculation2 + gradeParam;

      try {
        const response = await this.apiService.updateCalculation2(this.answersId, newCalculation2, this.answersGrade).toPromise();
        console.log('Response from update: ', response);
        this.userAnswers.constructionsRedraw = newCalculation2;
        this.updateGrade();
        console.log('Updated Grade:', this.answersGrade);
        window.location.reload();
      } catch (error) {
        console.error('Error updating user answers', error);
      }
    }
  }

  async updateVerbal(grade: number){
    var gradeParam = '';
    if(grade == 1){
      gradeParam = '|correct';
    }else if(grade == 2){
      gradeParam = '|half-correct';
    }else{
      gradeParam = '|incorrect';
    }

    var words = this.verbal;
    words[words.length - 1] = gradeParam;

    console.log("VERBAL: ", words)   

    try {
      const response = await this.apiService.updateVerbal(this.answersId, words, this.answersGrade).toPromise();
      console.log('Response from update: ', response);
      this.userAnswers.constructionsRedraw = words;
      this.updateGrade();
      console.log('Updated Grade:', this.answersGrade);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user answers', error);
    }
  }

  async updateTrail(grade: number){
    var gradeParam = '';
    if(grade == 1){
      gradeParam = '|correct';
    }else if(grade == 2){
      gradeParam = '|half-correct';
    }else{
      gradeParam = '|incorrect';
    }

    var trail = this.trail[0];
    var newTrail = trail + gradeParam;

    console.log("TRAIL: ", newTrail)
    try {
      const response = await this.apiService.updateTrail(this.answersId, newTrail, this.answersGrade).toPromise();
      console.log('Response from update: ', response);
      this.userAnswers.constructionsRedraw = newTrail;
      this.updateGrade();
      console.log('Updated Grade:', this.answersGrade);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user answers', error);
    }
  }

  async updateExecutiveLines(grade: boolean){
    var gradeParam = '';
    if(grade){
      gradeParam = '|correct';
    }else{
      gradeParam = '|incorrect';
    }

    var executiveLines = this.executiveLines[0];
    var newExecutiveLines = executiveLines + gradeParam;

    console.log("EXECUTIVE: ", newExecutiveLines)
    try {
      const response = await this.apiService.updateExecutiveLines(this.answersId, newExecutiveLines, this.answersGrade).toPromise();
      console.log('Response from update: ', response);
      this.userAnswers.constructionsRedraw = newExecutiveLines;
      this.updateGrade();
      console.log('Updated Grade:', this.answersGrade);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user answers', error);
    }
  }

  async updateExecutiveDraw(num: boolean){
    var newExecutiveDraw = this.userAnswers.executiveDraw.replace('\\', '').split(',')[0].slice(2, this.userAnswers.executiveDraw.length - 1);

    if(num){
      const image = newExecutiveDraw.replace('\\', '');
      var putRedraw = [image.slice(0,image.length - 1), '|yes'];
      console.log("PUTDRAW YES: ",putRedraw);
    }else if(!num){
      const image = newExecutiveDraw.replace('\\', '');
      var putRedraw = [image.slice(0,image.length - 1), '|no'];
      console.log("PUTDRAW NO: ",putRedraw);
    }else{
      putRedraw = newExecutiveDraw;
    }
    
    try {
      const response = await this.apiService.updateExecutiveDraw(this.answersId, putRedraw, this.answersGrade).toPromise();
      console.log('Response from update: ', response);
      this.userAnswers.executiveDraw = putRedraw;    
      this.updateGrade();
      console.log('Updated Grade:', this.answersGrade);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user answers', error);
    }
  }

  async updateMemory(grade: number){
    var gradeParam = '';
    if(grade == 1){
      gradeParam = '|correct';
    }else if(grade == 2){
      gradeParam = '|half-correct';
    }else{
      gradeParam = '|incorrect';
    }

    var memory = this.memory[0];
    var newMemory = memory + gradeParam;

    console.log("MEMORY: ", newMemory)
    try {
      const response = await this.apiService.updateMemory(this.answersId, newMemory, this.answersGrade).toPromise();
      console.log('Response from update: ', response);
      this.userAnswers.constructionsRedraw = newMemory;
      this.updateGrade();
      console.log('Updated Grade:', this.answersGrade);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user answers', error);
    }
  }
}
