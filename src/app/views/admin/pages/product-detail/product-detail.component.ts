import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "@components/base.component";
import { Benefit } from "@interfaces/benefit.interface";
import { ProductDetail } from "@interfaces/product-interface";
import { BenefitService } from "@services/benefit.service";
import { ProductService } from "@services/product.service";
import { ProductFormComponent } from "../modals/product-form/product-form.component";
import { ProgramService } from "@services/program.service";
import { Program } from "@interfaces/program.interface";
import { ProgramFormComponent } from "../modals/program-form/program-form.component";

@Component({
  selector: 'admin-product-detail',
  templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent extends BaseComponent<ProductDetail> {
  public benefitData: Benefit[] = []
  public programData: Program[] = []
  public programLoading: boolean = false
  public override isDetail: boolean = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _benefitService: BenefitService,
    private _programService: ProgramService
  ) {
    super()
    this.id = _activatedRoute.snapshot.params['id']
    this.model = _productService
  }

  public override loadDependencies(): void {
    this.loadPrograms()
  }

  loadPrograms() {
    this.programLoading = true
    this._programService.getData({ product_id: this.id }).subscribe({
      next: res => {
        this.programData = res.data as Program[]
      }
    }).add(() => {
      this.programLoading = false
    })
  }

  editProduct() {
    const { programs, type, ...updatedData } = { ...this.singleData, benefits: this.singleData.benefits?.map(item => item.id) };
    this.modalService.show(ProductFormComponent, {
      class: 'modal-md', initialState: { model: this._productService, form: updatedData, editMode: true, alertService: this.alertService }
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }

  addProgram(): void {
    this.modalService.show(ProgramFormComponent, {
      class: 'modal-md', initialState: { model: this._programService, form: { product_id: this.singleData.id, type_id: this.singleData.type?.id }, alertService: this.alertService }
    }).content?.event.subscribe(res => res === 200 && this.loadPrograms())
  }

  editProgram(item: Program): void {
    this.modalService.show(ProgramFormComponent, {
      class: 'modal-md', initialState: { model: this._programService, form: item, alertService: this.alertService, editMode: true }
    }).content?.event.subscribe(res => res === 200 && this.loadPrograms())
  }

  async deleteProgram(item: Program): Promise<void> {
    const response = await this.alertService.confirm('Anda yakin ingin menghapus program ini?')
    if (!response) return
    this._programService.delete(item.id).subscribe({
      next: res => {
        this.alertService.success('Sukses menghapus data')
        this.loadPrograms()
      }
    })
  }

  public override afterDelete(): void {
    this.location.back()
  }
}
