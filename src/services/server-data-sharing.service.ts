import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../app/models/i-user";


@Injectable({
  providedIn: 'root'
})
export class ServerDataSharingService {


  constructor(
    private httpClient: HttpClient,
  ) {

  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/api/users/');
  }

  createNewUser(email,
                firstName,
                lastName,
                userName,
                userType,
                password): Observable<User> {
    return this.httpClient.post<User>('/api/users/',
      {
      "userName": userName,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "userType": userType
    }
    )
  }

  editUser(id, email,
           firstName,
           lastName,
           userName,
           userType,
           password): Observable<any> {
    const body: Object = {};

    if (email) body["email"] = email;
    if (firstName) body["firstName"] = firstName;
    if (lastName) body["lastName"] = lastName;
    if (userName) body["userName"] = userName;
    if (userType) body["userType"] = userType;
    if (password) body["password"] = password;

    return this.httpClient.patch<any>(`/api/users/${id}`, body)
  }

  deleteUser(id): Observable<any> {
    return this.httpClient.delete<any>(`/api/users/${id}`)
  }
}
