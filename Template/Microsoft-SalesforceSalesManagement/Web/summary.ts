import { SummaryViewModel } from '../../common/web/directives/summarytemplate';

export class Summary extends SummaryViewModel {
    constructor() {
        super();

        let store = this.MS.DataService.GetDataStore();
        let payload: any={};

        payload.Subscription = store["SelectedSubscription"][0]["SubscriptionId"];  
        payload.ResourceGroup = store["SelectedResourceGroup"][0];      
        payload.SqlServer = store["Server"][0];
        payload.Database = store["Database"][0];
        
        this.init(payload);
    }
}