import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { AuthGuard } from './_helpers';
import { TimesheetByDayComponent } from './timesheet-by-day/timesheet-by-day.component';
import { TimesheetByMonthComponent } from './timesheet-by-month/timesheet-by-month.component';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { 
    path: 'timesheet', 
    component: TimesheetComponent,
    children: [
      { path: 'day', component: TimesheetByDayComponent },
      { path: 'month', component: TimesheetByMonthComponent }
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);  