import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataStoreService} from "../../services/data-store.service";
import {ServerDataSharingService} from "../../services/server-data-sharing.service";
import {User} from "../models/i-user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-control-panel',
  templateUrl: './user-control-panel.component.html',
  styleUrls: ['./user-control-panel.component.scss']
})
export class UserControlPanelComponent implements OnInit {

  panelName;

  states = ['Admin',
    'Driver'];

  User: User;

  email = new FormControl('',
    [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')])
  firstName = new FormControl('',
    [Validators.required, Validators.minLength(2), Validators.maxLength(30)])
  lastName = new FormControl('',
    [Validators.required, Validators.minLength(2), Validators.maxLength(30)])
  userName = new FormControl('',
    [Validators.required, Validators.minLength(2), Validators.maxLength(30)])
  userType = new FormControl('',
    [Validators.required])
  password = new FormControl('',
    [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])
  repeatedPassword = new FormControl('',
    [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])

  formUser: FormGroup = new FormGroup({
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    userName: this.userName,
    userType: this.userType,
    password: this.password,
    repeatedPassword: this.repeatedPassword
  });


  constructor(
    private ServerDataSharingService: ServerDataSharingService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private dataStoreService: DataStoreService,
  ) {
    this.dataStoreService.choicedUser.subscribe(({email, firstName, lastName, userName, userType}) => {
      email ? this.formUser.controls['email'].setValue(email) : this.formUser.controls['email'].setValue('')
      firstName ? this.formUser.controls['firstName'].setValue(firstName) : this.formUser.controls['firstName'].setValue('')
      lastName ? this.formUser.controls['lastName'].setValue(lastName) : this.formUser.controls['lastName'].setValue('')
      userName ? this.formUser.controls['userName'].setValue(userName) : this.formUser.controls['userName'].setValue('')
      userType ? this.formUser.controls['userType'].setValue(userType) : this.formUser.controls['userType'].setValue('')
      userName ? this.panelName = userName : this.panelName = 'Create new user'
    })
  }

  ngOnChanges(): void {}

  ngOnInit(): void {}

  submitForm() {
    this.ServerDataSharingService.createNewUser(
      this.formUser.value.email,
      this.formUser.value.firstName,
      this.formUser.value.lastName,
      this.formUser.value.userName,
      this.formUser.value.userType,
      this.formUser.value.password
    ).subscribe(value => console.log(value))

    this.formUser.reset()

    this.dataStoreService.rightSideBlockVisibility.next(false);

    this.router.navigate(['']).then(() => {
      window.location.reload();
    });

  }

  closePanel() {
    this.dataStoreService.rightSideBlockVisibility.next(false)
  }

  deleteUser() {
    this.ServerDataSharingService.deleteUser(this.dataStoreService.choicedUser.getValue()._id).subscribe(value => console.log(value));

    this.dataStoreService.rightSideBlockVisibility.next(false)

    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

  editUser() {
    this.ServerDataSharingService.editUser(this.dataStoreService.choicedUser.getValue()._id,
      this.formUser.value.email,
      this.formUser.value.firstName,
      this.formUser.value.lastName,
      this.formUser.value.userName,
      this.formUser.value.userType,
      this.formUser.value.password
    ).subscribe(value => console.log(value))

    this.formUser.reset()

    this.dataStoreService.rightSideBlockVisibility.next(false)

    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
