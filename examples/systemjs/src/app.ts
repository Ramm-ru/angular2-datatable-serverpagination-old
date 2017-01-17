import {Component} from "@angular/core";
import {DatePipe} from "@angular/common";
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {DataTableDirectives} from "angular2-datatable-serverpagination-old/datatable";


@Component({
    selector: 'app',
    templateUrl: 'src/app.html',
    providers: [HTTP_PROVIDERS],
    directives: [DataTableDirectives],
    pipes: [DatePipe]
})
export class App {

    private pseudoServer = [];
    private data = [];
    private amount: number = 0;
    private rowsOnPage: number = 5;

    constructor(private http: Http) {
        http.get("/src/data.json")
            .subscribe((data) => {
                setTimeout(() => {
                    this.pseudoServer = data.json();
                    this.load(1);
                }, 5000);
            });
    }

    public onPageChange(event) {
        this.rowsOnPage = event.rowsOnPage;
        this.load(event.activePage);
    }

    public load(page: number) {
        this.data = [];
        this.amount = this.pseudoServer.length;
        let start = page * this.rowsOnPage;
        this.data = this.pseudoServer.slice(start, start + this.rowsOnPage);
    }

}