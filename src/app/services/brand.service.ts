import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Brand } from "@interfaces/brand.interface";

@Injectable()
export class BrandService extends BaseService<Brand> {
  protected override endpoint: string = 'brands';
}
