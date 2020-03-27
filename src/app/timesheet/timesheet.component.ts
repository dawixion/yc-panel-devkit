import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TimeSheetService } from '@/_services';
import { routerTransition } from '@/router.animation';


@Component({
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  animations: [routerTransition()]
})
export class TimesheetComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'entry', 'exit'];
  timeSheetArray: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private timesheetService: TimeSheetService,
  ) { }

  ngOnInit(){

    this.loadTimeSheet();
    
  }

  private loadTimeSheet() {
    this.timesheetService.getAll()
      .subscribe(data => {
        this.timeSheetArray = new MatTableDataSource(data);
        this.timeSheetArray.sort = this.sort;
        this.timeSheetArray.paginator = this.paginator; 
        


        this.paginator._intl.itemsPerPageLabel = 'Ilość osób na stronę:';
        this.paginator._intl.nextPageLabel = 'Następna strona';
        this.paginator._intl.previousPageLabel = 'Poprzednia strona';
        this.paginator._intl.firstPageLabel = 'Pierwsza strona';
        this.paginator._intl.lastPageLabel = 'Ostatnia strona';
        this.paginator._intl.getRangeLabel = polishRangeLabel;
      });
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