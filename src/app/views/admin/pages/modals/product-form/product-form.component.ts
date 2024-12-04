import { Component, OnInit } from "@angular/core";
import { ModalComponent } from "@components/modal.component";
import { Benefit } from "@interfaces/benefit.interface";
import { UploadResponse } from "@interfaces/interface";
import { BenefitService } from "@services/benefit.service";
import { UploadImageService } from "@services/upload-image.service";
import { PRODUCT_TYPE } from "app/constants/product-type";
import { getUrlImage } from "app/helpers/image-url";

@Component({
  selector: 'product-form',
  templateUrl: 'product-form.component.html'
})
export class ProductFormComponent extends ModalComponent implements OnInit {
  protected readonly productType = PRODUCT_TYPE

  public benefitData: Benefit[] = []

  constructor(
    private _benefitService: BenefitService,
    private _uploadImageService: UploadImageService
  ) {
    super()
  }

  ngOnInit(): void {
    this.imageUrl = this.form.image_url && getUrlImage(this.form.image_url)
    this.loadBenefitData()
  }

  loadBenefitData() {
    this._benefitService.getData().subscribe({
      next: res => {
        this.benefitData = res.data as Benefit[]
      }
    })
  }

  submit() {
    if (!this.file) {
      this.saveData()
      return
    }
    this.loading = true
    const formData: FormData = new FormData()
    formData.append('image', this.file)
    this._uploadImageService.save(formData).subscribe({
      next: res => {
        this.form.image_url = (res.data as UploadResponse).url
        this.saveData()
      }
    }).add(() => {
      this.loading = false
    })
  }
}
