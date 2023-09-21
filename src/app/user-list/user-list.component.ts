import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Ensure that correct path
import {
  User,
  UserColumn,
  UserStatus,
  UserStatusOption,
} from 'src/app/models/user';
import { delay } from 'rxjs';
import { USER_COLUMNS, USER_STATUS_MAPPING, USER_STATUS_OPTIONS } from '../data/user';
import { FormControl } from '@angular/forms';

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
  userStatusMapping: any = USER_STATUS_MAPPING
  displayedColumns: UserColumn['key'][] = USER_COLUMNS.map(
    (userColumn) => userColumn.key
  );

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getUserList()
      .pipe(delay(500))
      .subscribe((data: Omit<User, 'isEdit'>[]) => {
        this.users = data.sort((a, b) => +b.createdAt - +a.createdAt).map((user) => ({ ...user, isEdit: false }));
        this.isLoading = false;
      });
  }

  addUser() {
    const newRow: User = {
      id: '#',
      name: '',
      age: 0,
      status: UserStatus.Free,
      createdAt: new Date().getTime(),
      dateOfBirth: '2023-09-21',
      isEdit: true,
    };
    this.users = [newRow, ...this.users];
  }

  editUser(user: User) {
    if (user.id === '#') {
      const newUser = { ...user, createdAt: new Date().getTime(), dateOfBirth: new Date(user.dateOfBirth).getTime() }
      this.apiService.createUser(newUser).subscribe((userCreated: User) => {
        user.id = userCreated.id;
        user.isEdit = false;
      })
    }
  }

  removeUser(id: User['id']) {
    const filteredUsers = this.users.filter((user) => user.id !== id);
    if (id === '#') {
      this.users = filteredUsers;
    } else {
      // do something
    }
  }

  getAbleToAddUser(user: User) {
    const isAble = user.name && user.age && user.status && user.dateOfBirth
    return isAble
  }
}
