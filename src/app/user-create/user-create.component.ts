import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User, UserStatus } from 'src/app/models/user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent {
  newItem: User = { name: '', age: 0, status: UserStatus.Free, createdAt: '' };

  constructor(private apiService: ApiService) {}

  createUser() {
    this.apiService.createUser(this.newItem).subscribe(() => {
      // Thực hiện các tác vụ sau khi tạo mục thành công
      console.log('Item created successfully');
      // Điều hướng hoặc làm gì đó khác
    });
  }
}
