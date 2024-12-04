import { Directive, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { BsModalService } from "ngx-bootstrap/modal";
import { HttpErrorResponse } from "@angular/common/http";
import { BaseService } from "@services/base.service";
import { AlertService } from "@services/alert.service";
import { PreviewImageComponent } from "./preview-image/preview-image.component";
import { Response } from "@interfaces/interface";

@Directive()
export abstract class BaseComponent<T = any, S extends BaseService<T> = BaseService<T>> implements OnInit {
  public isDetail!: boolean

  public loading: boolean = false
  public form: { [key: string]: string | number | boolean } = {}
  public filter: { [key: string]: string | number | boolean } = {}
  public data: T[] = []
  public singleData: Partial<T> = {}
  public id!: number | string
  public pagination = {
    current_page: 0,
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: "",
    links: [],
    next_page_url: "",
    path: "",
    per_page: 0,
    prev_page_url: "",
    to: 0,
    total: 0
  }

  protected router: Router = inject(Router)
  protected location: Location = inject(Location)
  protected alertService: AlertService = inject(AlertService)
  protected modalService: BsModalService = inject(BsModalService)

  protected model!: S

  public ngOnInit(): void {
    this.loadDependencies()
    this.loadData()
  }

  public loadDependencies() { }

  public loadData(page?: number) {
    if (page) this.filter['page'] = page
    if (!this.model) return
    this.loading = true
    const model$ = this.isDetail ? this.model.getDetail(this.id, this.filter) : this.model.getData(this.filter)
    model$.subscribe({
      next: res => {
        if (this.isDetail) this.singleData = res.data as T
        else this.data = res.data as T[]
        this.executePagination(res)
      },
    }).add(() => {
      this.loading = false
    })
  }

  public async deleteData(item: any): Promise<void> {
    const response = await this.alertService.confirm('Anda yakin ingin menghapus data ini?')
    if (!response) return
    this.model.delete(item.id).subscribe({
      next: res => {
        this.afterDelete()
        this.alertService.success('Sukses menghapus data')
      }
    })
  }

  public afterDelete() {
    this.loadData()
  }

  private executePagination(res: Response<any>): void {
    this.pagination = {
      current_page: res.current_page ?? '',
      path: res.path ?? '',
      first_page_url: res.first_page_url ?? '',
      from: res.from ?? 0,
      last_page: res.last_page ?? 0,
      to: res.to ?? 0,
      total: res.total ?? 0,
      last_page_url: res.last_page_url ?? '',
      links: res.links as any ?? [],
      next_page_url: res.next_page_url ?? '',
      per_page: res.per_page ?? 0,
      prev_page_url: res.prev_page_url ?? ''
    }
  }

  public previewImage(url: string): void {
    this.modalService.show(PreviewImageComponent, {
      class: 'modal-xl', initialState: { imageUrl: url }
    })
  }

  protected back() {
    this.location.back()
  }
}
