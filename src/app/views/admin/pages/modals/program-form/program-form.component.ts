import { Component, OnInit } from "@angular/core";
import { ModalComponent } from "@components/modal.component";

@Component({
  selector: 'admin-program-form',
  templateUrl: 'program-form.component.html'
})
export class ProgramFormComponent extends ModalComponent {
  constructor() {
    super()
  }
}
