import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { COMPONENTS } from "../components/components";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { RupiahPipe } from "../pipe/rupiah.pipe";
import { BsModalService } from "ngx-bootstrap/modal";
import { AlertService } from "../services/alert.service";
import { ImageUrlPipe } from "../pipe/image-url.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageUploaderDirective } from "app/directives/image-uploader.directive";
import { NgxPaginationModule } from "ngx-pagination";
import { PopoverModule } from "ngx-bootstrap/popover";

const EXPORTED_MODULES = [
  NgSelectModule,
  CommonModule,
  FormsModule,
  NgxSkeletonLoaderModule,
  ReactiveFormsModule,
  NgxPaginationModule,
  PopoverModule
]

const EXPORTED_DECLARATIONS = [
  RupiahPipe,
  ImageUrlPipe,
  ImageUploaderDirective
]

@NgModule({
  imports: [
    ...EXPORTED_MODULES
  ],
  declarations: [
    ...COMPONENTS,
    ...EXPORTED_DECLARATIONS,
  ],
  exports: [
    ...COMPONENTS,
    ...EXPORTED_MODULES,
    ...EXPORTED_DECLARATIONS,
  ],
  providers: [
  ]
})
export class SharedModule { }
