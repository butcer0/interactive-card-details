import { inject, Injectable } from '@angular/core';
import { PlayerDataModel } from "../models/player-data.model";
import * as TT2Data from '../common/tt2.constants';
import { firstValueFrom, lastValueFrom, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class MockHttpService {
  // private http = inject(HttpClient);
  constructor() { }

  getPlayerData(): Promise<PlayerDataModel> {
    return firstValueFrom(of(TT2Data.MockPlayerData));
  }

  // async getRandomPost(): Promise<Post> {
  //   return await lastValueFrom(this.http.get<Post>('https://jsonplaceholder.typicode.com/posts\n'));
  // }
}
