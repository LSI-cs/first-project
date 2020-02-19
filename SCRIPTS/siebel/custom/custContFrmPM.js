if (typeof(SiebelAppFacade.CustContFrmPM) === "undefined")
{
    SiebelJS.Namespace("SiebelAppFacade.CustContFrmPM");
    define("siebel/custom/custContFrmPM", ["siebel/pmodel"], function()
    {
        SiebelAppFacade.CustContFrmPM = (function()
        {

            function CustContFrmPM(pm)
            {
                SiebelAppFacade.CustContFrmPM.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(CustContFrmPM, SiebelAppFacade.PresentationModel);

            CustContFrmPM.prototype.Init = function()
            {
				console.log("Init loaded");
                SiebelAppFacade.CustContFrmPM.superclass.Init.apply(this, arguments);
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
			
			
			CustContFrmPM.prototype.OnFieldChange = function(control,value)
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
			
			CustContFrmPM.prototype.OnSelectionChange = function(control,value)
			{
				console.log(">>>PM OnSelectionChange");
				let  sId=this.Get("GetBusComp").GetFieldValue("Id");
					if(this.Get('ContactId')!=sId)
					{
						this.SetProperty('ContactId', sId);
						console.log(">>>OnSelectionChange ContactId " + sId);
					}
				

			}
			
			
            CustContFrmPM.prototype.Setup = function(propSet)
            {
				console.log("Setup loaded");
                SiebelAppFacade.CustContFrmPM.superclass.Setup.apply(this, arguments);
            }

            return CustContFrmPM;
        }());
        return "SiebelAppFacade.CustContFrmPM";
    })
}