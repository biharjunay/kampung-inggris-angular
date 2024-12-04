import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { User } from "@interfaces/user.interface";

@Injectable()
export class UserService extends BaseService<User> {
  protected override endpoint: string = 'users'
}
