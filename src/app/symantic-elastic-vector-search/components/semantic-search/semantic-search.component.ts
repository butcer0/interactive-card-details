import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DecimalPipe, NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { ElasticResultModel } from "../../models/elastic-result.model";
import { ElasticHttpService } from "../../services/elastic-http.service.service";

@Component({
  selector: 'app-semantic-search',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    NgForOf,
    NgIf,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './semantic-search.component.html',
  styleUrl: './semantic-search.component.css'
})
export class SemanticSearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults$: Observable<ElasticResultModel[]> = new Observable<ElasticResultModel[]>();

  constructor(private elasticHttpService: ElasticHttpService) {
  }

  ngOnInit(): void {
    this.searchResults$ = this.elasticHttpService.getElasticResults();
  }


  performSearch() {
    // this.elasticHttpService.querySemanticElastic(this.searchQuery);
    this.elasticHttpService.querySemanticElasticMock(this.searchQuery);
  }
}
