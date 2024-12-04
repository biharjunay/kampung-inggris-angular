import { NgModule } from "@angular/core";
import { RegisterFormRoutingModule } from "./register-form-routing.module";
import { RegisterFormComponent } from "./register-form.component";
import { SharedModule } from "@shared/shared.module";
import { ProgramService } from "@services/program.service";
import { HeroService } from "@services/hero.service";

@NgModule({
  imports: [
    RegisterFormRoutingModule,
    SharedModule
  ],
  declarations: [
    RegisterFormComponent
  ],
  providers: [
    ProgramService,
    HeroService
  ]
})
export class RegisterFormModule {}
