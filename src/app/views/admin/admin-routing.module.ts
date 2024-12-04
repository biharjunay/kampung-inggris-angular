import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ProductComponent } from "./pages/product/product.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { BenefitComponent } from "./pages/benefit/benefit.component";
import { TestimonialComponent } from "./pages/testimonial/testimonial.component";
import { ArticleComponent } from "./pages/article/article.component";
import { VideoGalleryComponent } from "./pages/video-gallery/video-gallery.component";
import { UserComponent } from "./pages/user/user.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductComponent
          },
          {
            path: ':id',
            component: ProductDetailComponent
          }
        ]
      },
      {
        path: 'benefits',
        component: BenefitComponent
      },
      {
        path: 'testimonials',
        component: TestimonialComponent
      },
      {
        path: 'articles',
        component: ArticleComponent
      },
      {
        path: 'video-gallery',
        component: VideoGalleryComponent
      },
      {
        path: 'users',
        component: UserComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
