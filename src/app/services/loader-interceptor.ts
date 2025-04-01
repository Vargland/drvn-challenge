import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderService } from '@utils';

@Injectable()
export default class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<boolean>> {
        this.loaderService.show();

        return next.handle(req)
            .pipe(
                map(event => {
                    if (event instanceof HttpResponse) {
                        this.loaderService.hide();
                    }

                    return event;
                })
            )
    }
}
