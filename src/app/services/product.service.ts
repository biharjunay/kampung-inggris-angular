import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable()
export class ProductService extends BaseService<any> {
  protected override endpoint = 'products';
}
