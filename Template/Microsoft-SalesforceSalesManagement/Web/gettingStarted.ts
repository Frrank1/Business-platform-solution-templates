import { GettingStartedViewModel } from '../../common/web/directives/gettingstartedtemplate';

export class GettingStarted extends GettingStartedViewModel {
    constructor() {
        super();

        this.architectureDiagram = 'dist/Template/Microsoft-SalesforceSalesManagement/Web/images/salesforceArchitectureDiagram.png';
        this.features = [
            'Full cloud solution with minimum set up and maintenance considerations',
            'Data pulled from Salesforce into an Azure SQL Database using Azure Data Factory',
            'Connect to Azure SQL and import data into Power BI'
        ];
        this.requirements = [
            'Azure Subscription',
            'Salesforce Subscription',
            'Azure SQL Database',
            'Power BI Desktop (latest version)',
            'Power BI Pro (to share the template with your organization)'
        ];
        this.subTitle = 'Welcome to the Public Preview of the Sales Management solution template. Answer a couple of questions and we\'ll figure out the right solution for you.';
        this.templateName = 'Salesforce Sales Management';
    }
}