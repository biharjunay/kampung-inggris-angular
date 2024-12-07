import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "@interfaces/product-interface";

@Component({
  selector: 'app-program-card',
  templateUrl: 'program-card.component.html'
})
export class ProgramCardComponent {
  @Input() data!: Product
  @Output() clickDetail: EventEmitter<any> = new EventEmitter()

  seeDetail() {
    this.clickDetail.emit(this.data)
  }
}
