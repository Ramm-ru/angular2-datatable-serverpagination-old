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

    private data = [];
    private amount: number = 0;

    constructor(private http: Http) {
        http.get("/src/data.json")
            .subscribe((data) => {
                setTimeout(() => {
                    this.data = data.json();
                    this.amount = this.data.length;
                }, 5000);
            });
    }

    public onPageChange(event) {
        console.log(event.activePage + ", " + event.rowsOnPage + ", " + event.dataLength);
    }

    private toInt(num: string) {
        return +num;
    }

    private sortByWordLength = (a: any) => {
        return a.name.length;
    }

}