import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'; 

// INTERFACES FOR DAYS
export interface TimeSheetElement {
    id: number;
    name: string;
    surname: string;
    entry: string;
    exit: string;
}


// INTERFACES FOR MONTH
export interface Timesheet {
    day: string;
    entry: string;
    exit: string;
}
export interface TimesheetByMonthArray {
    id: number;
    name: string;
    surname: string;
    position: string;
    timesheet: Timesheet[];
}


@Injectable({ providedIn: 'root' })
export class TimeSheetService {
    constructor(private http: HttpClient) { }

    getAll() {
        // return this.http.get<TimeSheetElement[]>(`http://api.ycit.pl:80/workmonitor/employeesAtWork`);
        return this.http.get<TimeSheetElement[]>(`http://api.ycit.pl:80/workmonitor/employeesAtWorkByDate?date=2020-03-30`);
    }

    getByDate(date: string): Observable<TimeSheetElement[]>{
        return this.http.get<TimeSheetElement[]>(`http://api.ycit.pl:80/workmonitor/employeesAtWorkByDate?date=${date}`)
            .catch(this.errorHandler);
    }

    getByMonth(month: string){
        return this.http.get<TimeSheetElement[]>(`http://api.ycit.pl:80/workmonitor/employeesAtWorkByMonth?date=${month}`);
    }

    errorHandler(error: HttpErrorResponse){
        return Observable.throw(error.message || 'Server Error');
    }
}