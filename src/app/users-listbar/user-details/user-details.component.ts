import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/i-user";
import {DataStoreService} from "../../../services/data-store.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input()
  user!: User;

  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit(): void {
  }

  saveChoice() {
    this.dataStoreService.rightSideBlockVisibility.next(true)
    this.dataStoreService.choicedUser.next(this.user)
  }
}
