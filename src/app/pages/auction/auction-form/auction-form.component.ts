
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Auction } from '@app/models/auction';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '@app/services/auction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/services/authentication.service';
import { CurrentActionEnum } from "@app/enums/current-action.enum";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.css']
})
export class AuctionFormComponent implements OnInit, AfterContentChecked {

  auction: Auction = new Auction();
  title: string = 'New Auction';
  submitted = false;
  auctionForm: FormGroup;
  loading: boolean = false;
  currentAction: CurrentActionEnum = CurrentActionEnum.New;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auctionService: AuctionService,
    private authenticationService: AuthenticationService,
    public fb: FormBuilder,
  ) {

  }


  ngOnInit(): void {
    this.buildForm();
    this.checkCurrentAction();
    this.loadResource();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  buildForm() {
    this.auctionForm = this.fb.group({
      name: ['', [Validators.required]],
      initialValue: ['', [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })
  }

  get f() {return this.auctionForm.controls;}

  toggleVisibility(e){
    this.auction.used = e.target.checked;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (!this.auctionForm.valid) return false;

    try {
      if(this.currentAction == CurrentActionEnum.New)
        this.saveAuction();
      else
        this.editAuction();

    }finally {
      this.loading = false;
    }
  }

  protected setPageTitle() {
    if (this.currentAction == CurrentActionEnum.New)
      this.title = this.creationPageTitle();
    else{
      this.title = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string{
    return "New"
  }

  protected editionPageTitle(): string{
    return "Edit"
  }

  protected successMessage(name: string) {
    Swal.fire("Success", `Saved ${name} with success`, 'success');
  }

  protected errorMessage(error: string) {
    Swal.fire("Error", error, 'error');
  }

  protected getIdParam () { return this.activatedRoute.snapshot.paramMap.get('id')}

  protected checkCurrentAction() {
    const id = this.getIdParam();
    if(id) {
      this.currentAction = CurrentActionEnum.Edit
    }else{
      this.currentAction = CurrentActionEnum.New
    }
  }
  protected prepareData() {
    this.auction.userId = this.authenticationService.localStorageUser.id;
    this.auction.initialValue = parseFloat(this.auction.initialValue.toString());
    this.auction.used = this.auction.used ?? false;
    console.log(this.auction.used);
  }

  protected loadResource() {
    if(this.currentAction == CurrentActionEnum.Edit) {
      const id = parseInt(this.getIdParam());
      this.auctionService.getAuctionById(id).subscribe(auction => {
        this.auction = auction;
      });
    }
  }

  protected saveAuction() {
    this.prepareData();
    this.auctionService.postAuction(this.auction).subscribe(
      (auction) => {
      this.router.navigate(['']);
      },
      (error) => {this.errorMessage(error.message)});
  }

  protected editAuction() {
    const id = parseInt(this.getIdParam());
    this.auctionService.putAuction(id, this.auction).subscribe(
      (auction) => {
      this.successMessage(auction.name);
      this.router.navigate(['']);
    },
    (error) => {this.errorMessage(error.message)});
  }


}
