import { Component } from "@angular/core";
import { ModalComponent } from "@components/modal.component";
import { HeroService } from "@services/hero.service";

@Component({
  selector: 'welcome-text-form',
  templateUrl: 'welcome-text-form.component.html'
})
export class WelcomeTextFormComponent extends ModalComponent {
  constructor(private _heroService: HeroService) {
    super()
    this.model = _heroService
  }
}
