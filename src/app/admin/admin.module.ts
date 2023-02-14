import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module'; 
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material-module';
import { GeneralModule } from '../gen-module';
import { CdkTableModule} from '@angular/cdk/table';

//Employees Components
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesLookupComponent } from './employees/employees-lookup/employees-lookup.component';
import { EmployeePickupLevelComponent } from './employees/employee-pickup-level/employee-pickup-level.component';
import { GroupsAllowedComponent } from './employees/groups-allowed/groups-allowed.component';
import { GroupsLookupComponent } from './employees/groups-lookup/groups-lookup.component';
import { AssignedFunctionsComponent } from './employees/assigned-functions/assigned-functions.component';
import { UnassignedFunctionsComponent, filterUnassignedFunc } from './employees/unassigned-functions/unassigned-functions.component';
import { StatisticsLookupComponent } from './employees/statistics-lookup/statistics-lookup.component';

//Dialogs
import { AddNewEmployeeComponent } from './dialogs/add-new-employee/add-new-employee.component';
import { AddZoneComponent } from './dialogs/add-zone/add-zone.component';
import { DeleteConfirmationComponent } from './dialogs/delete-confirmation/delete-confirmation.component';
import { AddLocationComponent } from './dialogs/add-location/add-location.component';
import { AddPickuplevelsComponent } from './dialogs/add-pickuplevels/add-pickuplevels.component';
import { AddGroupAllowedComponent } from './dialogs/add-group-allowed/add-group-allowed.component';
import { AddNewGroupComponent } from './dialogs/add-new-group/add-new-group.component';
import { FunctionAllocationComponent } from './dialogs/function-allocation/function-allocation.component';
import { InventoryMapComponent } from './inventory-map/inventory-map.component';
import { AddInvMapLocationComponent } from './dialogs/add-inv-map-location/add-inv-map-location.component';
import { WarehouseComponent } from './dialogs/warehouse/warehouse.component';
import { SetColumnSeqComponent } from './dialogs/set-column-seq/set-column-seq.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { CellSizeComponent } from './dialogs/cell-size/cell-size.component';
import { VelocityCodeComponent } from './dialogs/velocity-code/velocity-code.component';
import { InventoryMasterComponent } from './inventory-master/inventory-master.component';
import { ItemNumberComponent } from './dialogs/item-number/item-number.component';
import { ItemCategoryComponent } from './dialogs/item-category/item-category.component';
import { PrintRangeComponent } from './dialogs/print-range/print-range.component';
import { UnitMeasureComponent } from './dialogs/unit-measure/unit-measure.component';
import { ItemSetupComponent } from './inventory-master/item-setup/item-setup.component';
import { QuarantineConfirmationComponent } from './dialogs/quarantine-confirmation/quarantine-confirmation.component';
import { AdjustQuantityComponent } from './dialogs/adjust-quantity/adjust-quantity.component';
import { BatchManagerComponent } from './batch-manager/batch-manager.component';
import { BatchDeleteComponent } from './batch-manager/batch-delete/batch-delete.component';
import { BatchOrderListComponent } from './batch-manager/batch-order-list/batch-order-list.component';
import { BatchSelectedOrdersComponent } from './batch-manager/batch-selected-orders/batch-selected-orders.component';
//import { KitItemsComponent } from './inventory-master/kit-items/kit-items.component';
//import { InventoryLocationComponent } from './inventory-master/inventory-location/inventory-location.component';
import { CycleCountsComponent } from './cycle-counts/cycle-counts.component';
import { CCDiscrepanciesComponent } from './cycle-counts/ccdiscrepancies/ccdiscrepancies.component';
import { CCCountQueueComponent } from './cycle-counts/cccount-queue/cccount-queue.component';
import { CreateCountsComponent } from './cycle-counts/create-transaction/create-counts/create-counts.component';
import { CreateTransactionComponent } from './cycle-counts/create-transaction/create-transaction.component';
import { CountQueueComponent } from './cycle-counts/create-transaction/count-queue/count-queue.component';
import { ImportFieldMappingComponent } from './cycle-counts/import-field-mapping/import-field-mapping.component';
import { ReelTrackingComponent } from './inventory-master/reel-tracking/reel-tracking.component';
import { ScanCodesComponent } from './inventory-master/scan-codes/scan-codes.component';
import { LocationAssignmentComponent } from './location-assignment/location-assignment.component';
import { CountComponent } from './location-assignment/count/count.component';
import { PickComponent } from './location-assignment/pick/pick.component';
import { PutAwayComponent } from './location-assignment/put-away/put-away.component';
//import { WeighScaleComponent } from './inventory-master/weigh-scale/weigh-scale.component';
//import { InventoryMasterOtherComponent } from './inventory-master/inventory-master-other/inventory-master-other.component';
import { DetailComponent } from './inventory-master/detail/detail.component';
import { KitItemComponent } from './inventory-master/kit-item/kit-item.component';
import { LocationComponent } from './inventory-master/location/location.component';
import { WeightScaleComponent } from './inventory-master/weight-scale/weight-scale.component';
import { OthersComponent } from './inventory-master/others/others.component';
import { GroupAllowedComponent } from './dialogs/group-allowed/group-allowed.component';
import { SearchPipe } from './employees/search.pipe';
import { customFuncAllowedSearch } from './employees/customFuncAllowedSearch.pipe';
import { CloneGroupComponent } from './dialogs/clone-group/clone-group.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdateDescriptionComponent } from './dialogs/update-description/update-description.component';
import { CreateBatchConfirmationComponent } from './dialogs/create-batch-confirmation/create-batch-confirmation.component';
import { CreateBatchComponent } from './dialogs/create-batch/create-batch.component';
import { TransactionComponent } from './transaction/transaction.component';
import { OpenTransactionComponent } from './transaction/open-transaction/open-transaction.component';
import { OpenTransactionFiltersComponent } from './transaction/open-transaction/open-transaction-filters/open-transaction-filters.component';
import { OpenTransactionDataTableComponent } from './transaction/open-transaction/open-transaction-data-table/open-transaction-data-table.component';
import { TransactionHistoryComponent } from './transaction/transaction-history/transaction-history.component';
import { TransactionHistoryFiltersComponent } from './transaction/transaction-history/transaction-history-filters/transaction-history-filters.component';
import { TransactionHistoryListComponent } from './transaction/transaction-history/transaction-history-list/transaction-history-list.component';
import { OrderStatusComponent } from './transaction/order-status/order-status.component';
import { TranSelectOrderComponent } from './transaction/order-status/tran-select-order/tran-select-order.component';
import { TranCarouselLzoneComponent } from './transaction/order-status/tran-carousel-lzone/tran-carousel-lzone.component';
import { TranOffCarouselLzoneComponent } from './transaction/order-status/tran-off-carousel-lzone/tran-off-carousel-lzone.component';
import { TranOrderListComponent } from './transaction/order-status/tran-order-list/tran-order-list.component';
import { OpenTransactionOnHoldComponent } from './transaction/open-transaction/open-transaction-on-hold/open-transaction-on-hold.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteConfirmationTransactionComponent } from './dialogs/delete-confirmation-transaction/delete-confirmation-transaction.component';
import { ReprocessedTransactionComponent } from './transaction/reprocessed-transaction/reprocessed-transaction.component';
import { ReprocessTransactionComponent } from './transaction/reprocess-transaction/reprocess-transaction.component';
import { TranInReprocessComponent } from './transaction/reprocess-transaction/tran-in-reprocess/tran-in-reprocess.component';
import { ReprocessChoiceComponent } from './transaction/reprocess-transaction/reprocess-choice/reprocess-choice.component';
import { ItemNumUpdateConfirmationComponent } from './dialogs/item-num-update-confirmation/item-num-update-confirmation.component';
import { ScanTypeCodeComponent } from './dialogs/scan-type-code/scan-type-code.component';
import { ColumnSequenceDialogComponent } from './dialogs/column-sequence-dialog/column-sequence-dialog.component';
import { SearchFilterPipe } from './transaction/pipes/search-filter.pipe';
import { GlobalConfigSetSqlComponent } from './dialogs/global-config-set-sql/global-config-set-sql.component';
import { SendTranHistoryComponent } from './dialogs/send-tran-history/send-tran-history.component';
import { ReprocessTransactionDetailComponent } from './dialogs/reprocess-transaction-detail/reprocess-transaction-detail.component';
import { HoldReasonComponent } from './dialogs/hold-reason/hold-reason.component';
import { ClearAppGlobalconfigComponent } from './dialogs/clear-app-globalconfig/clear-app-globalconfig.component';
import { LicensingInvalidComponent } from './dialogs/licensing-invalid/licensing-invalid.component';
import { SqlAuthConfirmationComponent } from './dialogs/sql-auth-confirmation/sql-auth-confirmation.component';
import { ManualTransactionsComponent } from './manual-transactions/manual-transactions.component';
import { GenerateOrderComponent } from './manual-transactions/generate-order/generate-order.component';
import { AddNewTransactionToOrderComponent } from './dialogs/add-new-transaction-to-order/add-new-transaction-to-order.component';
import { DeleteConfirmationManualTransactionComponent } from './dialogs/delete-confirmation-manual-transaction/delete-confirmation-manual-transaction.component';
import { ManualTransPostConfirmComponent } from './dialogs/manual-trans-post-confirm/manual-trans-post-confirm.component';



@NgModule({
  declarations: [
    AdminComponent,
    EmployeesComponent,
    EmployeesLookupComponent,
    EmployeePickupLevelComponent,
    GroupsAllowedComponent,
    GroupsLookupComponent,
    AssignedFunctionsComponent,
    UnassignedFunctionsComponent,
    filterUnassignedFunc,
    StatisticsLookupComponent,
    AddNewEmployeeComponent,
    AddZoneComponent,
    DeleteConfirmationComponent,
    AddLocationComponent,
    AddPickuplevelsComponent,
    AddGroupAllowedComponent,
    AddNewGroupComponent,
    FunctionAllocationComponent,
    InventoryMapComponent,
    AddInvMapLocationComponent,
    WarehouseComponent,
    SetColumnSeqComponent,
    CellSizeComponent,
    VelocityCodeComponent,
    InventoryMasterComponent,
    ItemNumberComponent,
    ItemCategoryComponent,
    PrintRangeComponent,
    UnitMeasureComponent,
    ItemSetupComponent,
    QuarantineConfirmationComponent,
    AdjustQuantityComponent,
    BatchManagerComponent,
    BatchDeleteComponent,
    BatchOrderListComponent,
    BatchSelectedOrdersComponent,
   // KitItemsComponent,
  //  InventoryLocationComponent,
    CycleCountsComponent,
    CCDiscrepanciesComponent,
    CCCountQueueComponent,
    CreateCountsComponent,
    CreateTransactionComponent,
    CountQueueComponent,
    ImportFieldMappingComponent,
    ReelTrackingComponent,
    ScanCodesComponent,
    LocationAssignmentComponent,
    CountComponent,
    PickComponent,
    PutAwayComponent,
  //  WeighScaleComponent,
 //   InventoryMasterOtherComponent,
    DetailComponent,
    KitItemComponent,
    LocationComponent,
    ReelTrackingComponent,
    ScanCodesComponent,
    WeightScaleComponent,
    OthersComponent,
    GroupAllowedComponent,
    SearchPipe,
    customFuncAllowedSearch,
    CloneGroupComponent,
    UpdateDescriptionComponent,
    CreateBatchConfirmationComponent,
    CreateBatchComponent,
    TransactionComponent,
    OpenTransactionComponent,
    OpenTransactionFiltersComponent,
    OpenTransactionDataTableComponent,
    TransactionHistoryComponent,
    TransactionHistoryFiltersComponent,
    TransactionHistoryListComponent,
    OrderStatusComponent,
    TranSelectOrderComponent,
    TranCarouselLzoneComponent,
    TranOffCarouselLzoneComponent,
    TranOrderListComponent,
    OpenTransactionOnHoldComponent,
    DeleteConfirmationTransactionComponent,
    ReprocessedTransactionComponent,
    ReprocessTransactionComponent,
    TranInReprocessComponent,
    ReprocessChoiceComponent,
    ItemNumUpdateConfirmationComponent,
    ScanTypeCodeComponent,
    ColumnSequenceDialogComponent,
    SearchFilterPipe,
    GlobalConfigSetSqlComponent,
    SendTranHistoryComponent,
    ReprocessTransactionDetailComponent,
    HoldReasonComponent,
    ClearAppGlobalconfigComponent,
    LicensingInvalidComponent,
    SqlAuthConfirmationComponent,
    ManualTransactionsComponent,
    GenerateOrderComponent,
    AddNewTransactionToOrderComponent,
    DeleteConfirmationManualTransactionComponent,
    ManualTransPostConfirmComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    GeneralModule,
    CdkTableModule,
    DragDropModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatFormFieldModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      extendedTimeOut: 0,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      }
    })
  ],
 
})
export class AdminModule { }
