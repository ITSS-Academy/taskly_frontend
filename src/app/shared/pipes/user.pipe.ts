import {Pipe, PipeTransform} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/user.model';

@Pipe({
  name: 'user',
  standalone: true
})
export class UserPipe implements PipeTransform {
  constructor(private userService: UserService) {
  }

  transform(uid: string) {
    return this.userService.getUserById(uid);
  }

}
