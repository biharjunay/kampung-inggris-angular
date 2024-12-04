import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "@components/base.component";
import { BenefitService } from "@services/benefit.service";
import { BenefitFormComponent } from "../modals/benefit-form/benefit-form.component";
import { Benefit } from "@interfaces/benefit.interface";

@Component({
  selector: 'admin-benefits',
  templateUrl: 'benefit.component.html'
})
export class BenefitComponent extends BaseComponent<Benefit> {
  constructor(
    public activatedRoute: ActivatedRoute,
    private _benefitService: BenefitService
  ) {
    super()
    this.filter['page'] = 1
    this.model = _benefitService
  }

  addBenefits() {
    this.modalService.show(BenefitFormComponent, {
      class: 'modal-md', initialState: {model: this._benefitService, alertService: this.alertService}
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }

  editBenefits(item: any) {
    const {products, ...updatedData} = item
    this.modalService.show(BenefitFormComponent, {
      class: 'modal-md', initialState: {model: this._benefitService, alertService: this.alertService, editMode: true, form: updatedData }
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }
}
