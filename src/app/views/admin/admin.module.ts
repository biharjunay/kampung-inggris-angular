import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { UploadHeroImageComponent } from "./pages/modals/upload-hero/upload-hero-image.component";
import { SharedModule } from "@shared/shared.module";
import { HeroService } from "@services/hero.service";
import { BrandService } from "@services/brand.service";
import { UploadBrandImageComponent } from "./pages/modals/upload-brand/upload-brand-image.component";
import { AlertService } from "@services/alert.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { ProductComponent } from "./pages/product/product.component";
import { ProductService } from "@services/product.service";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { BenefitService } from "@services/benefit.service";
import { ProgramService } from "@services/program.service";
import { ProgramFormComponent } from "./pages/modals/program-form/program-form.component";
import { ProductFormComponent } from "./pages/modals/product-form/product-form.component";
import { BenefitComponent } from "./pages/benefit/benefit.component";
import { BenefitFormComponent } from "./pages/modals/benefit-form/benefit-form.component";
import { TestimonialComponent } from "./pages/testimonial/testimonial.component";
import { TestimonialService } from "@services/testimonial.service";
import { TestimonialFormComponent } from "./pages/modals/testimonial-form/testimonial-form.component";
import { ArticleComponent } from "./pages/article/article.component";
import { ArticleService } from "@services/article.service";
import { ArticleFormComponent } from "./pages/modals/article-form/article-form.component";
import { VideoGalleryComponent } from "./pages/video-gallery/video-gallery.component";
import { VideoGalleryService } from "@services/video-gallery.service";
import { VideoGalleryFormComponent } from "./pages/modals/video-gallery-form/video-gallery-form.component";
import { UserService } from "@services/user.service";
import { UserComponent } from "./pages/user/user.component";
import { UserFormComponent } from "./pages/modals/user-form/user-form.component";

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProductComponent,
    ProductDetailComponent,
    UploadHeroImageComponent,
    UploadBrandImageComponent,
    ProgramFormComponent,
    ProductFormComponent,
    BenefitComponent,
    BenefitFormComponent,
    TestimonialComponent,
    TestimonialFormComponent,
    ArticleComponent,
    ArticleFormComponent,
    VideoGalleryComponent,
    VideoGalleryFormComponent,
    UserComponent,
    UserFormComponent
  ],
  providers: [
    HeroService,
    BrandService,
    AlertService,
    BsModalService,
    ProductService,
    BenefitService,
    ProgramService,
    TestimonialService,
    ArticleService,
    VideoGalleryService,
    UserService
  ]
})
export class AdminModule {}
