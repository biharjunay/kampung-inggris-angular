import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { VideoGallery } from "@interfaces/video-gallery.interface";

@Injectable()
export class VideoGalleryService extends BaseService<VideoGallery> {
  protected override endpoint: string = 'video-galleries';
}
