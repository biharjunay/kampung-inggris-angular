import { AfterViewInit, Component } from "@angular/core";
import { ModalComponent } from "@components/modal.component";
import { UploadResponse } from "@interfaces/interface";
import { HeroService } from "@services/hero.service";
import { UploadImageService } from "@services/upload-image.service";
import { getUrlImage } from "app/helpers/image-url";

@Component({
  selector: 'why-we-form',
  templateUrl: 'why-we-form.component.html'
})
export class WhyWeFormComponent extends ModalComponent implements AfterViewInit {
  constructor(
    private _heroService: HeroService,
    private _uploadImageService: UploadImageService
  ) {
    super()
    this.model = _heroService
  }

  ngAfterViewInit(): void {
    this.imageUrl = this.form.image_url && getUrlImage(this.form.image_url)
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
