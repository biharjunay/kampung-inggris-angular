import { Component, OnInit } from "@angular/core";
import { ModalComponent } from "@components/modal.component";
import { UploadResponse } from "@interfaces/interface";
import { UploadImageService } from "@services/upload-image.service";
import { getUrlImage } from "app/helpers/image-url";

@Component({
  selector: 'benefit-form',
  templateUrl: 'benefit-form.component.html'
})
export class BenefitFormComponent extends ModalComponent implements OnInit {

  constructor(
    private _uploadImageService: UploadImageService
  ) {
    super()
  }

  ngOnInit(): void {
    this.imageUrl = this.form.icon_url && getUrlImage(this.form.icon_url)
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
        this.form.icon_url = (res.data as UploadResponse).url
        this.saveData()
      }
    }).add(() => {
      this.loading = false
    })
  }
}
