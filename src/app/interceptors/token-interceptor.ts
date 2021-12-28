import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { GlobalPropertiesConstants } from "../shared/constants/GlobalPropertiesConstants";

/**
 * https://medium.com/angular-shots/shot-3-how-to-add-http-headers-to-every-request-in-angular-fab3d10edc26
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(GlobalPropertiesConstants.PROPERTY_TOKEN) || '';
        const modifiedRequest = token && token !== '' ?
            req.clone({
                headers: req.headers.set(GlobalPropertiesConstants.AUTH_HEADER, `${GlobalPropertiesConstants.BEARER} ${token}`),
            }) : req.clone();
        return next.handle(modifiedRequest);
    }
}