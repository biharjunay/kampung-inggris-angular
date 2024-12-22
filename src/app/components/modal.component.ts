import { EventEmitter, inject } from "@angular/core";
import { AlertService } from "@services/alert.service";
import { BaseService } from "@services/base.service";
import { BsModalRef } from "ngx-bootstrap/modal";

export abstract class ModalComponent {
  public event: EventEmitter<any> = new EventEmitter()
  protected modalRef: BsModalRef = inject(BsModalRef)

  public alertService: AlertService = inject(AlertService)

  public data: any = {}
  public form: any = {}
  public file!: File
  public model!: BaseService<any>
  public loading: boolean = false
  public editMode!: boolean
  public imageUrl!: string

  closeModal(): void {
    this.modalRef.hide()
  }

  handleDropImage(event: { file: File, url: string }): void {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];

    if (!event.file || !validImageTypes.includes(event.file.type)) {
      console.error('The uploaded file is not a valid image.');
      this.alertService.error('File harus berupa gambar')
      throw new Error('Invalid file type. Please upload an image file.');
    }

    this.imageUrl = event.url
    this.file = event.file
  }

  handleImageInput(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.alertService.error('Mohon masukkan gambar')
      } else {
        this.file = file
        this.imageUrl = URL.createObjectURL(file)
      }
    }
  }

  saveData(successMessage: string = `Sukses ${this.editMode ? 'mengubah' : 'menambahkan'} data`): void {
    this.loading = true
    const model$ = this.editMode ? this.model.update(this.form.id, this.form) : this.model.save(this.form)
    model$.subscribe({
      next: res => {
        this.event.emit(200)
        this.alertService.success(successMessage)
        this.closeModal()
      },
    }).add(() => {
      this.loading = false
    })
  }

}
