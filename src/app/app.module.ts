import { NgModule } from '@angular/core';
import { BrowserModule,Title  } from '@angular/platform-browser';
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
import { CmConfirmAndPackingComponent } from './dialogs/cm-confirm-and-packing/cm-confirm-and-packing.component';
import { CmShipSplitLineComponent } from './dialogs/cm-ship-split-line/cm-ship-split-line.component';
import { CmShipEditQtyComponent } from './dialogs/cm-ship-edit-qty/cm-ship-edit-qty.component';
import { CmShipEditConIdComponent } from './dialogs/cm-ship-edit-con-id/cm-ship-edit-con-id.component';
import { CmToteIdUpdateModalComponent } from './dialogs/cm-tote-id-update-modal/cm-tote-id-update-modal.component';
import { DeleteRangeComponent } from './dialogs/delete-range/delete-range.component';
import { PrintReplenLabelsComponent } from './dialogs/print-replen-labels/print-replen-labels.component';
import { SrDeleteOrderComponent } from './dialogs/sr-delete-order/sr-delete-order.component';
import { CmOrderNumberComponent } from './dialogs/cm-order-number/cm-order-number.component';
import { CmCarriersAddDeleteEditComponent } from './dialogs/cm-carriers-add-delete-edit/cm-carriers-add-delete-edit.component';
import { CmItemSelectedComponent } from './dialogs/cm-item-selected/cm-item-selected.component';
import { CmConfirmAndPackingProcessTransactionComponent } from './dialogs/cm-confirm-and-packing-process-transaction/cm-confirm-and-packing-process-transaction.component';
import { CmSplitLineComponent } from './dialogs/cm-split-line/cm-split-line.component';
import { CmConfirmAndPackingSelectTransactionComponent } from './dialogs/cm-confirm-and-packing-select-transaction/cm-confirm-and-packing-select-transaction.component';
import { CmShippingCarrierComponent } from './dialogs/cm-shipping-carrier/cm-shipping-carrier.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { CmAddNewItemToShipmentComponent } from './dialogs/cm-add-new-item-to-shipment/cm-add-new-item-to-shipment.component';
import { CmPrintOptionsComponent } from './dialogs/cm-print-options/cm-print-options.component';
import { CmOrderToteConflictComponent } from './dialogs/cm-order-tote-conflict/cm-order-tote-conflict.component';
import { SrReplenishmentProgressComponent } from './dialogs/sr-replenishment-progress/sr-replenishment-progress.component';
import { OmEventLogEntryDetailComponent } from './dialogs/om-event-log-entry-detail/om-event-log-entry-detail.component';
import { OmCreateOrdersComponent } from './dialogs/om-create-orders/om-create-orders.component';
import { OmUpdateRecordComponent } from './dialogs/om-update-record/om-update-record.component';
import { OmAddRecordComponent } from './dialogs/om-add-record/om-add-record.component';
import { OmEditTransactionComponent } from './dialogs/om-edit-transaction/om-edit-transaction.component';
import { OmAddTransactionComponent } from './dialogs/om-add-transaction/om-add-transaction.component';
import { OmChangesConfirmationComponent } from './dialogs/om-changes-confirmation/om-changes-confirmation.component';
import { OmUserFieldDataComponent } from './dialogs/om-user-field-data/om-user-field-data.component';
import { GcPrintServiceTestBeginComponent } from './dialogs/gc-print-service-test-begin/gc-print-service-test-begin.component';
import { GcPrintServiceTestComponent } from './dialogs/gc-print-service-test/gc-print-service-test.component';
import { OmChangePriorityComponent } from './dialogs/om-change-priority/om-change-priority.component';
import { AuthGuard } from './init/AuthGuard.service';
import { StagingLocationOrderComponent } from './dialogs/staging-location-order/staging-location-order.component';
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
    CmConfirmAndPackingComponent,
    CmShipSplitLineComponent,
    CmShipEditQtyComponent,
    CmShipEditConIdComponent,
    CmToteIdUpdateModalComponent,
    DeleteRangeComponent,
    PrintReplenLabelsComponent,
    SrDeleteOrderComponent, 
    CmOrderNumberComponent,
    CmCarriersAddDeleteEditComponent,
    CmItemSelectedComponent,
    CmConfirmAndPackingProcessTransactionComponent,
    CmSplitLineComponent,
    CmShippingCarrierComponent,
    CmConfirmAndPackingSelectTransactionComponent,
    OrderManagerComponent,
    CmAddNewItemToShipmentComponent,
    CmPrintOptionsComponent,
    CmOrderToteConflictComponent,
    SrReplenishmentProgressComponent,
    OmEventLogEntryDetailComponent,
    OmCreateOrdersComponent,
    OmUpdateRecordComponent,
    OmAddRecordComponent,
    OmEditTransactionComponent,
    OmAddTransactionComponent,
    OmChangesConfirmationComponent,
    OmUserFieldDataComponent,
    GcPrintServiceTestBeginComponent,
    GcPrintServiceTestComponent,
    OmChangePriorityComponent,
    StagingLocationOrderComponent,
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
    Title,
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
    },AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
