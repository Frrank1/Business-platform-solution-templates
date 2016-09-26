import { SummaryViewModel } from '../../common/Web/directives/summarytemplate';

export class Summary extends SummaryViewModel {
    constructor() {
        super();

        let payload = {
            'Sql Server': this.MS.DataService.GetItemFromDataStore('target.html', 'Server'),
            'Sql Database': this.MS.DataService.GetItemFromDataStore('target.html', 'Database'),
            'Sql Username': this.MS.DataService.GetItemFromDataStore('target.html', 'Username'),
            'Search Terms': this.MS.DataService.GetItemFromDataStore('Customize', 'SearchQuery'),
            'Twitter Handles': this.MS.DataService.GetItemFromDataStore('Customize', 'TwitterHandles')
        }; 

        this.init(payload);
    }
}