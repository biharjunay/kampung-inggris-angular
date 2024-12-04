import { Injectable } from "@angular/core";
import environment from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UploadResponse } from "../interfaces/interface";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class UploadImageService extends BaseService<UploadResponse, FormData> {
  protected override endpoint: string = 'upload-image';
}
