import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TimeSheetService } from '@/_services';
import { routerTransition } from '@/router.animation';

@Component({
  templateUrl: './timesheet-by-day.component.html',
  styleUrls: ['./timesheet-by-day.component.scss'],
  animations: [routerTransition()]
})

export class TimesheetByDayComponent implements OnInit {
  displayedColumns: string[] = ['name', 'entry', 'exit'];
  timeSheetArray: any;
  
  moment = require('moment'); 
  actualDateToTable = this.moment("2020-03-30").format("YYYY-MM-DD").toString(); 
  actualDateToInfo = this.moment("2020-03-30").locale("pl").format("LL");

  public errorMsg;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private timesheetService: TimeSheetService
  ) { }

  ngOnInit(){
    this.loadTimeSheetByDate(this.actualDateToTable);
  }

  private loadTimeSheetByDate(date: string) {
    this.timesheetService.getByDate(date)
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
          this.errorMsg = 'W tym dniu nikogo nie było w pracy.';
        }
      );
  }

  prevDay(dateBack: string){
    this.actualDateToTable = this.moment(dateBack).subtract(1, 'days').format("YYYY-MM-DD").toString();
    this.actualDateToInfo = this.moment(this.actualDateToTable).locale("pl").format("LL");
    this.loadTimeSheetByDate(this.actualDateToTable);
  }

  nextDay(dateNext: string){
    this.actualDateToTable = this.moment(dateNext).add(1, 'days').format("YYYY-MM-DD").toString();
    this.actualDateToInfo = this.moment(this.actualDateToTable).locale("pl").format("LL");
    this.loadTimeSheetByDate(this.actualDateToTable);
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




