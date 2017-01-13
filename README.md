## Usage example

app.ts
```typescript
 import {Component} from '@angular/core';
 import {DataTableDirectives} from 'angular2-datatable-serverpagination-old/datatable';

 @Component({
     selector: 'app',
     templateUrl: 'app.html',
     directives: [DataTableDirectives]
 })
 export class App {
     private data: any[] = ...
 }
```

app.html
```html
<table class="table table-striped" [mfData]="data" #mf="mfDataTable" [mfRowsOnPage]="5">
    <thead>
    <tr>
        <th style="width: 20%">
            <mfDefaultSorter by="name">Name</mfDefaultSorter>
        </th>
        <th style="width: 50%">
            <mfDefaultSorter by="email">Email</mfDefaultSorter>
        </th>
        <th style="width: 10%">
            <mfDefaultSorter by="age">Age</mfDefaultSorter>
        </th>
        <th style="width: 20%">
            <mfDefaultSorter by="city">City</mfDefaultSorter>
        </th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let item of mf.data">
        <td>{{item.name}}</td>
        <td>{{item.email}}</td>
        <td class="text-right">{{item.age}}</td>
        <td>{{item.city | uppercase}}</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
        <td colspan="4">
            <mfBootstrapPaginator [rowsOnPageSet]="[5,10,25]"></mfBootstrapPaginator>
        </td>
    </tr>
    </tfoot>
</table>
```

## API

### `mfData` directive

 - selector: `table[mfData]`
 - exportAs: `mfDataTable`
 - inputs
   - `mfData: any[]` - array of data to display on table
   - `mfRowsOnPage: number` - number of rows should be displayed on page (default: 1000)
   - `mfActivePage: number` - page number should be displayed on init (default: 1)
 
### `mfDefaultSorter` component

 - selector: `mfDefaultSorter`
 - inputs
   - `by: any` - specify how to sort data (argument for lodash function [_.sortBy ](https://lodash.com/docs#sortBy))
 
### `mfBootstrapPaginator` component
Displays buttons for changing current page and number of displayed rows using bootstrap template (css for bootstrap is required). If array length is smaller than current displayed rows on page then it doesn't show button for changing page. If array length is smaller than min value rowsOnPage then it doesn't show any buttons.

 - selector: `mfBootstrapPaginator`
 - inputs
   - `rowsOnPageSet: number` - specify values for buttons to change number of diplayed rows
