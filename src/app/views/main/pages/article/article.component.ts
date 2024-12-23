import { ViewportScroller } from "@angular/common";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Article } from "@interfaces/article.interface";
import { ArticleService } from "@services/article.service";

@Component({
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrl: 'article.component.scss'
})
export class ArticleComponent implements OnInit {
  public loading = false
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLDivElement>
  public articleData: Article[] = []
  public articleDetail: Article | null = null

  constructor(
    private _articleService: ArticleService,
    private _viewportScroller: ViewportScroller,
    private _title: Title,
    private _meta: Meta,
    private _renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loading = true
    this._articleService.getData().subscribe({
      next: res => {
        this.articleData = res.data as Article[]
        this.articleDetail = (res.data as Article[])[0]
        this.updateSeoTags()
      }
    }).add(() => {
      this.loading = false
    })
  }

  selectArticle(item: Article) {
    this.articleDetail = this.articleData.find(el => el.id === item.id)!
    this._viewportScroller.scrollToPosition([0, 0]);
  }

  scrollCarousel(direction: boolean): void {
    /**
     * direction true for right and false for left
     */
    const scrollStep: number = this.carouselContainer.nativeElement.clientWidth
    this.carouselContainer.nativeElement.scrollBy({ left: direction ? scrollStep : -scrollStep, behavior: 'smooth' })
  }

  updateSeoTags() {
    this._title.setTitle(this.articleDetail!.title)
    this._meta.addTag({
      name: "description",
      content: this.articleDetail!.content,
    })
    this._meta.addTag({
      property: "og:title",
      content: this.articleDetail!.title,
    })

    this._meta.addTag({
      property: "og:description",
      content: this.articleDetail!.content,
    })

    this._meta.addTag({
      property: "og:type",
      content: "articleDetail!",
    })

    this._meta.addTag({
      property: "og:image",
      content: this.articleDetail!.image_url
    })

    this._meta.addTag({
      property: "og:url",
      // content: this.articleDetail!.canonicalUrl,
    })

    this._meta.addTag({
      property: "articleDetail!:published_time",
      content: new Date(this.articleDetail!.created_at).toISOString(),
    })

    this._meta.addTag({
      property: "articleDetail!:author",
      content: "Author name",
    })

    /** Twitter Card meta tags **/
    this._meta.addTag({
      name: "twitter:card",
      content: "summary_large_image",
    })

    this._meta.addTag({
      name: "twitter:site",
      content: "@YourTwitterHandle",
    })

    this._meta.addTag({
      name: "twitter:creator",
      content: "@YourTwitterHandle",
    })

    this._meta.addTag({
      name: "twitter:title",
      content: this.articleDetail!.title,
    })
    this._meta.addTag({
      name: "twitter:description",
      content: this.articleDetail!.content,
    })
    this._meta.addTag({
      name: "twitter:image",
      content: this.articleDetail!.content,
    })
    this._meta.addTag({
      name: "twitter:image:alt",
      content: this.articleDetail!.title,
    })
  }

  addStructuredData() {
    const script = this._renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = `
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "WE English Article",
      "url": "https://your-angular-app.com",
      "logo": "https://your-angular-app.com/logo.png",
      "description": "Learn more about us at Your Angular App."
    }`;
    this._renderer.appendChild(document.head, script);
  }
}
