import { GettingStartedViewModel } from '../../common/web/directives/gettingstartedtemplate';

export class GettingStarted extends GettingStartedViewModel {
    constructor() {
        super();
        this.architectureDiagram = 'dist/Template/Microsoft-SCCMTemplate/Web/Images/SCCMArchitectureDiagram.png';
        this.features = [
            'Scalable and extensible solution with minimum set up and maintenance considerations',
            'Data pulled daily from System Center Configuration Manager & stored in a SQL database optimized for reporting',
            'Import data into powerful Power BI reports'
        ];
        this.requirements = [
            'System Center 2012 Configuration Manager R2 SP1 or later. Read access to System Center Configuration Manager database is required.',
            'Destination database: Azure SQL database or SQL Server database (SQL Server 2008 R2 SP3 or later).',
            'For the machine where the installation is run, Microsoft .NET Framework 4.5 or later & PowerShell version 3.0 or later.',
            'Power BI Desktop (latest version)',
            'Power BI Pro (to share the template with your organization)'
        ];
        this.subTitle = 'Welcome to the public preview of the System Center Configuration Manager solution template.';
        this.templateName = 'System Center Configuration Manager';

        // Only show the  download link on the website, but show it 
        this.isDownload = !this.MS.HttpService.isOnPremise;
    }
}