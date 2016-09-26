import { ViewModelBase } from '../../common/Web/services/viewmodelbase';

export class Twitter extends ViewModelBase {
    authToken: any = {};
    isAuthenticated: boolean = false;
    selectedSubscriptionId: string;
    subscriptionsList: any[];

    constructor() {
        super();
        this.isValidated = false;
    }

    async OnLoaded() {
        this.isAuthenticated = false;
        this.isValidated = false;
        this.showValidation = false;

        let queryParam = this.MS.DataService.GetItem('queryUrl');
        if (queryParam) {
            let code = this.MS.UtilityService.GetQueryParameterFromUrl('code', queryParam);
            if (code) {
                this.MS.DataService.AddToDataStore('Twitter', 'TwitterCode', code);

                let response = await this.MS.HttpService.Execute('Microsoft-ConsentTwitterConnectionToLogicApp', {});
                if (response.isSuccess) {
                    this.isAuthenticated = true;
                    this.isValidated = true;
                    this.showValidation = true;
                }
            } else {
                // Do existing flow
                let response = await this.MS.HttpService.Execute('Microsoft-VerifyTwitterConnection', {});
                this.MS.ErrorService.details = '';
                this.MS.ErrorService.message = '';
                if (response.isSuccess) {
                    this.isAuthenticated = true;
                    this.isValidated = true;
                    this.showValidation = true;
                }
            }
            

            this.MS.DataService.RemoveItem('queryUrl');
        } else
        {
            // No redirect was present, dont bother checking
            // We still check for now
            let response = await this.MS.HttpService.Execute('Microsoft-VerifyTwitterConnection', {});
            this.MS.ErrorService.details = '';
            this.MS.ErrorService.message = '';
            if (response.isSuccess) {
                this.isAuthenticated = true;
                this.isValidated = true;
                this.showValidation = true;
            }
        }
    }

    async connect() {
        if (!this.isAuthenticated) {
            let response = await this.MS.HttpService.Execute('Microsoft-CreateTwitterConnectionToLogicApp', {});
            if (response.isSuccess) {
                window.location.href = response.response['Consent']['value'][0]['link'];
            }
        }
    }
}