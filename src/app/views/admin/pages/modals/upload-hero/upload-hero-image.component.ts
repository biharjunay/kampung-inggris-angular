import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { ModalComponent } from "@components/modal.component";
import { UploadResponse } from "@interfaces/interface";
import { AlertService } from "@services/alert.service";
import { UploadImageService } from "@services/upload-image.service";
import { getUrlImage } from "app/helpers/image-url";

@Component({
  selector: 'upload-hero-image',
  templateUrl: 'upload-hero-image.component.html'
})
export class UploadHeroImageComponent extends ModalComponent implements AfterViewInit {
  public override form: any = {};

  constructor(
    private _uploadImageService: UploadImageService,
    private _cd: ChangeDetectorRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.imageUrl = this.form.image_url && getUrlImage(this.form.image_url)
  }

  submit() {
    const formData: FormData = new FormData()
    formData.append('image', this.file!)
    this.loading = true
    this._uploadImageService.save(formData).subscribe({
      next: res => {
        this.form.image_url = (res.data as UploadResponse).url
        this.saveData('Berhasil mengubah gambar')
      }
    }).add(() => {
      this.loading = false
    })
  }
}
