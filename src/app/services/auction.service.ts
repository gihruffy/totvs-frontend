import { Injectable } from "@angular/core";
import {Observable, throwError} from "rxjs";
import {map, catchError, flatMap} from "rxjs/operators";
import { Auction } from "@app/models/auction";
import { BaseService } from "@app/services/base.service";
import { environment } from "@environments/environment"

@Injectable({
  providedIn: 'root'
})

export class AuctionService {

  private apiPath: string = "auction";
  constructor(private baseService: BaseService) {}

  getAuctions(): Observable<Auction[]> {
    return this.baseService.get<Auction[]>(environment.apiUrl, this.apiPath);
  }

  getAuctionById(id: number) : any {
    const url = `${this.apiPath}/${id}`;
    return this.baseService.get<Auction>(environment.apiUrl, url);
  }

  postAuction(auction: Auction) : any {
    return this.baseService.post<Auction>(environment.apiUrl, this.apiPath, auction);
  }

  putAuction(id: number, auction: Auction) : any {
    const url = `${this.apiPath}/${id}`;
    return this.baseService.put<Auction>(environment.apiUrl, url, auction);
  }

  deleteAuction(id: number) : any {
    const url = `${this.apiPath}/${id}`;
    return this.baseService.delete<Auction>(environment.apiUrl, url);
  }
}
