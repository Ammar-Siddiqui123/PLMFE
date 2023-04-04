import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ActionDisableDirective } from './init/action-disable.directive';
import { NumbersOnlyDirective } from './init/NumbersOnly.directive';
import { SortDirective } from './init/sort.directive';

@NgModule({
    exports: [
        NgScrollbarModule,
        RouterModule,
        FormsModule,
        DataTablesModule,
        HttpClientModule,
        ReactiveFormsModule,
        NumbersOnlyDirective,
        ActionDisableDirective,
        SortDirective
    ],
    declarations: [
        NumbersOnlyDirective,
        ActionDisableDirective,
        SortDirective
      ],
})
export class GeneralModule { }