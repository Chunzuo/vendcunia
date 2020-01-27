import { ChatAdapter, User, Message, UserStatus } from 'ng-chat';
import { Observable } from 'rxjs/Rx';
import { Socket } from 'ng-socket-io';
import { Http, Response } from '@angular/http';
import { AuthServiceApp } from '../services/auth/auth.service';
import { AppConfig } from '../../config/app.config';

export class SocketIOAdapter extends ChatAdapter {

    private socket: Socket;
    private http: Http;
    private userId: string;         // socket id
    private authService: AuthServiceApp;

    private getContactAPI = AppConfig.endpoints.frontend + '/contacts/get';

    constructor(userId: string,
        socket: Socket,
        http: Http,
        authService: AuthServiceApp) {
            super();
            this.socket = socket;
            this.http = http;
            this.userId = userId;
            this.authService = authService;

            this.InitializeSocketListeners();
    }

    listFriends(): Observable<User[]> {
        return this.http.post(this.getContactAPI, { email: this.authService.getEmail() })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getMessageHistory(userId: any): Observable<Message[]> {
        return Observable.of([]);
    }

    sendMessage(message: Message): void {
        this.socket.emit('sendMessage', {
            sender_email: this.authService.getEmail(),
            receiver_email: '',
            message: message
        });
    }

    public setUserId(userId): void {
        this.userId = userId;
    }

    public InitializeSocketListeners(): void {
        this.socket.on('messageReceived', (messageWrapper) => {
            this.onMessageReceived(messageWrapper.user, messageWrapper.message);
        });

        this.socket.on('friendsListChanged', (usersCollection: Array<User>) => {
            this.onFriendsListChanged(usersCollection);
        });
    }

}
