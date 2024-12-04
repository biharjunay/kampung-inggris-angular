import { Directive, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";
import { AlertService } from "@services/alert.service";

@Directive({
  selector: "[imgUpload]"
})
export class ImageUploaderDirective {
  constructor(private _alertService: AlertService) { }
  @Output() dropFiles: EventEmitter<any> = new EventEmitter();
  @HostBinding('style.background') backgroundColor = '';

  @HostListener('dragover', ['$event']) public dragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = '#ebebeb';
  }

  @HostListener('dragleave', ['$event']) public dragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = 'transparent';
  }

  @HostListener('drop', ['$event']) public drop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = 'transparent';

    let fileList = event.dataTransfer?.files;
    console.log(fileList)
    if (!fileList || fileList.length === 0) {
      console.error("No files found in the drop event.");
      this._alertService.error('Please drop an image file.');
      return;
    }

    const file = fileList[0];
    console.log("Dropped file: ", file);

    if (!file.type.startsWith('image/')) {
      console.error('Dropped file is not an image.');
      this._alertService.error('Please drop an image file.');
      return;
    }

    // Prepare the files object and emit
    let files = { file, url: window.URL.createObjectURL(file) };
    this.dropFiles.emit(files);
  }
}
