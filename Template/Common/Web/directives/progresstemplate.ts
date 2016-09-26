import { bindable } from 'aurelia-framework';
import { ViewModelBase } from '../services/viewmodelbase';

export class progresstemplate {
    @bindable viewmodel = null;
}

export class ProgressViewModel extends ViewModelBase {
    finishedActionName: string = '';
    isDataPullDone: boolean = false;
    isPbixReady: boolean = false;
    pbixDownloadLink: string = '';
    recordCounts: any[] = [];
    showCounts: boolean = false;
    successMessage: string = 'All done! You can now download your Power BI report and start exploring your data.';
    targetSchema: string = '';

    constructor() {
        super();
        this.showNext = false;
    }

    async OnLoaded() {
        await this.MS.DeploymentService.ExecuteActions();
        this.QueryRecordCounts();
    }

    async QueryRecordCounts() {
        if (this.showCounts && !this.isDataPullDone && !this.MS.DeploymentService.hasError) {
            let body: any = {};
            body.FinishedActionName = this.finishedActionName;
            body.IsWaiting = false;
            body.SqlServerIndex = 1;
            body.TargetSchema = this.targetSchema;

            let response = await this.MS.HttpService.Execute('Microsoft-GetDataPullStatus', body);
            if (response.isSuccess) {
                this.isDataPullDone = response.response.isFinished;
                this.recordCounts = response.response.status;
                this.QueryRecordCounts();
            }
        }
    }
}