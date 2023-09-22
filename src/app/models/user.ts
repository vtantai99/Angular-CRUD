export enum UserStatus {
  Free = 'free',
  Busy = 'busy',
}

export interface User {
  id: string;
  name: string;
  age: number;
  status: UserStatus;
  dateOfBirth: string | number | any;
  createdAt: string | number;
  isAdding: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  isEdit: boolean;
}

export type UserPayload = Pick<User, 'id' | 'name' | 'age' | 'status' | 'dateOfBirth' | 'createdAt'>

export interface UserColumn {
  key: string;
  label: string;
  type: string;
}

export interface UserStatusOption {
  value: string;
  viewValue: string;
}
