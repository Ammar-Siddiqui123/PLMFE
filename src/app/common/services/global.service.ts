import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Api } from 'datatables.net-bs5';
import { ToastrService } from 'ngx-toastr';
import { BrChooseReportTypeComponent } from 'src/app/dialogs/br-choose-report-type/br-choose-report-type.component';
import { AuthService } from 'src/app/init/auth.service';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  userData:any;
  sqlLimits : any = {
    numerics: {
        bigint: {
            min : -9223372036854775808,
            max: 9223372036854775807
        },
        int: {
            min: -2147483648,
            max: 2147483647
        },
        smallint: {
            min: -32768,
            max: 32767
        },
        tinyint: {
            min: 0,
            max: 255
        },
        // float & real: unrealistic it could ever go this high, will truncate if necessary, more likely to see an overflow in vb than sql server
    },
    text: {
        large: {
            min: 0,
            max: 255
        },
        standard: {
            min: 0,
            max: 50
        }
    }
  };

  constructor(private Api:ApiFuntions,private toast:ToastrService,private dialog: MatDialog,private authService:AuthService) {
    this.userData=this.authService.userData();
  }

    // returns the date from JS in format: mm/dd/yyyy hh:mm
    getCurrentDateTime() {
        var date = new Date();
        // JS month is 0 indexed
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        if (hours > 12) hours = date.getHours() - 12;;
        if (hours < 10) hours = parseInt('0' + hours);

        if (minutes < 10 && minutes != 0) minutes = parseInt(`0` + minutes);
        else if (minutes == 0) minutes = parseInt('00');

        return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes;
    }

    // returns the date from JS as mm/dd/yyyy
    getCurrentDate() {
        var date = new Date();
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
    capitalizeAndRemoveSpaces(inputString: string): string { 
        const words: string[] = inputString.split(' '); 
        const capitalizedWords: string[] = words.map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }); 
        const resultString: string = capitalizedWords.join('');
      
        return resultString;
      }
    setToToday() {
        var date = new Date();

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = parseInt("0" + month);
        if (day < 10) day = parseInt("0" + day);

        var today = month + "/" + day + "/" + year;
        return today;
    }
 
    //Allows only numeric strings in an input box
    setNumeric(value : any) {
        // var value = element.val();
        var decimalVal = "";
        if (value.indexOf(".") == 0) {
            decimalVal = ".";
            value.substring(1, value.length - 1);
        };
        while (isNaN(Number(value)) && value.length > 0) {
            value = value.substring(0, value.length - 1);
        };
        return decimalVal + value;
    }

    /*
    Allows only numeric strings within a specified range inside of an input box
    Parameters:
        Optional 1:
            Usage: setNumericInRange(15, 0, 10);
            
            value: value of input tag to set
            low: numeric, low value of the input
            high: numeric, high value of the input
        Optional 2:
            Usage: setNumericInRange(15, {low: 0, high: 10});
                (or: setNumericInRange(15, SqlLimits.numerics.int);)

            value: value of input tag to set
            low: object containing a low and high property.  Should resemble something like this: low = {low: 1, high: 10};
            high: excluded from this call, you do not need to specify this value at all.
    */
    setNumericInRange(value : any, low : any, high : any, allowEmpty : any = false) {
        if (!low.hasOwnProperty('min')) {
            while ((isNaN(Number(value)) && value.length > 0) || (parseInt(value) > high && high != null)) {
                value = value.substring(0, value.length - 1);
            };
            if (low != null && value < low && value.trim() != '') value = low;            
            return value;
        } else {
            let h = low.max;
            let l = low.min;
            while ((isNaN(Number(value)) && value.length > 0) || (parseInt(value) > h && h != null)) {
                value = value.substring(0, value.length - 1);
            };
            if (l != null && value < l && value.trim() != '' && !allowEmpty) value = l;
            return value;
        };
    }

    /*
    Allows only numeric, comma seperated values in input box provided by element
    */
    setNumericCommaSeparated(value : any) {
        var allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', ','], index = 0;
        while (index < value.length) {
            if (allowed.indexOf(value[index]) == -1) return value.substring(0, index).trim();
            else index++;
        };
    }

    /*
    Removes the Extension from a string typed into an input box
    (Disallows the use of the "." character.)
    */
    setNoExtension(value : any) {
        let extensionIndex = value.indexOf('.');
        if (extensionIndex != -1) return value.substring(0, extensionIndex);
    }

    /*
        Prevents the space character from being contained within the "element"
    */
    setNoSpaces(value : any) {
        let spaceIndex = value.indexOf(' ');
        if (spaceIndex != -1) return value.substring(0, spaceIndex);
    };

    /*
    Prevents the string "null" or "nothing" from being inserted into a particular element.  (Only come across this when server returns Nothing as an object type.)
    */
    setNullEmptyStr(value : any) {
        if (value == null) return ''
        else return String(value);
    };

    checkDecimal(n) {
        var result = (n - Math.floor(n)) !== 0;
        if (result)
          return false;
        else
          return true;
    }
    Print(ChooseReport,type = "lst"){ 
      var PrinterName:any;
      if(type == "lst"  || type == "lbl"){
        PrinterName = localStorage.getItem("SelectedReportPrinter")
      }else{
        PrinterName = localStorage.getItem("SelectedLabelPrinter")
      }
        var paylaod:any={
          ClientCustomData:ChooseReport,
          repositoryIdOfProject:"BCAEC8B2-9D16-4ACD-94EC-74932157BF82",
          PrinterName:PrinterName
        }
        this.Api.CommonPrint(paylaod).subscribe((res:any)=>{
          if(res.isExecuted){
            this.toast.success("print successfully completed", 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
          }else{
            this.toast.error("print unsuccessfully complete", 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
          }
        })
      }
      OpenExportModal(ReportName) {
        ReportName = ReportName.replace(".lst","").replace(".lbl","");
        const dialogRef = this.dialog.open(BrChooseReportTypeComponent, {
          height: 'auto',
          width: '932px',
          autoFocus: '__non_existing_element__',
          disableClose:true,
          data:{ReportName:ReportName}
        }); 
        dialogRef.afterClosed().subscribe((result) => {
          if (result.FileName != null) {
            this.Export(ReportName,result.Type,result.FileName);
          }
        });
      
      }
      Export(ChooseReport:any,Type:any,filename:any){
        var paylaod:any={
          ClientCustomData:`${this.capitalizeAndRemoveSpaces(ChooseReport)+'-lst'}`,
          repositoryIdOfProject:"BCAEC8B2-9D16-4ACD-94EC-74932157BF82",
          type:Type,
          FileName:`${this.capitalizeAndRemoveSpaces(filename)}`
        }
        this.Api.CommonExport(paylaod).subscribe((res:any)=>{
            if(res.isExecuted){
                this.toast.success("Export successfully completed", 'Success!', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 2000,
                  });  
                 
                      const blob = new Blob([res.data.file], { type: 'application/pdf' });
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = res.data.fileName;
                      link.click();
                  
              }else{
                this.toast.error("Export unsuccessfully complete", 'Error!', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 2000,
                  });
              }
        })
      }

      getImPreferences(){
       return JSON.parse(localStorage.getItem('InductionPreference') || '{}');
      }

      updateImPreferences(){
        let paylaod = {
          "username": this.userData.userName,
          "wsid": this.userData.wsid,
        }
        this.Api.PickToteSetupIndex(paylaod).subscribe(res => {
          localStorage.setItem('InductionPreference', JSON.stringify(res.data.imPreference));
    
    
        });
      }
      setImPreferences(response){
        const imPref = localStorage.getItem('InductionPreference');

        if (imPref) {
          const data = JSON.parse(imPref); // Assuming storedData is the object a
          
        
          // Loop through properties of b and update values in a if they exist
          for (const prop in response) {
            if (response.hasOwnProperty(prop) && data.hasOwnProperty(prop)) {
              console.log(prop)
              data[prop] = response[prop];
            }
          }
        
          // Store the updated object a back in localStorage
          localStorage.setItem('inductionPreference', JSON.stringify(data));
        }
      }
}
