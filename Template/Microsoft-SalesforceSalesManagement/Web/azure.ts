import { ViewModelBase } from '../../common/Web/services/viewmodelbase';

enum AzureConnection {
    Microsoft,
    Organizational
}

export class Azure extends ViewModelBase {
    authToken: any = {};
    azureConnection = AzureConnection;
    azureDirectory: string = '';
    connectionType: AzureConnection = AzureConnection.Organizational;
    selectedSubscriptionId: string = '';
    showAdvanced: boolean = false;
    subscriptionsList: any[] = [];

    constructor() {
        super();
        this.isValidated = false;
    }

    async OnLoaded() {
        this.isValidated = false;
        this.showValidation = false;
        if (this.subscriptionsList.length > 0) {
            this.isValidated = true;
            this.showValidation = true;
        } else {
            let queryParam = this.MS.DataService.GetItem('queryUrl');
            if (queryParam) {
                let token = this.MS.UtilityService.GetQueryParameterFromUrl('code', queryParam);
                var tokenObj = { code: token };
                this.authToken = await this.MS.HttpService.Execute('Microsoft-GetAzureToken', tokenObj);
                if (this.authToken.isSuccess) {
                    this.MS.DataService.AddToDataStore('Azure', 'Token', this.authToken.response.Token);
                    let subscriptions = await this.MS.HttpService.Execute('Microsoft-GetAzureSubscriptions', {});
                    if (subscriptions.isSuccess) {
                        this.isValidated = true;
                        this.showValidation = true;
                        this.subscriptionsList = subscriptions.response.value;
                        if (!this.subscriptionsList || (this.subscriptionsList && this.subscriptionsList.length === 0)) {
                            this.MS.ErrorService.message = 'You do not have any Azure subscriptions linked to your account. You can get started with a free trial by clicking the link at the top of the page.';
                        }
                    }
                } else {
                    this.MS.ErrorService.message = 'It looks you tried to sign in with a Microsoft account. We currently only support organizational accounts.';
                }
            }
        }
    }

    AzureTrialClicked(event) {
        this.MS.LoggerService.TrackEvent('AzureTrialClicked');
        return event;
    }

    AzurePricingClicked() {
        this.MS.LoggerService.TrackEvent('AzurePricingClicked');
    }

    async connect() {
        if (this.connectionType.toString() === AzureConnection.Microsoft.toString()) {
            this.MS.DataService.AddToDataStore('Azure', 'AADTenant', this.azureDirectory);
        } else {
            this.MS.DataService.AddToDataStore('Azure', 'AADTenant','common');
        }

        let response = await this.MS.HttpService.Execute('Microsoft-GetAzureAuthUri', {});
        window.location.href = response.response.value;
    }

    async NavigatingNext(): Promise<boolean> {
        let subscriptionObject = this.subscriptionsList.find(x => x.SubscriptionId === this.selectedSubscriptionId);
        this.MS.DataService.AddToDataStore('Azure', 'SelectedSubscription', subscriptionObject);

        var uniqueId = this.MS.UtilityService.GetUniqueId(18);
        var uniqueIdFunction = this.MS.UtilityService.GetUniqueId(18);

        this.MS.DataService.AddToDataStore('Azure', 'SelectedResourceGroup', 'SolutionTemplate' + '-' + this.MS.UtilityService.GetUniqueId(5));

        let locationsResponse = await this.MS.HttpService.Execute('Microsoft-GetLocations', {});
        if (locationsResponse.isSuccess) {
            this.MS.DataService.AddToDataStore('Azure', 'SelectedLocation', locationsResponse.response.value[5]);
        }

        let response = await this.MS.HttpService.Execute('Microsoft-CreateResourceGroup', {});

        if (!response.isSuccess) {
            return false;
        }

        return super.NavigatingNext();
    }
}