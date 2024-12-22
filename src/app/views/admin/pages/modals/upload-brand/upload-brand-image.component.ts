import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { ModalComponent } from "@components/modal.component";
import { UploadResponse } from "@interfaces/interface";
import { UploadImageService } from "@services/upload-image.service";
import { getUrlImage } from "app/helpers/image-url";

@Component({
  selector: 'upload-brand-image',
  templateUrl: 'upload-brand-image.component.html',
})
export class UploadBrandImageComponent extends ModalComponent implements AfterViewInit {
  public override form: any = {}

  constructor(
    private _cd: ChangeDetectorRef,
    private _uploadImageService: UploadImageService
  ) {
    super()
  }

  ngAfterViewInit(): void {
    this.imageUrl = this.form.image_url && getUrlImage(this.form.image_url)
  }

  submit(): void {
    const formData: FormData = new FormData()
    formData.append('image', this.file)
    this.loading = true
    this._uploadImageService.save(formData).subscribe({
      next: res => {
        res.data
        const model$ = this.editMode ? this.model.update(this.form.id, { image_url: (res.data as UploadResponse).url }) : this.model.save({ image_url: (res.data as UploadResponse).url })
        model$.subscribe({
          next: res => {
            this.alertService.success('Sukses Menambah data')
            this.closeModal()
            this.event.emit(200)
          }
        }).add(() => {
          this.loading = false
        })
      }
    }).add(() => {
      this.loading = false
    })
  }


}
