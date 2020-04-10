import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService, LocalStorageService } from '@/_services';
import { routerTransition } from '@/router.animation';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition()]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  currentLoggedUserID: number;
  currentLoggedUser: any; 

  moment = require('moment');
  actualdate = this.moment().format();
  actualDateFormatted = this.actualdate.substring(0, 22) + this.actualdate.substring(23);

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private localStorageService: LocalStorageService
  ) {
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentLoggedUserID = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
        this.loadAllUsers();
        this.setLocalCurrentLoggedUserData(this.currentLoggedUserID);   

        this.localStorageService.currentUserLocalStorageData.subscribe((data) => {
            this.currentLoggedUser = JSON.parse(data);
        })
      
  }

  deleteUser(id: number) {
      this.userService.delete(id)
          .pipe(first())
          .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
      this.userService.getAll()
          .pipe(first())
          .subscribe(users => this.users = users);
  }

  private setLocalCurrentLoggedUserData(id: number) {
    this.userService.getSingleById(id)
        .pipe(first())
        .subscribe(dane => {
            this.localStorageService.currentUserLocalStorage = JSON.stringify(dane);
                        
        });
  }
}  
 