import { SummaryViewModel } from '../../common/web/directives/summarytemplate';

export class Summary extends SummaryViewModel {
    constructor() {
        super();

        let payload = {
            'Source Sql Server': this.MS.DataService.GetItemFromDataStore('source.html', 'Server'),
            'Source Sql Database': this.MS.DataService.GetItemFromDataStore('source.html', 'Database'),
            'Target Sql Server': this.MS.DataService.GetItemFromDataStore('target.html', 'Server'),
            'Target Sql Database': this.MS.DataService.GetItemFromDataStore('target.html', 'Database'),
            'Target Sql Username': this.MS.DataService.GetItemFromDataStore('target.html', 'Username')
        };

        this.init(payload);
    }
}