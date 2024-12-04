import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { MainComponent } from "./main.component";
import { RouterOutlet } from "@angular/router";
import { MainRoutingModule } from "./main-routing.module";
import { HomeComponent } from "./pages/home/home.component";
import { ProgramComponent } from "./pages/program/program.component";
import { ArticleComponent } from "./pages/article/article.component";
import { ProductService } from "@services/product.service";
import { HeroService } from "@services/hero.service";
import { BrandService } from "@services/brand.service";
import { TestimonialService } from "@services/testimonial.service";
import { ArticleService } from "@services/article.service";
import { VideoGalleryService } from "@services/video-gallery.service";

@NgModule({
  imports: [
    MainRoutingModule,
    SharedModule,
    RouterOutlet,
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    ProgramComponent,
    ArticleComponent
  ],
  providers: [
    ProductService,
    HeroService,
    BrandService,
    TestimonialService,
    ArticleService,
    VideoGalleryService
  ]
})
export class MainModule { }
