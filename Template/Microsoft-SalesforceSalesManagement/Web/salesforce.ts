import { ViewModelBase } from '../../common/Web/services/viewmodelbase';

export class Salesforce extends ViewModelBase {
    salesforceUsername: string = '';
    salesforcePassword: string = '';
    salesforceToken: string = '';

    constructor() {
        super();
        this.isValidated = false;
        this.showValidation = false;
    }

    async OnValidate() {
        super.OnValidate();

        let payload: any = {};

        payload.SalesforceUser = this.salesforceUsername;
        payload.SalesforcePassword = this.salesforcePassword;
        payload.SalesforceToken = this.salesforceToken;              
        payload.ObjectTables = "Opportunity,Account,Lead,Product2,OpportunityLineItem,OpportunityStage,User,UserRole";

        this.MS.DataService.AddToDataStore('Salesforce', 'Salesforce', payload);

        let salesforceLoginResponse = await this.MS.HttpService.Execute("Microsoft-ValidateSalesforceCredentials", payload.Salesforce);

        if (salesforceLoginResponse.isSuccess) 
        {
            this.isValidated = true;
            this.showValidation = true;

            let response: any={};
            response.SalesforceEditionType = salesforceLoginResponse.response;
            let salesforceTypeSuccess = await this.MS.HttpService.Execute("Microsoft-RetrieveSalesforceSubscriptionType", response.SalesforceEditionType);

            if (salesforceTypeSuccess.isSuccess) 
            {
                this.MS.DataService.AddToDataStore('Salesforce', 'SalesforceEditionType', salesforceTypeSuccess.response);
            }
        }
    }
}