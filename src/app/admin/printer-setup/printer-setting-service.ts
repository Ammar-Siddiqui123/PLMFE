import { Injectable } from "@angular/core";
import { AuthService } from "src/app/init/auth.service";
import { ApiFuntions } from "src/app/services/ApiFuntions";

@Injectable({
    providedIn: 'root'
  })
  export class PrinterSettingService {
    public selectedPrinterLabelName : string;
    public selectedPrinterReportName : string;
    public printerLabelList : string[] = [];
    public printerReportList : string[] = [];
    public userData:any = {};
    constructor(private api:ApiFuntions,    public authService: AuthService){
        this.userData = this.authService.userData(); 
    }
    getAllPrinters(){
        var payload = {
            UserName:   this.userData.userName,
            WSID:this.userData.wsid
        }
        this.api.GetAllPrinters(payload).subscribe((res:any)=>{
            this.printerReportList = res.data.filter(x=>x.Label == "Able to Print Labels");
            this.printerLabelList = res.data.filter(x=>x.Label == "Not Able to Print Labels");
        });
    }
    UpdWSPrefsPrinters(ReportPrinter,LabelPrinter){
        var payload = {
            ReportPrinter:ReportPrinter,
            LabelPrinter:LabelPrinter,
            WSID:this.userData.wsid
        }
        this.api.GetAllPrinters(payload).subscribe((res:any)=>{
            this.printerReportList = res.data.filter(x=>x.Label == "Able to Print Labels");
            this.printerLabelList = res.data.filter(x=>x.Label == "Not Able to Print Labels");
        });
    }
  }