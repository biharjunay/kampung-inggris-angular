import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "@components/base.component";
import { Product } from "@interfaces/product-interface";
import { ProductService } from "@services/product.service";
import { ProductFormComponent } from "../modals/product-form/product-form.component";

@Component({
  selector: 'admin-product',
  templateUrl: 'product.component.html'
})
export class ProductComponent extends BaseComponent<Product> {
  constructor(
    private _productService: ProductService,
    public activatedRoute: ActivatedRoute
  ) {
    super()
    this.filter['page'] = 1
    this.model = _productService
  }

  addProduct() {
    this.modalService.show(ProductFormComponent, {
      class: 'modal-md', initialState: { model: this._productService, alertService: this.alertService }
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }
}
