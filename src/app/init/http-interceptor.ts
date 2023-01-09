import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/internal/operators/tap";
import { SpinnerService } from "./spinner.service";


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(private spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinnerService.show();

        return next.handle(req)
            .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.spinnerService.hide();
                }
            }, (error) => {
                this.spinnerService.hide();
            }));
    }
}
