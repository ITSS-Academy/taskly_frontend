import {UserModel} from '../../models/user.model';

export interface UserState {
  user: UserModel | null

  isGettingUser: boolean
  isGettingUserSuccess: boolean
  getUserError: string

  searchUsers: UserModel[]
  isSearchingUsers: boolean
  isSearchingUsersSuccess: boolean
  searchUsersError: string
}
