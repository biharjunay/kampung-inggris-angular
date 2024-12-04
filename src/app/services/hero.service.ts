import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Hero } from "../interfaces/hero.interface";

@Injectable()
export class HeroService extends BaseService<Hero> {
  protected override endpoint: string = 'hero';
}
