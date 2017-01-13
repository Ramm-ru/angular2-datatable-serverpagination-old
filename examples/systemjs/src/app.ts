import {Component} from "@angular/core";
import {DatePipe} from "@angular/common";
import {Http} from "@angular/http";
import {DataTableDirectives} from "angular2-datatable-serverpagination-old/datatable";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'app',
    templateUrl: './app.html',
    directives: [ROUTER_DIRECTIVES, DataTableDirectives],
    pipes: [DatePipe]
})
export class App {

    private data;

    constructor(private http: Http) {
        http.get("/src/data.json")
            .subscribe((data) => {
                setTimeout(() => {
                    this.data = data.json();
                }, 5000);
            });
    }

    private toInt(num: string) {
        return +num;
    }

    private sortByWordLength = (a: any) => {
        return a.name.length;
    }

}