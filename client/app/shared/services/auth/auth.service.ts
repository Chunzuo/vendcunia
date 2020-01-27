import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthServiceApp {

    private registerAPI = AppConfig.endpoints.frontend + '/users/register';
    private loginAPI = AppConfig.endpoints.frontend + '/users/login';
    private getUserAPI = AppConfig.endpoints.frontend + '/user_info';
    private updateAPI = AppConfig.endpoints.frontend + '/update_user';
    private checkAPI = AppConfig.endpoints.frontend + '/check_password';
    private sendcodeAPI = AppConfig.endpoints.frontend + '/users/verifyemail';
    private isactiveAPI = AppConfig.endpoints.frontend + '/users/is_active';
    private verifycodeAPI = AppConfig.endpoints.frontend+'/users/verify';
    private getloginTokenAPI = AppConfig.endpoints.frontend+'/users/getLogintoken';
    private googleloginAPI = AppConfig.endpoints.frontend+'/users/googleOAuth';
    private contactAPI = AppConfig.endpoints.frontend+'/users/contact';
    public firstName: string;
    public two_fa_status: string;

    constructor(
        public router: Router,
        private http: HttpClient
    ) {
        this.firstName = '';
    }

    register(userInfo) {
        return this.http.post(this.registerAPI, JSON.stringify(userInfo), httpOptions);
    }

    login(credentials) {
        return this.http.post(this.loginAPI, JSON.stringify(credentials), httpOptions);
    }

    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('first_name');
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('last_name');
        sessionStorage.removeItem('first_name');
        sessionStorage.removeItem('user_role');
        sessionStorage.removeItem('user_role_id');
        sessionStorage.removeItem('logintoken');
        sessionStorage.removeItem('google_id');
        sessionStorage.removeItem('avatar');
        sessionStorage.removeItem('two_fa');
        this.router.navigate(['/']);
    }

    isLoggedIn() {
        this.firstName = sessionStorage.getItem('first_name');
        if (!this.firstName) {
            this.firstName = '';
        }

        const token = sessionStorage.getItem('token');
        if (!token) {
            return false;
        }
        return true;
    }

    isTwoFA() {
        this.two_fa_status = sessionStorage.getItem('two_fa');
        if (this.two_fa_status == 'true'){
            return true;
        }
        else {
            return false;
        }
    }

    isActive(email) {
        return this.http.post(this.isactiveAPI, email , httpOptions);
    }

    getUserId() {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) {
            return '';
        }
        return userId;
    }

    getUserRole() {
        const userRole = sessionStorage.getItem('user_role_id');
        if (!userRole) {
            return '';
        }
        return userRole;
    }

    getFirstName() {
        const firstName = sessionStorage.getItem('first_name');
        if (!firstName) {
            return '';
        }
        return firstName;
    }

    getLastName() {
        const lastName = sessionStorage.getItem('last_name');
        if (!lastName) {
            return '';
        }
        return lastName;
    }

    getEmail() {
        const email = sessionStorage.getItem('email');
        if (!email) {
            return '';
        }
        return email;
    }
    getUserData() {
        let userId;
        userId = sessionStorage.getItem('user_id');
        return this.http.post(this.getUserAPI, {'id': userId}, httpOptions);
    }

    updateUser(user) {
        let userId;
        userId = sessionStorage.getItem('user_id');
        return this.http.post(this.updateAPI, {'id': userId, 'user': user}, httpOptions);
    }

    checkPassword(pwd, npwd, con_pwd) {
        let userId;
        userId = sessionStorage.getItem('user_id');
        return this.http.post(this.checkAPI, {'id': userId, 'password': pwd, 'newpassword': npwd, 'confirmpassword': con_pwd}, httpOptions);
    }

    sendCode(email){
        return this.http.post(this.sendcodeAPI, email, httpOptions);
    }

    verifyEmail(code){
        return this.http.post(this.verifycodeAPI, code, httpOptions);
    }

    getloginToken(email) {
        return this.http.post(this.getloginTokenAPI, {'email' : email}, httpOptions);
    }

    googleLogin(idtoken){
        return this.http.post(this.googleloginAPI, {token :  idtoken}, httpOptions);
    }

    contact(data){
        return this.http.post(this.contactAPI, data, httpOptions);
    }
}

export const AUTH_PROVIDERS: Array<any> = [
    { provide: AuthServiceApp, useClass: AuthServiceApp }
];
