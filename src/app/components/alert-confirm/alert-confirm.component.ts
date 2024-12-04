import { Component } from "@angular/core";
import { ModalComponent } from "../modal.component";

@Component({
  selector: 'app-confirm',
  templateUrl: 'alert-confirm.component.html',
  styleUrl: 'alert-confirm.component.scss'
})
export class AlertConfirmComponent extends ModalComponent {
  public message!: string

  public click(confirm: boolean) {
    this.closeModal()
    this.event.emit(confirm)
  }
}
