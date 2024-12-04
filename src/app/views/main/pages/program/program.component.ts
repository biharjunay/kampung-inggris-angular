import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { Product, ProductDetail } from "@interfaces/product-interface";
import { ProductService } from "@services/product.service";

@Component({
  selector: 'program-page',
  templateUrl: 'program.component.html',
  styleUrl: 'program.component.scss'
})
export class ProgramComponent implements OnInit {
  public id: number
  public data: ProductDetail | null = null
  public productData: Product[] = []
  public loading: boolean = false
  public productLoading: boolean = false

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _viewportScroller: ViewportScroller,
    private _router: Router,
  ) {
    this.id = _activatedRoute.snapshot.params["id"]
  }

  ngOnInit(): void {
    this.loading = true
    this.productLoading = true
    this._productService.getDetail(this.id).subscribe({
      next: (res: any) => {
        this.data = res['data']
        this.loadProduct()
      }
    }).add(() => {
      this.loading = false
    })
  }

  loadProduct(): void {
    this._productService.getData({ type: this.data?.type.id }).subscribe({
      next: (res): void => {
        this.productData = res.data
      }
    }).add(() => {
      this.productLoading = false
    })
  }

  async seeDetail(args: any) {
    const url = this._router.url.match(/^\/[^\/]+\/?/)![0]
    await this._router.navigateByUrl('/home', { skipLocationChange: true })
    this._router.navigate([url + args.id], {replaceUrl: true});
    this._viewportScroller.scrollToPosition([0, 0]);
  }

  scrollCarousel(direction: boolean, element: HTMLDivElement) {
    /**
     * direction true for right and false for left
     */
    const scrollStep: number = element.offsetWidth
    element.scrollBy({left: direction ? scrollStep : -scrollStep, behavior: 'smooth'})
  }
}
