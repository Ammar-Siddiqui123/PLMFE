import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Printer {

    constructor(private http: HttpClient) { }

    getLLPreviewOrPrint(baseURL: string, data: any, printDirect: boolean, reportType: string, title: string, closeCallback: any, callbackArgs: any) {

        if (data.hasOwnProperty('popup')) delete data['popup'];

        let url = baseURL + '?popup=True&';
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) url += (prop + '=' + data[prop] + '&');
        }
        url = url.substring(0, url.length - 1);

        if (printDirect) {
            if ($('#PrintServiceOnline').text() == "Offline" || $('#Status').text() == 'Offline') {
                alert("The print service is currently offline");
                return;
            }
            else if ($('#ReportPrinter').val() == 'No Printer' && reportType == 'report') {
                alert("You must have a Printer Assigned to print Reports");
                return;
            }
            else if ($('#LabelPrinter').val() == 'No Printer' && reportType == 'label') {
                alert("You must have a Printer Assigned to print Labels");
                return;
            }
            else {
                $(this).addClass("Printing");
                // addPrintMessage("Printing Started", "print-start");
            }
        }

        if (printDirect) {
        this.http.post(url, data).subscribe(
            (printed: any) => {
            if (printDirect) {
                if (printed) {
                if (typeof closeCallback === 'function') {
                    // this.MessageModal('Alert: ' + title, 'Print Complete.', closeCallback(callbackArgs));
                } else {
                    // this.MessageModal('Alert: ' + title, 'Print Complete.');
                }
                } else {
                // this.MessageModal('Warning: ' + title, 'An error occurred. The requested print action may not have completed correctly.');
                }
            } else {
                if (printed === false) {
                // this.MessageModal('Error', 'There was an error during the export/preview process.');
                } else {
                // generatedPreview = printed;
                }
            }
            },
            (error: any) => {
            // this.MessageModal('Warning ' + title, 'An error occurred. The requested print action may not have completed correctly.');
            }
        );
        } else {
        const handle = window.open(url, '_blank', 'width=' + screen.width + ',height=' + screen.height + ',toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
        try {
            // handle.focus();
        } catch (e) {
            console.log('Exception: ', e);
            // this.MessageModal('Error', 'Pop-ups appear to be blocked for this workstation. Please check your settings and ensure that the browser allows pop-ups for this site.');
        }

        if (typeof closeCallback === 'function') {
            // handle.onload = () => {
            // handle.onunload = () => {
            //     closeCallback(callbackArgs);
            // };
            // };
        }

        return handle;
        }

        return null;
    }
}
