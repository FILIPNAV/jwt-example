import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent {

    constructor(private httpClient: HttpClient) {}

    public testRequest(domain: string) {
        this.httpClient.get(`https://${domain}/api/heartbeat`).subscribe();
    }
}
