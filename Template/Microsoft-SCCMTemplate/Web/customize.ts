import { ViewModelBase } from '../../common/web/services/viewmodelbase';

export class Customize extends ViewModelBase {
    dailyTrigger: string = '2:00';
    dailyTriggers: string[] = [];
    dataRetentionDays: string = '120';
    endpointComplianceTarget: string = '0.99';
    healthEvaluationTarget: string = '0.99';

    constructor() {
        super();
        this.dailyTriggers = this.MS.UtilityService.GenerateDailyTriggers();
        this.isValidated = false;
        this.useDefaultValidateButton = true;
    }

    async NavigatingNext(): Promise<boolean> {
        let sourceServer = this.MS.DataService.GetItemFromDataStore('source.html', 'Server');
        let sourceDatabase = this.MS.DataService.GetItemFromDataStore('source.html', 'Database');

        let targetServer = this.MS.DataService.GetItemFromDataStore('target.html', 'Server');
        let targetDatabase = this.MS.DataService.GetItemFromDataStore('target.html', 'Database');

        this.MS.DataService.AddToDataStore('SCCM', 'TaskDescription', 'Power BI Solution Template - SCCM');
        this.MS.DataService.AddToDataStore('SCCM', 'TaskFile', 'dataload.ps1');
        this.MS.DataService.AddToDataStore('SCCM', 'TaskName', 'Power BI Solution Template - SCCM');
        this.MS.DataService.AddToDataStore('SCCM', 'TaskParameters', `-SourceServer '${sourceServer}' -SourceDatabase '${sourceDatabase}' -DestinationServer '${targetServer}' -DestinationDatabase '${targetDatabase}'`);
        this.MS.DataService.AddToDataStore('SCCM', 'TaskProgram', 'powershell');
        this.MS.DataService.AddToDataStore('SCCM', 'TaskStartTime', this.dailyTrigger);

        this.MS.DataService.AddToDataStore('Customize', 'SqlGroup', 'SolutionTemplate');
        this.MS.DataService.AddToDataStore('Customize', 'SqlSubGroup', 'System Center');
        this.MS.DataService.AddToDataStore('Customize', 'SqlEntryName', 'endpointcompliancetarget');
        this.MS.DataService.AddToDataStore('Customize', 'SqlEntryValue', this.endpointComplianceTarget);

        this.MS.DataService.AddToDataStore('Customize1', 'SqlGroup', 'SolutionTemplate');
        this.MS.DataService.AddToDataStore('Customize1', 'SqlSubGroup', 'System Center');
        this.MS.DataService.AddToDataStore('Customize1', 'SqlEntryName', 'healthevaluationtarget');
        this.MS.DataService.AddToDataStore('Customize1', 'SqlEntryValue', this.healthEvaluationTarget);

        this.MS.DataService.AddToDataStore('Customize2', 'SqlGroup', 'SolutionTemplate');
        this.MS.DataService.AddToDataStore('Customize2', 'SqlSubGroup', 'System Center');
        this.MS.DataService.AddToDataStore('Customize2', 'SqlEntryName', 'dataretentiondays');
        this.MS.DataService.AddToDataStore('Customize2', 'SqlEntryValue', this.dataRetentionDays);

        return super.NavigatingNext();
    }

    OnValidate() {
        super.OnValidate();

        let dataRetentionDays: number = parseInt(this.dataRetentionDays);
        let endpointComplianceTarget: number = parseFloat(this.endpointComplianceTarget);
        let healthEvaluationTarget: number = parseFloat(this.healthEvaluationTarget);

        let dataRetentionDaysError: string = dataRetentionDays > 0 && dataRetentionDays <= 365
            ? ''
            : 'Data Retention Days must be a number between 1 and 365.';
        let endpointComplianceTargetError: string = endpointComplianceTarget >= 0 && endpointComplianceTarget <= 1
            ? ''
            : 'Endpoint Compliance Target must be a number between 0 and 1.';
        let healthEvaluationTargetError: string = healthEvaluationTarget >= 0 && healthEvaluationTarget <= 1
            ? ''
            : 'Health Evaluation Target must be a number between 0 and 1.';

        let validationError: string = dataRetentionDaysError || endpointComplianceTargetError || healthEvaluationTargetError;
        if (validationError) {
            this.MS.ErrorService.message = validationError;
        } else {
            this.dataRetentionDays = dataRetentionDays.toString();
            this.endpointComplianceTarget = endpointComplianceTarget.toString();
            this.healthEvaluationTarget = healthEvaluationTarget.toString();

            this.isValidated = true;
            this.showValidation = true;
        }
    }
}