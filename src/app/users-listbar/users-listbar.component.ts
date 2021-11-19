import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/i-user";
import {ServerDataSharingService} from "../../services/server-data-sharing.service";


@Component({
  selector: 'app-users-listbar',
  templateUrl: './users-listbar.component.html',
  styleUrls: ['./users-listbar.component.scss']
})
export class UsersListbarComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(
    private ServerDataSharingService: ServerDataSharingService) {
  }


  ngOnInit(): void {
    this.users$ = this.ServerDataSharingService.getUsers();
  }
}
