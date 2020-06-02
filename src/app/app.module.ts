import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { JwtConfigurationService, jwtOptions, loadConfigFromFile } from './services/jwt-configuration.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptions.options
            }
        })
    ],
    providers: [
        JwtConfigurationService,
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfigFromFile,
            deps: [
                JwtConfigurationService
            ],
            multi: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
