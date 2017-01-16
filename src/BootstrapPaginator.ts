import {Component, Input, OnChanges, Optional} from "@angular/core";
import {DataTable, PageEvent} from "./DataTable";
import * as _ from "lodash";

@Component({
    selector: "mfBootstrapPaginator",
    template: `
        <nav class="pagination" *ngIf="dataLength > rowsOnPage">
            <li [class.disabled]="activePage <= 1" (click)="setPage(1)">
                <a style="cursor: pointer">&laquo;</a>
            </li>
            <li *ngIf="activePage > 4 && activePage + 1 > lastPage" (click)="setPage(activePage - 4)">
                <a style="cursor: pointer">{{activePage-4}}</a>
            </li>
            <li *ngIf="activePage > 3 && activePage + 2 > lastPage" (click)="setPage(activePage - 3)">
                <a style="cursor: pointer">{{activePage-3}}</a>
            </li>
            <li *ngIf="activePage > 2" (click)="setPage(activePage - 2)">
                <a style="cursor: pointer">{{activePage-2}}</a>
            </li>
            <li *ngIf="activePage > 1" (click)="setPage(activePage - 1)">
                <a style="cursor: pointer">{{activePage-1}}</a>
            </li>
            <li class="active">
                <a style="cursor: pointer">{{activePage}}</a>
            </li>
            <li *ngIf="activePage + 1 <= lastPage" (click)="setPage(activePage + 1)">
                <a style="cursor: pointer">{{activePage+1}}</a>
            </li>
            <li *ngIf="activePage + 2 <= lastPage" (click)="setPage(activePage + 2)">
                <a style="cursor: pointer">{{activePage+2}}</a>
            </li>
            <li *ngIf="activePage + 3 <= lastPage && activePage < 3" (click)="setPage(activePage + 3)">
                <a style="cursor: pointer">{{activePage+3}}</a>
            </li>
            <li *ngIf="activePage + 4 <= lastPage && activePage < 2" (click)="setPage(activePage + 4)">
                <a style="cursor: pointer">{{activePage+4}}</a>
            </li>
            <li [class.disabled]="activePage >= lastPage" (click)="setPage(lastPage)">
                <a style="cursor: pointer">&raquo;</a>
            </li>
        </nav>
        <nav class="pagination pull-right" *ngIf="dataLength > minRowsOnPage">
            <li *ngFor="let rows of rowsOnPageSet" [class.active]="rowsOnPage===rows" (click)="setRowsOnPage(rows)">
                <a style="cursor: pointer">{{rows}}</a>
            </li>
        </nav>
    `
})
export class BootstrapPaginator implements OnChanges {

    @Input("rowsOnPageSet") private rowsOnPageSet = [];
    @Input("mfTable") private inputMfTable: DataTable;

    private mfTable: DataTable;

    public activePage: number;
    public rowsOnPage: number;
    public dataLength: number = 0;
    public lastPage: number;
    private minRowsOnPage = 0;

    public constructor(@Optional() private injectMfTable: DataTable) {
    }

    ngOnChanges(changes: any): any {
        this.mfTable = this.inputMfTable || this.injectMfTable;
        this.onPageChangeSubscriber(this.mfTable.getPage());
        this.mfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
        if (changes.rowsOnPageSet) {
            this.minRowsOnPage = _.min(this.rowsOnPageSet)
        }
    }

    public setPage(pageNumber: number): void {
        this.mfTable.setPage(pageNumber, this.rowsOnPage);
    }

    public setRowsOnPage(rowsOnPage: number): void {
        this.mfTable.setPage(this.activePage, rowsOnPage);
    }

    private onPageChangeSubscriber = (event: PageEvent) => {
        this.activePage = event.activePage;
        this.rowsOnPage = event.rowsOnPage;
        this.dataLength = event.dataLength;
        this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
    };

}