export enum UserStatus {
  Free = 'free',
  Busy = 'busy',
}

export interface User {
  id?: string;
  name: string;
  age: number;
  status: UserStatus;
  dateOfBirth: string | number;
  createdAt: string | number;
  isEdit: boolean;
}

export interface UserColumn {
  key: string;
  label: string;
  type: string;
}

export interface UserStatusOption {
  value: string;
  viewValue: string;
}
