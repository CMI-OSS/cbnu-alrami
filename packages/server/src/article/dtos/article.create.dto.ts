export class ArticleCreateDto {
  title: string;
  content: string;
  url: string;
  date!: string;
  images!: number[];
}
