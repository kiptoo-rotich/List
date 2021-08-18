import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert-service/alert.service';
import { GoalService } from '../goal-service/goal.service'
import { HttpClient } from '@angular/common/http'
import { Quote } from '../quote-class/quote'
import { QuoteRequestService } from '../quote-http/quote-request.service';
// import { Goal } from '../goal';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  goals: Goal[];
  alertService: AlertService;
  quote: Quote;

  

  constructor(goalService: GoalService, alertService: AlertService, private quoteService:QuoteRequestService) {
    this.goals = goalService.getGoals();
    this.alertService = alertService;
  }


  ngOnInit() {

    this.quoteService.quoteRequest()
    this.quote=this.quoteService.quote

    // // interface ApiResponse {
    //   author: string;
    //   quote: string;
    // }

    // this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data => {
    //   //Successful API request
    //   this.quote = new Quote(data.author, data.quote)
    // }, err => {
    //   this.quote = new Quote("Winston Churchill", "Never never give up!")
    //   console.log("An error occured")
    // })
  }

  addNewGoal(goal: any) {
    let goalLength = this.goals.length;
    goal.id = goalLength + 1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }

  toggleDetails(index: any) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }


  deleteGoal(toDelete: boolean, index: number) {
    if (toDelete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`);

      if (toDelete) {
        this.goals.splice(index, 1);
        this.alertService.alertMe("The goal has been deleted");
      }
    }
  }

}



export class Goal {
  showDescription: boolean;
  constructor(public id: number, public name: string, public description: string, public completeDate: Date) {
    this.showDescription = false;
  }
}
