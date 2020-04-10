import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '@/router.animation';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  animations: [routerTransition()]
})
export class TimesheetComponent implements OnInit {
  
  // Array of Filters
  filtersArray = [
    {'id': "day", "name": "Dzień"},
    {'id': "month", "name": "Miesiąc"}
  ]
  

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    
  }

  // Wybór filtra - wewnętrzna nawigacja
  onSelect(filter){
    this.router.navigate([filter.id], {relativeTo: this.route});  
  }

}
