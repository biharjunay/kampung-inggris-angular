import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { forkJoin } from "rxjs";
import { Router } from "@angular/router";
import { ProductService } from "@services/product.service";
import { HeroService } from "@services/hero.service";
import { BrandService } from "@services/brand.service";
import { Hero } from "@interfaces/hero.interface";
import { Product } from "@interfaces/product-interface";
import { Brand } from "@interfaces/brand.interface";
import { TestimonialService } from "@services/testimonial.service";
import { Testimonial } from "@interfaces/testimonial.interface";
import { DomSanitizer, Meta, Title } from "@angular/platform-browser";
import { VideoGalleryService } from "@services/video-gallery.service";
import { VideoGallery } from "@interfaces/video-gallery.interface";

@Component({
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('galleryCarouselContainer') public galleryCarouselContainer!: ElementRef<HTMLDivElement>
  public loading: boolean = false
  public heroData: Hero = {
    registration_image: {},
    header_image: {},
    about_image: {}
  }
  public brandData: Brand[] = []
  public onlineProgramData: Product[] = []
  public offlineProgramData: Product[] = []
  public testimonialData: Testimonial[] = []
  public videoGalleryData: VideoGallery[] = []

  public galleryCarousel: number = 0

  constructor(
    private _productService: ProductService,
    private _heroService: HeroService,
    private _brandService: BrandService,
    private _testimonialService: TestimonialService,
    private _videoGalleryService: VideoGalleryService,
    private _title: Title,
    private _meta: Meta,
    private _router: Router,
    private _sanitizer: DomSanitizer
  ) {
    _title.setTitle("WE Kampung Inggris")
    _meta.addTags([
      { name: 'description', content: 'WE Kampung Inggris' },
      { name: 'keywords', content: 'WE Kampung Inggris, kampung inggris, pare' },
      { name: 'author', content: 'WE Kampung Inggris' },
    ])
  }

  ngOnInit(): void {
    this.loadData()
    this.loadHome()
    this.loadTestimonials()
    this.loadVideoGalleries()
  }

  loadHome(): void {
    this._heroService.getData().subscribe(res => this.heroData = res.data as Hero)
    this._brandService.getData().subscribe(res => this.brandData = res.data as Brand[])
  }

  loadData() {
    this.loading = true
    forkJoin([this._productService.getData({ type: 1 }), this._productService.getData({ type: 2 })]).subscribe({
      next: res => {
        this.offlineProgramData = res[0].data
        this.onlineProgramData = res[1].data
      }
    }).add(() => {
      this.loading = false
    })
  }

  loadTestimonials(): void {
    this._testimonialService.getData().subscribe({
      next: res => {
        this.testimonialData = res.data as Testimonial[]
      }
    })
  }

  loadVideoGalleries(): void {
    this._videoGalleryService.getData().subscribe(res => {
      this.videoGalleryData = res.data as VideoGallery[]
      // this.scrollGalleryCarousel()
    })
  }

  scrollCarousel(direction: boolean, element: HTMLDivElement) {
    /**
     * direction true for right and false for left
     */
    const scrollStep: number = element.clientWidth
    element.scrollBy({ left: direction ? scrollStep : -scrollStep, behavior: 'smooth' })
  }

  scrollGalleryCarousel(direction: boolean) {
    if (direction) {
      if (this.galleryCarousel === this.videoGalleryData.length - 1) this.galleryCarousel = 0
      else this.galleryCarousel++
    }
    else {
      if (this.galleryCarousel === 0) this.galleryCarousel = this.videoGalleryData.length - 1
      else this.galleryCarousel--
    }
    this.galleryCarouselContainer.nativeElement.style.transform = `translateX(${this.galleryCarousel * -100}%)`
    // setInterval(() => {
    //   if (this.galleryCarousel === this.videoGalleryData.length - 1) this.galleryCarousel = 0
    //   else this.galleryCarousel++
    //   this.galleryCarouselContainer.nativeElement.style.transform = `translateX(${this.galleryCarousel * -100}%)`
    // }, 3000);
  }

  getVideoURL(url:string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  seeDetail(args: any) {
    this._router.navigate([`/program/${args.id}`])
  }

  openUrl(url: string): void {
    window.open(url, '_blank')
  }

  createArrayStars(num: number): number[] {
    return Array.from({length: num}, (_, i) => i)
  }

}
