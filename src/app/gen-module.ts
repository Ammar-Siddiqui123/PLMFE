import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NumbersOnlyDirective } from './init/NumbersOnly.directive';

@NgModule({
    exports: [
        NgScrollbarModule,
        RouterModule,
        FormsModule,
        DataTablesModule,
        HttpClientModule,
        ReactiveFormsModule,
        NumbersOnlyDirective
    ],
    declarations: [
        NumbersOnlyDirective,
      ],
})
export class GeneralModule { }