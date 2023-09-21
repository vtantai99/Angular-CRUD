export enum UserStatus {
  Free = 'free',
  Busy = 'busy',
}

export interface User {
  id?: string;
  name: string;
  age: number;
  status: UserStatus;
  createdAt: string;
}

export interface UserColumn {
  key: string;
  label: string;
}
