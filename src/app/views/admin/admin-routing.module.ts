import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ProductComponent } from "./pages/product/product.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { BenefitComponent } from "./pages/benefit/benefit.component";
import { TestimonialComponent } from "./pages/product-detail/testimonial/testimonial.component";
import { ArticleComponent } from "./pages/article/article.component";
import { VideoGalleryComponent } from "./pages/video-gallery/video-gallery.component";
import { UserComponent } from "./pages/user/user.component";
import { roleGuard } from "app/guards/role.guard";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { roles: ['admin', 'superadmin'] },
        canActivate: [roleGuard],
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductComponent,
            data: { roles: ['admin', 'superadmin'] },
            canActivate: [roleGuard],
          },
          {
            path: ':id',
            component: ProductDetailComponent,
            data: { roles: ['admin', 'superadmin'] },
            canActivate: [roleGuard],
          }
        ]
      },
      {
        path: 'benefits',
        component: BenefitComponent,
        data: { roles: ['admin', 'superadmin'] },
        canActivate: [roleGuard],
      },
      {
        path: 'testimonials',
        component: TestimonialComponent,
        data: { roles: ['admin', 'superadmin'] },
        canActivate: [roleGuard],
      },
      {
        path: 'articles',
        component: ArticleComponent,
        data: { roles: ['admin', 'superadmin'] },
        canActivate: [roleGuard],
      },
      {
        path: 'video-gallery',
        component: VideoGalleryComponent,
        data: { roles: ['admin', 'superadmin'] },
        canActivate: [roleGuard],
      },
      {
        path: 'users',
        component: UserComponent,
        data: { roles: ['superadmin'] },
        canActivate: [roleGuard],
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
