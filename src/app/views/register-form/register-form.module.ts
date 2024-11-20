import { NgModule } from "@angular/core";
import { RegisterFormRoutingModule } from "./register-form-routing.module";
import { RegisterFormComponent } from "./register-form.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [RegisterFormRoutingModule, SharedModule],
  declarations: [RegisterFormComponent]
})
export class RegisterFormModule {}
