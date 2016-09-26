import { ViewModelBase } from '../../common/Web/services/viewmodelbase';

export class Customize extends ViewModelBase {
    accounts: string = '';
    twitterHandleName: string = '';
    twitterHandleId: string = '';

    constructor() {
        super();
        this.isValidated = true;
    }

    async OnValidate() {
        super.OnValidate();
        let body: any = {};
        body.Accounts = this.accounts;
        let response = await this.MS.HttpService.Execute('Microsoft-ValidateTwitterAccount', body);
        if (response.isSuccess) {
            this.isValidated = true;
            this.showValidation = true;
            this.twitterHandleName = response.response.twitterHandle;
            this.twitterHandleId = response.response.twitterHandleId;
        }

        this.MS.DataService.AddToDataStore('Customize', 'TwitterHandles', this.accounts);
    }

    async Invalidate() {
        super.Invalidate();
        if (!this.accounts) {
            this.isValidated = true;
        }
    }

    async NavigatingNext(): Promise<boolean> {
        this.MS.DataService.AddToDataStore('Customize1', 'SqlGroup', 'SolutionTemplate');
        this.MS.DataService.AddToDataStore('Customize1', 'SqlSubGroup', 'Twitter');
        this.MS.DataService.AddToDataStore('Customize1', 'SqlEntryName', 'twitterHandle');
        this.MS.DataService.AddToDataStore('Customize1', 'SqlEntryValue', this.twitterHandleName);

        this.MS.DataService.AddToDataStore('Customize2', 'SqlGroup', 'SolutionTemplate');
        this.MS.DataService.AddToDataStore('Customize2', 'SqlSubGroup', 'Twitter');
        this.MS.DataService.AddToDataStore('Customize2', 'SqlEntryName', 'twitterHandleId');
        this.MS.DataService.AddToDataStore('Customize2', 'SqlEntryValue', this.twitterHandleId);
        return super.NavigatingNext();
    }
}