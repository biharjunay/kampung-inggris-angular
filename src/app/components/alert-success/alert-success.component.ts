import { Component } from "@angular/core";
import { ModalComponent } from "../modal.component";

@Component({
  selector: 'app-alert-success',
  templateUrl: 'alert-success.component.html',
  styleUrl: 'alert-success.component.scss'
})
export class AlertSuccessComponent extends ModalComponent {
  public message!: string

  public ok(): void {
    this.closeModal()
    this.event.emit(true)
  }
}
