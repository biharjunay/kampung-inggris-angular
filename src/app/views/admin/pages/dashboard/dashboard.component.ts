import { Component } from "@angular/core";
import { BaseComponent } from "@components/base.component";
import { Hero } from "@interfaces/hero.interface";
import { Brand } from "@interfaces/brand.interface";
import { HeroService } from "@services/hero.service";
import { BrandService } from "@services/brand.service";
import { Response } from "@interfaces/interface";
import { UploadHeroImageComponent } from "../modals/upload-hero/upload-hero-image.component";
import { UploadBrandImageComponent } from "../modals/upload-brand/upload-brand-image.component";

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrl: 'dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent {
  public manyLoading = {
    heroLoading: false,
    brandLoading: false
  };

  public datas: { heroData: Partial<Hero>, brandData: Partial<Brand[]> } = {
    heroData: {},
    brandData: []
  }

  constructor(
    private _heroService: HeroService,
    private _brandService: BrandService
  ) {
    super()
  }

  get heroKeys() {
    return Object.keys(this.datas.heroData) as (keyof Hero)[]
  }

  public override loadDependencies(): void {
    this.loadHeroData()
    this.loadBrandData()
  }

  loadHeroData() {
    this.manyLoading.heroLoading = true
    this._heroService.getData().subscribe({
      next: (res: any) => {
        this.datas.heroData = res.data
      }
    }).add(() => {
      this.manyLoading.heroLoading = false
    })
  }

  loadBrandData() {
    this.manyLoading.brandLoading = true
    this._brandService.getData().subscribe({
      next: (res: Response<any>) => {
        this.datas.brandData = res.data
      }
    }).add(() => {
      this.manyLoading.brandLoading = false
    })
  }

  addBrandImage() {
    this.modalService.show(UploadBrandImageComponent, {
      initialState: { model: this._brandService, alertService: this.alertService }, class: 'modal-lg'
    }).content?.event.subscribe(res => res === 200 && this.loadDependencies())
  }

  editBrandImage(item: Brand) {
    this.modalService.show(UploadBrandImageComponent, {
      initialState: { model: this._brandService, editMode: true, alertService: this.alertService, form: item }, class: 'modal-lg'
    }).content?.event.subscribe(res => res === 200 && this.loadDependencies())
  }

  editHeroImage(item: any, key: string): void {
    this.modalService.show(UploadHeroImageComponent, {
      class: 'modal-lg', initialState: { model: this._heroService, form: { key, image_url: item }, alertService: this.alertService }
    }).content?.event.subscribe(res => res === 200 && this.loadDependencies())
  }

  async deleteBrandImage(id: string | number) {
    const response = await this.alertService.confirm('Anda yakin ingin menghapus ini?')
    if (!response) return
    this._brandService.delete(id).subscribe({
      next: res => {
        this.alertService.success("Sukses Menghapus data")
        this.loadDependencies()
      }
    })
  }
}
