import { Component } from "@angular/core";
import { ModalComponent } from "@components/modal.component";

@Component({
  selector: 'admin-user-form',
  templateUrl: 'user-form.component.html'
})
export class UserFormComponent extends ModalComponent {
  constructor() {
    super()
  }

  submit(): void {
    this.loading = true
    const model$ = this.editMode ? this.model.update(this.form.id, this.form) : this.model.save(this.form)
    model$.subscribe(res => {
      this.modalRef.hide()
      this.event.emit(200)
      this.alertService.success(`Sukses ${this.editMode ? 'mengubah' : 'menambahkan'} data`)
    }).add(() => {
      this.loading = false
    })
  }
}
