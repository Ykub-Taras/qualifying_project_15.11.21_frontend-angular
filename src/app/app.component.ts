import {Component} from '@angular/core';
import {DataStoreService} from "../services/data-store.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  rightSideBlockVisibility;

  constructor(private dataStoreService: DataStoreService) {
    this.dataStoreService.rightSideBlockVisibility.subscribe(value => this.rightSideBlockVisibility = value);
  }


  createUser() {
    this.rightSideBlockVisibility = true;
    this.dataStoreService.choicedUser.next('');
  }
}

