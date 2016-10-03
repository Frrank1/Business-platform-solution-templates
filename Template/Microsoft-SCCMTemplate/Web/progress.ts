import { ProgressViewModel } from '../../common/web/directives/progresstemplate';

export class ProgressVM extends ProgressViewModel {
    constructor() {
        super();
        this.finishedActionName = 'Microsoft-GetTaskStatus';
        this.showCounts = true;
        this.sqlServerIndex = 1;
        this.successMessage = 'Data is now pulling! Meanwhile you can download your Power BI report and start exploring your data.';
        this.targetSchema = 'pbist_sccm';
    }

    async OnLoaded() {
        let body: any = {};
        body.FileName = 'SCCMSolutionTemplate.pbix';
        body.SqlServerIndex = this.sqlServerIndex;

        let response = await this.MS.HttpService.Execute('Microsoft-WranglePBI', body);
        if (response.isSuccess) {
            this.pbixDownloadLink = response.response.value;
            this.isPbixReady = true;
        }

        super.OnLoaded();
    }
}