import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Article } from "@interfaces/article.interface";

@Injectable()
export class ArticleService extends BaseService<Article> {
  protected override endpoint: string = 'articles'
}
