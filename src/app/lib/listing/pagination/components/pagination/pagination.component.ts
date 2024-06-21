import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, inject } from '@angular/core';
import type { IPagination, IPaginationSettings } from "../../types/IPagination";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  host: {
    class: 'pagination'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements IPagination {
  route = inject(ActivatedRoute);
  router = inject(Router);
  cd = inject(ChangeDetectorRef);

  totalResults = 0;
  totalPages = 0;
  clipPages = 0;
  rpp = 6;


  protected _page = 1;
  get page() {
    return +this.route.snapshot.queryParams['page'] || this._page;
  }
  set page(value: number) {
    this._page = value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: value}
    })
  }

  @Output() onPageChanged = new EventEmitter<number>();

  constructor() {
    this.changePage(+this.route.snapshot.queryParams?.['page'] || 1)
  }

  goToPrevPage() {
    if(this.page > 1) {
      this.changePage(this.page - 1);
    }
  }

  goToNextPage() {
    // to make sure the next page exist, may be page is equal 1 and totalPages is 1 also
    if(this.page + 1 <= this.totalPages) {
      this.changePage(this.page + 1);
    }
  }

  changePage(page: number) {
    this.page = page;
    this.onPageChanged.emit(page);
  }

  setPagination(settings: IPaginationSettings) {
    this.totalPages = settings.totalPages;
    this.totalResults = settings.totalItems;
    this.rpp = settings.rpp;
    /**
     * page: 2, +0 => 10 - ((10 - 2) / 2) => 10 - 4 = 6 => 1,2,3,6,10
     * page: 2, +1 => 10 - ((10 - 3) / 2) => 10 - 3.5 = 6.5 => 1,2,3,7,10
     * page: 2, +2 => 10 - ((10-4) / 2) => 10- 6/2 => 10 - 3 => 7 =>1,2,3,7,10
     * page: 2, +3 => 10 - ((10-5) / 2) => 10- 5/2 => 10 - 2.5 => 7.5 => 1,2,3,8,10
     * page: 2, +4 => 10 - ((10-6) / 2) => 10- 4/2 => 10 - 2 => 8 => 1,2,3,8,10
     * page: 2, +5 => 10 - ((10-7) / 2) => 10- 3/2 => 10 - 1.5 => 8.5 => 1,2,3,9,10
     */
    this.clipPages = Math.ceil(
      this.totalPages - (this.totalPages - (this.page + 1)) / 2
    );
    this.cd.markForCheck();
  }

  getCurrentPage() {
    return this.page;
  }

  goToFirstPage(){
    if(this.page > 1){
      this.changePage( 1);
    }
  }

  goToLastPage(){
    if(this.page < this.totalPages){
      this.changePage(this.totalPages);
    }
  }
}
