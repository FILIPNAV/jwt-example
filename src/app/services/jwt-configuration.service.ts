import { Injectable } from '@angular/core';
import { JwtConfiguration } from '../models/jwt-configuration';
import { HttpClient } from '@angular/common/http';

/**
 * Factrory for load config from file
 */
export function loadConfigFromFile(configService: JwtConfigurationService) {
    const jsonFile = `assets/config.json`;
    return () => {
        return configService.loadAppConfigFromFile(jsonFile);
    };
}

export function getAuthToken() {
    return 'SOME_TOKEN';
}

export function jwtOptionsFactory(options) {
    let whitelist = options.whitelistedDomains || [];

    function addToDomainWhitelist(domain) {
        if (Array.isArray(domain)) {
            whitelist = [ ...whitelist, ...domain ];
        } else {
            whitelist = [ ...whitelist, domain ];
        }
    }

    return {
        addToDomainWhitelist,
        options: () => ({
            ...options,
            whitelistedDomains: whitelist
        })
    };
}

export const jwtOptions = jwtOptionsFactory({
    tokenGetter: getAuthToken,
    whitelistedDomains: [ 'domain-1.com' ]
});

@Injectable()
export class JwtConfigurationService {

    private config: JwtConfiguration;

    constructor(private httpClient: HttpClient) { }

    public loadAppConfigFromFile(jsonFile: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            return this.httpClient.get(jsonFile).toPromise().then((response: JwtConfiguration) => {
                this.config = response;
                jwtOptions.addToDomainWhitelist(this.config.whitelistedDomains);
                resolve();
            }).catch((response: any) => {
                console.log(response);
                reject(`Could not load file '${ jsonFile }': ${ JSON.stringify(response) }`);
            });
        });
    }
}
