import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [PagesRoutingModule, SharedModule],
  declarations: [LoginComponent]
})
export class PagesModule {}
