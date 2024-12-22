import { Component } from "@angular/core";
import { ModalComponent } from "@components/modal.component";
import { HeroService } from "@services/hero.service";

@Component({
  selector: 'why-we-form',
  templateUrl: 'why-we-form.component.html'
})
export class WhyWeFormComponent extends ModalComponent {
  constructor(private _heroService: HeroService) {
    super()
    this.model = _heroService
  }
}
