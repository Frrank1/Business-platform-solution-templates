import { ProgressViewModel } from '../../common/web/directives/progresstemplate';

export class ProgressVM extends ProgressViewModel {
  constructor() {
      super();
    }

  async OnLoaded() {

      let sqlbody = {};

      sqlbody['SqlCredentials'] = {};
      sqlbody['SqlCredentials']['Server'] = "localhost";
      sqlbody['SqlCredentials']['User'] = "sa";
      sqlbody['SqlCredentials']['Password'] = "password";
      sqlbody['SqlCredentials']['AuthType'] = 'windows';
      sqlbody['SqlCredentials']['Database'] = "testdb";

      let sqlresponse = await this.MS.HttpService.Execute('Microsoft-GetSqlConnectionString', sqlbody);
      if (sqlresponse.isSuccess) {
          this.MS.DataService.AddToDataStore(this.MS.NavigationService.GetCurrentSelectedPage().PageName,
              'SqlConnectionString',
              sqlresponse.response.value);
      }

      let body: any = {};
      body.FileName = 'dummy.pbix';
      body.SqlServerIndex = 0;

      let response = await this.MS.HttpService.Execute('Microsoft-WranglePBI', body);
      if (response.isSuccess) {
          this.pbixDownloadLink = response.response.value;
          this.isPbixReady = true;
      }

      super.OnLoaded();
  }
}