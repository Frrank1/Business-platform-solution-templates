import { ViewModelBase } from '../../common/Web/services/viewmodelbase';

export class AzureDataFactory extends ViewModelBase 
{
    pipelineFrequency: string = '';
    pipelineInterval: number;

    constructor() 
    {
        super();
        this.isValidated = false;
        this.showValidation = false;
        this.pipelineFrequency = "Minute";
    }

    async OnValidate() 
    {
        super.OnValidate();
            
        if ((this.pipelineFrequency != "Minute" && this.pipelineInterval > 0) || (this.pipelineFrequency == "Minute" && this.pipelineInterval > 14)) 
        {
         this.isValidated = true;
         this.showValidation = true;
        }
        else
        {
         this.isValidated = false;
         this.showValidation = false;
         this.MS.ErrorService.message = "Validation failed. The Interval needs to be a value greater than 0. If Frequency is set to Minute, the Interval needs to be equal to or greater than 15.";
        }
        
        this.MS.DataService.AddToDataStore('Salesforce', 'postDeploymentPipelineFrequency', this.pipelineFrequency);
        this.MS.DataService.AddToDataStore('Salesforce', 'postDeploymentPipelineInterval', this.pipelineInterval.toString());
        this.MS.DataService.AddToDataStore('Salesforce', 'pipelineStart', null);
        this.MS.DataService.AddToDataStore('Salesforce', 'pipelineEnd', null);
        this.MS.DataService.AddToDataStore('Salesforce', 'pipelineType', null);

        this.MS.DataService.AddToDataStore('Salesforce', 'pipelineFrequency', 'Month');
        this.MS.DataService.AddToDataStore('Salesforce', 'pipelineInterval', 1);
        this.MS.DataService.AddToDataStore('Salesforce', 'pipelineStart', '');
        this.MS.DataService.AddToDataStore('Salesforce', 'pipelineEnd', '');
        this.MS.DataService.AddToDataStore('Salesforce', 'pipelineType', "PreDeployment");
    }
}