import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  choicedUser: BehaviorSubject<any> = new BehaviorSubject<any>('');

  rightSideBlockVisibility: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() {
  }
}
