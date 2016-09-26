import { ViewModelBase } from '../../common/Web/services/viewmodelbase';

export class Customize extends ViewModelBase {
    searchQuery: string = '';

    constructor() {
        super();
        this.isValidated = false;
    }

    async OnValidate() {
        super.OnValidate();
        if (this.searchQuery.length > 0) {
            this.isValidated = true;
            this.showValidation = true;
            this.MS.DataService.AddToDataStore('Customize', 'SearchQuery', this.searchQuery);
        }
    }
}