import { UserColumn, UserStatus, UserStatusOption } from "../models/user";

export const USER_COLUMNS: UserColumn[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'age', label: 'Age', type: 'text' },
  { key: 'status', label: 'Status', type: 'select' },
  { key: 'dateOfBirth', label: 'Date Of Birth', type: 'date' },
  { key: 'actions', label: '', type: 'actions' }
]

export const USER_STATUS_OPTIONS: UserStatusOption[] = [
  {value: UserStatus.Free, viewValue: 'Free'},
  {value: UserStatus.Busy, viewValue: 'Busy'},
]

export const USER_STATUS_MAPPING = {
  [UserStatus.Free]: 'Free',
  [UserStatus.Busy]: 'Busy',
}
