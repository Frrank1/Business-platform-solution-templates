import { ViewModelBase } from '../../common/Web/services/viewmodelbase';

export class AzureDataFactory extends ViewModelBase 
{
    pipelineFrequency: string = '';
    pipelineInterval: number;
    emails: string = '';

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

        let mailregex = new RegExp("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/");
            
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

        this.MS.DataService.AddToDataStore('ADF', 'EmailAddresses', this.emails);
        this.MS.DataService.AddToDataStore('ADF', 'postDeploymentPipelineFrequency', this.pipelineFrequency);
        this.MS.DataService.AddToDataStore('ADF', 'postDeploymentPipelineInterval', this.pipelineInterval.toString());
        this.MS.DataService.AddToDataStore('ADF', 'pipelineStart', null);
        this.MS.DataService.AddToDataStore('ADF', 'pipelineEnd', null);
        this.MS.DataService.AddToDataStore('ADF', 'pipelineType', null);
                                            
        this.MS.DataService.AddToDataStore('ADF', 'pipelineFrequency', 'Month');
        this.MS.DataService.AddToDataStore('ADF', 'pipelineInterval', 1);
        this.MS.DataService.AddToDataStore('ADF', 'pipelineStart', '');
        this.MS.DataService.AddToDataStore('ADF', 'pipelineEnd', '');
        this.MS.DataService.AddToDataStore('ADF', 'pipelineType', "PreDeployment");
    }
}