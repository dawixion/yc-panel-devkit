import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TimeSheetService } from '@/_services';
import { routerTransition } from '@/router.animation';



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

const MONTH_DATA: TimesheetByMonthArray[] = 
[
  {
    "id": 1,
    "name": "Piotr",
    "surname": "Opioła",
    "position": "Senior Web Developer",
    "timesheet": [
      {
          "day": "2020-03-30",
          "entry": "2020-03-22T14:07:00+0100",
          "exit": "2020-03-22T14:07:00+0100"
      },
      {
          "day": "2020-03-31",
          "entry": "2020-03-22T14:07:00+0100",
          "exit": "2020-03-22T14:07:00+0100"
      },
      {
          "day": "2020-04-01",
          "entry": "2020-03-22T14:07:00+0100",
          "exit": "2020-03-22T14:07:00+0100"
      }
    ]
  },
  {
    "id": 2,
    "name": "Bartłomiej",
    "surname": "Zajac",
    "position": "Web Developer",
    "timesheet": [
      {
          "day": "2020-03-30",
          "entry": "2020-03-22T14:07:00+0100",
          "exit": "2020-03-22T14:07:00+0100"
      },
      {
          "day": "2020-03-31",
          "entry": "2020-03-22T14:07:00+0100",
          "exit": "2020-03-22T14:07:00+0100"
      },
      {
          "day": "2020-04-01",
          "entry": "2020-03-22T14:07:00+0100",
          "exit": "2020-03-22T14:07:00+0100"
      }
    ]
  },
];
    
@Component({
  selector: 'app-timesheet-by-month',
  templateUrl: './timesheet-by-month.component.html',
  styleUrls: ['./timesheet-by-month.component.scss'],
  animations: [routerTransition()]
})

export class TimesheetByMonthComponent implements OnInit {

  displayedColumns: string[] = ['name', 'entry'];
  dataSource = MONTH_DATA;
  timeSheetArray: any;

  errorMsg: string;
  
  moment = require('moment'); 
  actualDateToTable = this.moment("2020-03").format("YYYY-MM").toString(); 
  actualDateToInfo = this.moment("2020-03").locale("pl").format("LL");

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private timesheetService: TimeSheetService
  ) { }

  ngOnInit(){
    //this.loadTimeSheetByMonth(this.actualDateToTable);
  }

  private loadTimeSheetByMonth(date: string) {
    this.timesheetService.getByMonth(date)
      .subscribe(
        data => {
          this.timeSheetArray = new MatTableDataSource(data);
          this.timeSheetArray.sort = this.sort;
          this.timeSheetArray.paginator = this.paginator; 
          this.errorMsg = null;
          
  
  
          this.paginator._intl.itemsPerPageLabel = 'Ilość osób na stronę:';
          this.paginator._intl.nextPageLabel = 'Następna strona';
          this.paginator._intl.previousPageLabel = 'Poprzednia strona';
          this.paginator._intl.firstPageLabel = 'Pierwsza strona';
          this.paginator._intl.lastPageLabel = 'Ostatnia strona';
          this.paginator._intl.getRangeLabel = polishRangeLabel;
        },
        error => {
          this.timeSheetArray = new MatTableDataSource();
          this.errorMsg = 'W tym miesiącu nikogo nie było w pracy.';
        }
      );
  }

  prevMonth(dateBack: string){
    this.actualDateToTable = this.moment(dateBack).subtract(1, 'months').format("YYYY-MM-DD").toString();
    this.actualDateToInfo = this.moment(this.actualDateToTable).locale("pl").format("LL");
    this.loadTimeSheetByMonth(this.actualDateToTable);
  }

  nextMonth(dateNext: string){
    this.actualDateToTable = this.moment(dateNext).add(1, 'months').format("YYYY-MM-DD").toString();
    this.actualDateToInfo = this.moment(this.actualDateToTable).locale("pl").format("LL");
    this.loadTimeSheetByMonth(this.actualDateToTable);
  }

}

// Tłumaszczenie przyimka "of"
const polishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 z ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} z ${length}`;
};
