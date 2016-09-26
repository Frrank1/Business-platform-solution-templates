import { SqlServerViewModel } from '../../common/Web/directives/sqlservertemplate';

export class Source extends SqlServerViewModel {
    constructor() {
        super();
        this.isAzureSql = true;
        this.showAllWriteableDatabases = false;
        this.showAzureSql = false;
        this.showNewSqlOption = true;
        this.subtitle = 'Set up a connection to SQL so we can bring in your Salesforce data.';
        this.title = 'Connect to your SQL Database';
        this.sqlInstance = 'NewSql';
    }
}