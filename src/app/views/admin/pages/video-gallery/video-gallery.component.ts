import { Component } from "@angular/core";
import { BaseComponent } from "@components/base.component";
import { VideoGallery } from "@interfaces/video-gallery.interface";
import { VideoGalleryService } from "@services/video-gallery.service";
import { VideoGalleryFormComponent } from "../modals/video-gallery-form/video-gallery-form.component";

@Component({
  selector: 'admin-video-gallery',
  templateUrl: 'video-gallery.component.html'
})
export class VideoGalleryComponent extends BaseComponent<VideoGallery> {
  constructor(
    private _videoGalleryService: VideoGalleryService
  ) {
    super()
    this.filter['page'] = 1
    this.model = _videoGalleryService

  }

  openLink(url: string): void {
    window.open(url, '_blank')
  }

  addVideoGallery() {
    this.modalService.show(VideoGalleryFormComponent, {
      class: 'modal-xl', initialState: { model: this._videoGalleryService, alertService: this.alertService }
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }

  editVideoGallery(item: VideoGallery) {
    this.modalService.show(VideoGalleryFormComponent, {
      class: 'modal-xl', initialState: { model: this._videoGalleryService, alertService: this.alertService, editMode: true, form: item }
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }
}
