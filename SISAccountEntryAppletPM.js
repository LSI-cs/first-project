if (typeof(SiebelAppFacade.SISAccountEntryAppletPM) === "undefined")
{
    SiebelJS.Namespace("SiebelAppFacade.SISAccountEntryAppletPM");
    define("siebel/custom/SISAccountEntryAppletPM", ["siebel/pmodel"], function()
    {
        SiebelAppFacade.SISAccountEntryAppletPM = (function()
        {

            function SISAccountEntryAppletPM(pm)
            {
                SiebelAppFacade.SISAccountEntryAppletPM.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(SISAccountEntryAppletPM, SiebelAppFacade.PresentationModel);

            SISAccountEntryAppletPM.prototype.Init = function()
            {
				console.log("Init loaded");
                SiebelAppFacade.SISAccountEntryAppletPM.superclass.Init.apply(this, arguments);
				this.AddMethod('FieldChange', this.OnFieldChange, {
                    sequence: false,
                    scope: this
                });
				this.AddMethod('ShowSelection', this.OnSelectionChange, {
                        sequence: false,
                        scope: this
                    });
				this.AddProperty('ContactId', false);
            }
			
			
			SISAccountEntryAppletPM.prototype.OnFieldChange = function(control,value)
			{
				console.log(">>>OnFieldChange");
				
				if (control.GetFieldName() == "Id") {
					let sId=this.Get("GetBusComp").GetFieldValue("Id");
					if(this.Get('ContactId')!=sId)
					{
						console.log(">>>OnFieldChange ContactId " + sId);
						this.SetProperty('ContactId', sId);
					}
				}
			}
			
			SISAccountEntryAppletPM.prototype.OnSelectionChange = function(control,value)
			{
				console.log(">>>PM OnSelectionChange");
				let  sId=this.Get("GetBusComp").GetFieldValue("Id");
					if(this.Get('ContactId')!=sId)
					{
						this.SetProperty('ContactId', sId);
						console.log(">>>OnSelectionChange ContactId " + sId);
					}
				

			}
			
			
            SISAccountEntryAppletPM.prototype.Setup = function(propSet)
            {
				console.log("Setup loaded");
                SiebelAppFacade.SISAccountEntryAppletPM.superclass.Setup.apply(this, arguments);
            }

            return SISAccountEntryAppletPM;
        }());
        return "SiebelAppFacade.SISAccountEntryAppletPM";
    })
}