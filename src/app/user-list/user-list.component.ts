import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Ensure that correct path
import { User, UserColumn } from 'src/app/models/user';
import { delay } from 'rxjs';
import { USER_COLUMNS } from '../data/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  isLoading = true;
  users: User[] = [];
  userColumns: UserColumn[] = USER_COLUMNS;
  displayedColumns: UserColumn['key'][] = USER_COLUMNS.map((userColumn) => userColumn.key);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getUserList()
      .pipe(delay(500))
      .subscribe((data: User[]) => {
        this.users = data;
        this.isLoading = false;
      });
  }
}
