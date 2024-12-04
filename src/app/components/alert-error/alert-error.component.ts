import { Component } from "@angular/core";
import { ModalComponent } from "../modal.component";

@Component({
  selector: 'app-alert-error',
  templateUrl: 'alert-error.component.html',
  styleUrl: 'alert-error.component.scss'
})
export class AlertErrorComponent extends ModalComponent {
  public message!: string

  public ok(): void {
    this.closeModal()
    this.event.emit(true)
  }
}
