import { Injectable } from "@angular/core";
import { UploadResponse } from "../interfaces/interface";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class UploadImageService extends BaseService<UploadResponse, FormData> {
  protected override endpoint: string = 'upload-image';
}
