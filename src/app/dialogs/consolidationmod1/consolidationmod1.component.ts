import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-consolidationmod1',
  templateUrl: './consolidationmod1.component.html',
  styleUrls: ['./consolidationmod1.component.scss']
})
export class Consolidationmod1Component implements OnInit {
  @Input() confPackProcTable: any = [];
  @Input() confPackTransTable: any = [];
  @Input() orderNumber: any;
  @Input() contID: any;
  userData:any = {};
  constructor(private http:ConsolidationManagerService,private authService: AuthService,private toast:ToastrService) {
    this.userData = this.authService.userData();
   }

  ngOnInit(): void {
  }   
  async ItemLabelModal(){
    var  Id = this.confPackProcTable[0].sT_ID;  
    // title = 'Item Label - Packing';
    // getLLPreviewOrPrint('/CM/ConfirmAndPacking/PrintConfPackItemLabel', {
    //     orderNum: $('#ConfPackOrderNum').val(),
    //     ST_ID: id
    // }, true,'label', title)
  }
  async SplitLineProcModal(){
    // split modal open
  }
  async AdjustQauntModal(){
    // openAdjustQuant Modal
  }
    //will update the desired record(s) and go thorugh confirm proccess
    async DoneModal(){
      var id = this.confPackProcTable[0].sT_ID;
      var obj : any = {
        id: id,
        orderNumber: this.orderNumber,
        containerID: this.contID,
        modal: "",
        userName: this.userData.userName,
        wsid: this.userData.wsid
      };
     this.http.get(obj,'/Consolidation/ConfPackProcModalUpdate').subscribe((res:any) => {
      if (res.data == "Fail") {
        this.toast.error(  "An error has occurred",'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000});
    } else {
        //edit table
        var tr = $('#ShipTransTable tbody tr.active');
        var index = this.confPackTransTable.findIndex(x=>x.active == true);
        this.confPackTransTable[index].containerID = this.contID;
        this.confPackTransTable[index].complete = true;
        this.confPackTransTable[index].invalidate() 

        if (this.confPackTransTable.rows().data().length == 1) {
            // this.close modal  return old modal  
          // this.ConfirmedPacked();
        };
    };
     });
    }
    ConfPackProcessModal(){
      
    }
  //   $('#ConfPackProcessModal').on('hidden.bs.modal', function (e) {
  //     if ($('#ConfPackSelectModal').hasClass('show') || $('#ConfPackSelectModal').hasClass('in')) {
  //         confPackHub.server.selConfPackSelectDT($('#ConfPackOrderNum').val(), $('#ScanItem').val()).done(function (dataset) {
  //             confPackSelectTable.clear().draw();
  //             confPackSelectTable.rows.add(dataset).draw();
  //         });
  //     };
  // });

}
