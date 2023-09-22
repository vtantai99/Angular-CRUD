import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Ensure that correct path
import {
  User,
  UserColumn,
  UserPayload,
  UserStatus,
  UserStatusOption,
} from 'src/app/models/user';
import { delay } from 'rxjs';
import {
  USER_COLUMNS,
  USER_STATUS_MAPPING,
  USER_STATUS_OPTIONS,
} from '../data/user';
import * as moment from 'moment';
import { getStringId } from '../utils/string';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  isLoading = true;
  users: User[] = [];
  userColumns: UserColumn[] = USER_COLUMNS;
  userStatusOptions: UserStatusOption[] = USER_STATUS_OPTIONS;
  userStatusMapping: any = USER_STATUS_MAPPING;
  displayedColumns: UserColumn['key'][] = USER_COLUMNS.map(
    (userColumn) => userColumn.key
  );

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getUserList()
      .pipe(delay(500))
      .subscribe((data: UserPayload[]) => {
        this.users = data
          .sort((a, b) => +b.createdAt - +a.createdAt)
          .map((user) => ({
            ...user,
            isAdding: false,
            isDeleting: false,
            isEditing: false,
            isEdit: false,
            dateOfBirth: moment(user.dateOfBirth).format('YYYY-MM-DD'),
          }));
        this.isLoading = false;
      });
  }

  addUser() {
    const newRow: User = {
      id: getStringId(),
      name: '',
      age: 25,
      status: UserStatus.Free,
      createdAt: new Date().getTime(),
      dateOfBirth: moment().format('YYYY-MM-DD'),
      isAdding: false,
      isEditing: false,
      isDeleting: false,
      isEdit: true,
    };
    this.users = [newRow, ...this.users];
  }

  editUser(user: User) {
    const { id, name, age, status, createdAt, dateOfBirth } = user;
    if (isNaN(+user.id)) {
      user.isAdding = true;
      const newUser = {
        id: '',
        name,
        age,
        status,
        createdAt: new Date().getTime(),
        dateOfBirth: new Date(user.dateOfBirth).getTime(),
      };
      this.apiService
        .createUser(newUser)
        .subscribe((userCreated: UserPayload) => {
          user.id = userCreated.id;
          user.isEdit = false;
          user.isAdding = false;
        });
    } else {
      user.isEditing = true;
      this.apiService
        .updateUser({ id, name, age, status, createdAt, dateOfBirth })
        .subscribe(() => {
          user.isEdit = false;
          user.isEditing = false;
        });
    }
  }

  cancelUser(user: User) {
    const filteredUsers = this.users.filter((u) => u.id !== user.id);
    if (isNaN(+user.id)) {
      this.users = filteredUsers;
    } else {
      user.isEdit = false;
    }
  }

  removeUser(user: User) {
    const filteredUsers = this.users.filter((u) => u.id !== user.id);
    user.isDeleting = true;
    this.apiService.deleteUser(user.id).subscribe(() => {
      this.users = filteredUsers;
      user.isDeleting = false;
    });
  }

  getAbleToAddUser(user: User) {
    const isAble = user.name && user.age && user.status && user.dateOfBirth;
    return isAble;
  }
}
