import { Component, OnInit } from '@angular/core';
import { AuctionService } from '@app/services/auction.service';
import {Auction} from 'src/app/models/auction';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  constructor(private auctionService: AuctionService) { }
  public auctionList: Auction[] = [];

  ngOnInit(): void {
    this.getAuctions();
  }


  getAuctions() {
    this.auctionService.getAuctions().subscribe((auctions) => {
      this.auctionList = auctions;
    });
  }

  deleteAuction(auction: Auction) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover auction!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.auctionService.deleteAuction(auction.id).subscribe(
          (res) => {
            this.auctionList = this.auctionList.filter((item) => item.id !== auction.id);
            Swal.fire(
              'Deleted!',
              'This auction has been deleted.',
              'success'
            )
          },
          (error) => {
            Swal.fire(
              'Error',
              error.message,
              'error'
            )
          }
        );
      }
    })
  }


}
