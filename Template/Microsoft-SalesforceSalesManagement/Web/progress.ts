import { ProgressViewModel } from '../../common/Web/directives/progresstemplate';

export class ProgressVM extends ProgressViewModel {
    successMessage: string = 'All done!';

    constructor() {
        super();
    }

    async OnLoaded() {
        let body: any = {};
        body.FileName = 'SalesManagementReport.pbix';
        this.showCounts = true;
        let response = await this.MS.HttpService.Execute('Microsoft-WranglePBI', body);
            if (response.isSuccess) {
                this.pbixDownloadLink = response.response.value;
                this.isPbixReady = true;
                }
            super.OnLoaded();
    }
}