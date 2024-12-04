import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Hero } from "@interfaces/hero.interface";
import { Program } from "@interfaces/program.interface";
import { HeroService } from "@services/hero.service";
import { ProgramService } from "@services/program.service";

@Component({
  templateUrl: 'register-form.component.html',
  styleUrl: 'register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    program: new FormControl(null, Validators.required),
    information: new FormControl('Saya mau tanya program English Master dong', Validators.required)
  })
  public programData: Program[] = []
  public heroData: Hero = {
    registration_image: "",
    header_image: "",
    about_image: ""
  }

  constructor(
    private _programService: ProgramService,
    private _heroService: HeroService,
  ) { }

  get name() { return this.form.get('name') }
  get phone() { return this.form.get('phone') }
  get program() { return this.form.get('program') }
  get information() { return this.form.get('information') }


  ngOnInit(): void {
    this._heroService.getData().subscribe(res => this.heroData = res.data as Hero)
    this._programService.getData().subscribe(res => this.programData = res.data as Program[])
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (!this.form.valid) return
    const text = `
      Name: ${this.name?.value} \n
      Nomor Whatsapp: ${this.phone?.value} \n
      Program: ${this.program?.value} \n
      Information: ${this.information?.value} \n
    `
    window.open(`https://wa.me/6282112333666?text=${encodeURI(text)}`)
  }
}
