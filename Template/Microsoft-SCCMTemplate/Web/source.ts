import { SqlServerViewModel } from '../../common/web/directives/sqlservertemplate';

export class Source extends SqlServerViewModel {
    constructor() {
        super();
        this.hideSqlAuth = true;
        this.title = 'Connect to your System Center Configuration Manager database';
        this.showAzureSql = false;
        this.showCredsWhenWindowsAuth = true;
        this.logInAsCurrentUser = true;
        this.showLogInAsCurrentUser = true;
        this.subtitle = 'Set up a connection to your SCCM database so we can bring in your data. The credentials used to connect to SCCM will be used to create a scheduled task to pull data from SCCM.';
        this.validateWindowsCredentials = true;
    }

    async NavigatingNext(): Promise<boolean> {
        let isSuccess: boolean = await super.NavigatingNext();

        if (isSuccess) {
            let response = await this.MS.HttpService.Execute("Microsoft-CheckSCCMVersion", {});
            isSuccess = response.isSuccess;
        }

        return isSuccess;
    }
}