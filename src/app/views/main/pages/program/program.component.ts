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

  openUrlPrograms() {
    // if (this.data?.type.id === 1) window.open('https://registration.englishvillage.academy/register/page/983c21878a5f14f74053c99e76a8f58d55dbed70', '_blank')
    // else window.open('https://registration.englishvillage.academy/register/page/da206892db5f0d3a90daf864fe66769841c6a67e-online?utm_source=Google&utm_medium=Website&utm_campaign=Landingpage&utm_term=Kampung%20Inggris', '_blank')
    window.open(`https://api.whatsapp.com/send?phone=6282112333666&text=saya%20dapet%20info%20ini%20dari%20WE.Com,%20mau%20daftar%20program%20dong`)
  }
}
