import { Component } from "@angular/core";
import { ModalComponent } from "@components/modal.component";
import { UploadResponse } from "@interfaces/interface";
import { UploadImageService } from "@services/upload-image.service";

@Component({
  selector: 'admin-video-gallery',
  templateUrl: 'video-gallery-form.component.html'
})
export class VideoGalleryFormComponent extends ModalComponent {
  constructor(
    private _uploadImageService: UploadImageService
  ) {
    super()
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
        this.form.thumbnail_url = (res.data as UploadResponse).url
        this.saveData()
      }
    }).add(() => {
      this.loading = false
    })
  }
}
