import { SqlServerViewModel } from '../../common/web/directives/sqlservertemplate';

export class Target extends SqlServerViewModel {
    constructor() {
        super();
        this.checkSqlVersion = true;
        this.title = 'Connect to your SQL database';
        this.subtitle = 'Set up a connection to your target database so we can transfer your data.';
    }

    async NavigatingNext(): Promise<boolean> {
        this.MS.DataService.AddToDataStore('SCCM', 'CredentialTarget', 'pbi_sccm');
        this.MS.DataService.AddToDataStore('SCCM', 'CredentialUsername', this.username);
        this.MS.DataService.AddToDataStore('SCCM', 'CredentialPassword', this.password);

        let response = this.MS.UtilityService.UseImpersonation()
            ? await this.MS.HttpService.ExecuteWithImpersonation('Microsoft-CredentialManagerWrite', {})
            : await this.MS.HttpService.Execute('Microsoft-CredentialManagerWrite', {});

        if (response.isSuccess) {
            return super.NavigatingNext();
        }

        return false;
    }
}