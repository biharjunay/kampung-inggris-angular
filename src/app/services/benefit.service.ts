import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Benefit } from "@interfaces/benefit.interface";

@Injectable({providedIn: 'root'})
export class BenefitService extends BaseService<Benefit> {
  protected override endpoint: string = 'benefits';
}
