import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auctionHasEnded'
})
export class AuctionHasEnded implements PipeTransform {
  transform(endDate: string): string {
    let date = new Date(endDate);
    let timestamp = date.getTime();
    return (timestamp < new Date().getTime()) ? "No" : "Yes";
  }
}
