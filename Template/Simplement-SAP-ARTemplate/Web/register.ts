import { ViewModelBase } from '../../common/web/services/viewmodelbase';

export class Register extends ViewModelBase {
    company: string = '';
    email: string = '';
    firstName: string = '';
    lastName: string = '';

    constructor() {
        super();
        this.isValidated = false;
        this.useDefaultValidateButton = true;
    }

    async OnValidate() {
        super.OnValidate();

        this.MS.DataService.AddToDataStore('SAP', 'CompanyName', this.company);
        this.MS.DataService.AddToDataStore('SAP', 'RowKey', this.email);
        this.MS.DataService.AddToDataStore('SAP', 'FirstName', this.firstName);
        this.MS.DataService.AddToDataStore('SAP', 'LastName', this.lastName);

        let response = await this.MS.HttpService.Execute('Microsoft-PushToSimplement', {});

        if (response.isSuccess) {
            this.isValidated = true;
            this.showValidation = true;
        }
    }
}