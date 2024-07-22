import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAnswersDetailComponent } from './user-answers-detail/user-answers-detail.component';

const routes: Routes = [
  { path: 'user-answers', component: DashboardComponent },
  { path: 'user-answers/:id', component: UserAnswersDetailComponent },
  { path: '', redirectTo: '/user-answers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
