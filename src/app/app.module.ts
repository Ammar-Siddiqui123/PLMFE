import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './login.service';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialModule } from './material-module';
import { MatTableModule } from '@angular/material/table';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CustomHttpInterceptor } from './init/http-interceptor';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { HeaderInterceptor } from './init/header-interceptor.interceptor';
import { GlobalConfigModule } from './global-config/global-config.module';
import { SelectZonesComponent } from './dialogs/select-zones/select-zones.component';
import { TotesAddEditComponent } from './dialogs/totes-add-edit/totes-add-edit.component';
import { GeneralModule } from './gen-module';
import { PickToteManagerComponent } from './dialogs/pick-tote-manager/pick-tote-manager.component';
import { ViewOrdersComponent } from './dialogs/view-orders/view-orders.component';
import { BlossomToteComponent } from './dialogs/blossom-tote/blossom-tote.component';
import { WorkstationZonesComponent } from './dialogs/workstation-zones/workstation-zones.component';
import { BatchDeleteComponent } from './dialogs/batch-delete/batch-delete.component';
import { ConfirmationDialogComponent } from './admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AddFilterFunction } from './dialogs/add-filter-function/add-filter-function.component';
import { SelectionTransactionForToteComponent } from './dialogs/selection-transaction-for-tote/selection-transaction-for-tote.component';
import { SelectionTransactionForToteExtendComponent } from './dialogs/selection-transaction-for-tote-extend/selection-transaction-for-tote-extend.component';
import { CrossDockTransactionComponent } from './dialogs/cross-dock-transaction/cross-dock-transaction.component';
import { ReprocessTransactionDetailViewComponent } from './dialogs/reprocess-transaction-detail-view/reprocess-transaction-detail-view.component';
import { ToteTransactionViewComponent } from './dialogs/tote-transaction-view/tote-transaction-view.component';
import { BatchDeleteConfirmationComponent } from './dialogs/batch-delete-confirmation/batch-delete-confirmation.component';
import { MarkToteFullComponent } from './dialogs/mark-tote-full/mark-tote-full.component';
import { AlertConfirmationComponent } from './dialogs/alert-confirmation/alert-confirmation.component';
import { UserFieldsComponent } from './dialogs/user-fields/user-fields.component';
import { ChooseLocationComponent } from './dialogs/choose-location/choose-location.component';
import { InputFilterComponent } from './dialogs/input-filter/input-filter.component';
import { MinReelQtyComponent } from './dialogs/min-reel-qty/min-reel-qty.component';
import { TransactionQtyEditComponent } from './dialogs/transaction-qty-edit/transaction-qty-edit.component';
import { CmShippingComponent } from './dialogs/cm-shipping/cm-shipping.component';
import { CmShippingTransactionComponent } from './dialogs/cm-shipping-transaction/cm-shipping-transaction.component';
import { CmShippingCarrierComponent } from './dialogs/cm-shipping-carrier/cm-shipping-carrier.component';
//import { InputFilterComponent } from './dialogs/choose-location/choose-location.component';
// import { ActionDisableDirective } from './init/action-disable.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    SelectZonesComponent,
    TotesAddEditComponent,
    PickToteManagerComponent,
    ViewOrdersComponent,
    BlossomToteComponent,
    WorkstationZonesComponent,
    BatchDeleteComponent,
    ConfirmationDialogComponent,
    SelectionTransactionForToteComponent,
    SelectionTransactionForToteExtendComponent,
    AddFilterFunction,
    SelectionTransactionForToteComponent,
    CrossDockTransactionComponent,
    ReprocessTransactionDetailViewComponent,
    ToteTransactionViewComponent,
    BatchDeleteConfirmationComponent,
    MarkToteFullComponent,
    AlertConfirmationComponent,
    UserFieldsComponent,
    ChooseLocationComponent,
    InputFilterComponent,
    MinReelQtyComponent,
    TransactionQtyEditComponent,
    CmShippingComponent,
    CmShippingTransactionComponent,
    CmShippingCarrierComponent,
    // ActionDisableDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GeneralModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    MatButtonModule,
    // MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatCheckboxModule,
    MaterialModule,
    MatTableModule,
    GlobalConfigModule
    
  ],
  providers: [
    LoginService,
    { 
      provide: LocationStrategy, 
      useClass: HashLocationStrategy 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
