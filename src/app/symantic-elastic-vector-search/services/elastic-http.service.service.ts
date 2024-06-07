import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { ElasticResultModel } from "../models/elastic-result.model";
import { EncodingService } from "./encoding.service.service";
import { ElasticResultMock } from "../mocks/elastic-result.mock";

@Injectable({
  providedIn: 'root'
})
export class ElasticHttpService {
  private elasticResults$: BehaviorSubject<ElasticResultModel[]> = new BehaviorSubject<ElasticResultModel[]>([]);
  private baseUrl = 'https://localhost:9200'; // Update with actual URL if different
  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('elastic:password'), // Externalize this sensitive information
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private encodingService: EncodingService) { }

  getElasticResults(): Observable<ElasticResultModel[]> {
    return this.elasticResults$.asObservable();
  }

  querySemanticElasticMock(query: string): void {
    this.elasticResults$.next(ElasticResultMock);
  }

  querySemanticElastic(query: string): void {
    from(this.encodingService.encodeText(query)).pipe(
      switchMap(queryVector => this.http.post<any>(
        `${this.baseUrl}/all_products/_knn_search`,
        {
          field: "DescriptionVector",
          query_vector: queryVector,
          k: 2,
          num_candidates: 500
        },
        { headers: this.headers }
      )),
      catchError(error => {
        console.error('Error making Elasticsearch query:', error);
        return throwError(() => new Error('Error in Elasticsearch query'));
      })
    ).subscribe(response => {
      const hits: ElasticResultModel[] = response.hits.hits.map((hit: any) => ({
        ProductID: hit._source.ProductID,
        ProductName: hit._source.ProductName,
        ProductBrand: hit._source.ProductBrand,
        Gender: hit._source.Gender,
        Price_INR: hit._source.Price_INR,
        NumImages: hit._source.NumImages,
        Description: hit._source.Description,
        PrimaryColor: hit._source.PrimaryColor,
        DescriptionVector: hit._source.DescriptionVector
      }));
      this.elasticResults$.next(hits);
    });
  }
}
