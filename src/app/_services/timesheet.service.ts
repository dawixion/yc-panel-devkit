import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@/_models';

export interface TimeSheetElement {
    id: number;
    name: string;
    surname: string;
    entry: string;
    exit: string;
}

@Injectable({ providedIn: 'root' })
export class TimeSheetService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<TimeSheetElement[]>(`http://api.ycit.pl:80/workmonitor/employeesAtWork`);
    }
}