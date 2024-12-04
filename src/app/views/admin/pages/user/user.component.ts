import { Component } from "@angular/core";
import { BaseComponent } from "@components/base.component";
import { User } from "@interfaces/user.interface";
import { UserService } from "@services/user.service";
import { UserFormComponent } from "../modals/user-form/user-form.component";

@Component({
  selector: 'admin-users',
  templateUrl: 'user.component.html'
})
export class UserComponent extends BaseComponent<User> {
  constructor(
    private _userService: UserService
  ) {
    super();
    this.filter['page'] = 1
    this.model = _userService
  }

  addUser() {
    this.modalService.show(UserFormComponent, {
      class: 'modal-md', initialState: {model: this._userService, alertService: this.alertService}
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }

  editUser(item: User) {
    this.modalService.show(UserFormComponent, {
      class: 'modal-md', initialState: {model: this._userService, editMode: true, alertService: this.alertService, form: item}
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }
}
