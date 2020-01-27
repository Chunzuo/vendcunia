import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../../config/app.config';

@Injectable()
export class AuthenticationService {

    private loginAPI = AppConfig.endpoints.admin + '/login';

    constructor(private http: Http) {
    }

    login(email: string, password: string) {
        return this.http.post(this.loginAPI, JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                const adminUser = response.json();
                if (adminUser && adminUser.token) {
                    sessionStorage.setItem('currentAdmin', JSON.stringify(adminUser));
                }
            });
    }

    logout() {
        sessionStorage.removeItem('currentAdmin');
    }

}
