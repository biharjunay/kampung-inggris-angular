import { Component } from "@angular/core";
import { BaseComponent } from "@components/base.component";
import { Testimonial } from "@interfaces/testimonial.interface";
import { TestimonialService } from "@services/testimonial.service";
import { TestimonialFormComponent } from "../../modals/testimonial-form/testimonial-form.component";

@Component({
  selector: 'admin-testimonial',
  templateUrl: 'testimonial.component.html'
})
export class TestimonialComponent extends BaseComponent<Testimonial> {
  public file!: File
  public imageUrl!: string

  constructor(
    private _testimonialService: TestimonialService
  ) {
    super()
    this.filter['page'] = 1
    this.model = _testimonialService
  }

  openLink(url: string): void {
    window.open(url, '_blank')
  }

  addTestimonial(): void {
    this.modalService.show(TestimonialFormComponent, {
      class: 'modal-xl', initialState: { model: this._testimonialService, alertService: this.alertService }
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }

  editTestimonial(item: Testimonial): void {
    this.modalService.show(TestimonialFormComponent, {
      class: 'modal-xl', initialState: { model: this._testimonialService, alertService: this.alertService, editMode: true, form: item }
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }
}
