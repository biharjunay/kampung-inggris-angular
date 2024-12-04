import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Testimonial } from "@interfaces/testimonial.interface";

@Injectable()
export class TestimonialService extends BaseService<Testimonial> {
  protected override endpoint: string = 'testimonials';
}
