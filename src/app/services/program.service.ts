import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Program } from "../interfaces/program.interface";

@Injectable()
export class ProgramService extends BaseService<Program> {
  protected override endpoint: string = 'programs';
}
