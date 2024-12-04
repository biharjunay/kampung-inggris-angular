import { Component } from "@angular/core";
import { BaseComponent } from "@components/base.component";
import { ArticleService } from "@services/article.service";
import { ArticleFormComponent } from "../modals/article-form/article-form.component";
import { Article } from "@interfaces/article.interface";

@Component({
  selector: 'admin-article',
  templateUrl: 'article.component.html'
})
export class ArticleComponent extends BaseComponent {
  constructor(
    private _articleService: ArticleService
  ) {
    super()
    this.filter['page'] = 1
    this.model = _articleService
  }

  openLink(url: string): void {
    window.open(url, '_blank')
  }

  addArticle() {
    this.modalService.show(ArticleFormComponent, {
      class: 'modal-xl', initialState: { model: this._articleService, alertService: this.alertService }
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }

  editArticle(item: Article) {
    this.modalService.show(ArticleFormComponent, {
      class: 'modal-xl', initialState: { model: this._articleService, alertService: this.alertService, form: item, editMode: true }
    }).content?.event.subscribe(res => res === 200 && this.loadData())
  }
}
