import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  currentLoggedUserID: number;
  currentLoggedUser = []; 

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentLoggedUserID = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
      this.loadAllUsers();
      this.loadCurrentLoggedUserData(this.currentLoggedUserID);
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

  private loadCurrentLoggedUserData(id: number) {
      this.userService.getSingleById(id)
          .pipe(first())
          .subscribe(dane => this.currentLoggedUser = dane );
  }
} 
