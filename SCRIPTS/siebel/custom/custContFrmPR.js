if (typeof(SiebelAppFacade.CustContFrmPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.CustContFrmPR");
    define("siebel/custom/custContFrmPR", ["siebel/phyrenderer"], function() {
        SiebelAppFacade.CustContFrmPR = (function() {

            function CustContFrmPR(pm) {
                SiebelAppFacade.CustContFrmPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(CustContFrmPR, SiebelAppFacade.PhysicalRenderer);

            CustContFrmPR.prototype.Init = function() {
                console.log("InitPR loaded");
                SiebelAppFacade.CustContFrmPR.superclass.Init.call(this);
                this.AttachPMBinding("ContactId", this.GetAllert);
            }

            CustContFrmPR.prototype.ShowUI = function() {
                console.log("ShowUI loaded");
                SiebelAppFacade.CustContFrmPR.superclass.ShowUI.apply(this, arguments);


            }

            CustContFrmPR.prototype.BindData = function() {
                console.log("BindData loaded");
                SiebelAppFacade.CustContFrmPR.superclass.BindData.call(this);

                this.ConstructAllert();
            };

            CustContFrmPR.prototype.GetAllert = function() {
                let PM = this.GetPM();
                console.log("GetAllert loaded " + PM.Get('ContactId'));

				let array_f = [
                    [ "Stock", "Акция"],
                    [ "Allert","Аллерт"],
                    [ "Bankrot","Банкротство"],
                    [ "Advokat","Взаимодействие через адвоката"],
                    [ "NotThirdPerson","Запрет на взаимодействие с 3-ми лицами"],
                    [ "Zalog","Наличие залога"],
                    [ "Disability","Инвалидность"],
                    [ "NotCommBank","Отказ от взаимодействия с банком"],
                    [ "Pensioner","Пенсионер"],
                    [ "PND","ПНД"],
                    [ "TerminationAgreement","Расторжение договора"],
                    [ "Death","Смерть"],
                    [ "Insurance","Cтраховка"],
                    [ "Prison","Тюрьма"]
                ];	
				
                let oBS = SiebelApp.S_App.GetService("RB BS"),
                    psIn = SiebelApp.S_App.NewPropertySet(),
                    psOut = SiebelApp.S_App.NewPropertySet(),
                    sId = PM.Get('ContactId');
                if (sId != "" && typeof sId != undefined) {
                    psIn.SetProperty("ParentId", sId);
                    psOut = oBS.InvokeMethod("GetAllert", psIn);


                    for (let i = 0; i < array_f.length; i++) {
                        $('#' + array_f[i][0] + '-img').detach();
						$('#' + array_f[i][0]).detach();
                        console.log(array_f[i][0] + "  " + psOut.GetChildByType("ResultSet").GetProperty(array_f[i][0]));
                        if (psOut.GetChildByType("ResultSet").GetProperty(array_f[i][0]) == 'Y') {
							$('#' + array_f[i][0]).detach();
                            $('#newButton').before("<img class='dash-checkbox-true' id='" + array_f[i][0] + "-img' src='images/custom/" + array_f[i][0] + ".png' /></img>");
                            $('#' + array_f[i][0] + '-img').click(function() {
                                console.log("destroy loaded " + array_f[i][0]);
                                $('#' + array_f[i][0] + '-img').detach();
								$('#myDropdown').append('<a id="'+array_f[i][0]+'" class="allert">'+array_f[i][1]+'</a>');
                                psIn.SetProperty("ParentId", sId);
                                psIn.SetProperty("Parametr", array_f[i][0]);
                                psIn.SetProperty("Value", "N");
                                psOut = oBS.InvokeMethod("SetUnsetAllert", psIn);

                            })
                        }
						else
						{
							$('#myDropdown').append('<a id="'+array_f[i][0]+'" class="allert">'+array_f[i][1]+'</a>');
							 $('#' + array_f[i][0]).click(function() {
								$('#' + array_f[i][0]).bind("click", addImageAlert(array_f[i][0]));
							});
						}
                    }
					
					  let addImageAlert = function(x) {
                    //	debugger; 
					let array_f = [
						[ "Stock", "Акция"],
						[ "Allert","Аллерт"],
						[ "Bankrot","Банкротство"],
						[ "Advokat","Взаимодействие через адвоката"],
						[ "NotThirdPerson","Запрет на взаимодействие с 3-ми лицами"],
						[ "Zalog","Наличие залога"],
						[ "Disability","Инвалидность"],
						[ "NotCommBank","Отказ от взаимодействия с банком"],
						[ "Pensioner","Пенсионер"],
						[ "PND","ПНД"],
						[ "TerminationAgreement","Расторжение договора"],
						[ "Death","Смерть"],
						[ "Insurance","Cтраховка"],
						[ "Prison","Тюрьма"]
					];
					let rez='';
					for (let k = 0; k < array_f.length; k++) {
						if(array_f[k][0]==x)
							rez = array_f[k][1];
					}
                    let sId = PM.Get("GetBusComp").GetFieldValue("Id");
					
                    psIn.SetProperty("ParentId", sId);
                    psIn.SetProperty("Parametr", x);
                    psIn.SetProperty("Value", "Y");
                    psOut = oBS.InvokeMethod("SetUnsetAllert", psIn);
					$('#' + x).detach();
                    $('#newButton').before("<img class='dash-checkbox-true' id='" + x + "-img' src='images/custom/" + x + ".png' /></img>");
                    $('#' + x + '-img').click(function() {
                        console.log("destroy loaded " + x);
                        $('#' + x + '-img').detach();
						$('#myDropdown').append('<a id="'+x+'" class="allert">'+rez+'</a>');
                                
                        psIn.SetProperty("ParentId", sId);
                        psIn.SetProperty("Parametr", x);
                        psIn.SetProperty("Value", "N");
                        psOut = oBS.InvokeMethod("SetUnsetAllert", psIn);

                    })

                };

					
					

                }


            };


            CustContFrmPR.prototype.ConstructAllert = function() {
                let oBS = SiebelApp.S_App.GetService("RB BS"),
                    psIn = SiebelApp.S_App.NewPropertySet(),
                    psOut = SiebelApp.S_App.NewPropertySet();

                let PM = this.GetPM();

                let controls = PM.Get("GetControls");
                let alertControlName = controls["Allerts"].GetInputName();
                $("[name='" + alertControlName + "']").parent().after("<div id='allerts'></div>");
                //		$("#allerts")
                $('#allerts').parent().attr('colspan', 50);
                $("[name='" + alertControlName + "']").parent().hide();
                var myDiv = document.getElementById("allerts");
				
				let array_f = [
                    [ "Stock", "Акция"],
                    [ "Allert","Аллерт"],
                    [ "Bankrot","Банкротство"],
                    [ "Advokat","Взаимодействие через адвоката"],
                    [ "NotThirdPerson","Запрет на взаимодействие с 3-ми лицами"],
                    [ "Zalog","Наличие залога"],
                    [ "Disability","Инвалидность"],
                    [ "NotCommBank","Отказ от взаимодействия с банком"],
                    [ "Pensioner","Пенсионер"],
                    [ "PND","ПНД"],
                    [ "TerminationAgreement","Расторжение договора"],
                    [ "Death","Смерть"],
                    [ "Insurance","Cтраховка"],
                    [ "Prison","Тюрьма"]
                ];


				let a = '<div id="newButton" class="dropdown"><img id="dropbtn"  class="dropbtn" src="images/custom/newAllert.png"></button><div id="myDropdown" class="dropdown-content">',
				b='',
				c = '</div> </div>';
				for (let i = 0; i < array_f.length; i++) {
                   b+='<a id="'+array_f[i][0]+ '" class="allert">'+array_f[i][1]+ '</a>';
                }
				console.log("b =  " + b);
				$("[name='" + alertControlName + "']").parent().after(a+b+c);
       

                /* When the user clicks on the button,
            toggle between hiding and showing the dropdown content */


                let butClick = document.getElementById('dropbtn');
                // document.getElementById('myDropdown').style.display = 'none';

                butClick.onclick = function() {
                    document.getElementById('myDropdown').classList.toggle("show");
                }

                //Create and append the options
                for (let j = 0; j < array_f.length; j++) {
                    $('#' + array_f[j][0]).click(function() {
                        $('#' + array_f[j][0]).bind("click", addImageAlert(this.id));
                    });
                }



                let addImageAlert = function(x) {
                    //	debugger; 
					let array_f = [
						[ "Stock", "Акция"],
						[ "Allert","Аллерт"],
						[ "Bankrot","Банкротство"],
						[ "Advokat","Взаимодействие через адвоката"],
						[ "NotThirdPerson","Запрет на взаимодействие с 3-ми лицами"],
						[ "Zalog","Наличие залога"],
						[ "Disability","Инвалидность"],
						[ "NotCommBank","Отказ от взаимодействия с банком"],
						[ "Pensioner","Пенсионер"],
						[ "PND","ПНД"],
						[ "TerminationAgreement","Расторжение договора"],
						[ "Death","Смерть"],
						[ "Insurance","Cтраховка"],
						[ "Prison","Тюрьма"]
					];
					let rez='';
					for (let k = 0; k < array_f.length; k++) {
						if(array_f[k][0]==x)
							rez = array_f[k][1];
					}
                    let sId = PM.Get("GetBusComp").GetFieldValue("Id");
					
                    psIn.SetProperty("ParentId", sId);
                    psIn.SetProperty("Parametr", x);
                    psIn.SetProperty("Value", "Y");
                    psOut = oBS.InvokeMethod("SetUnsetAllert", psIn);
					$('#' + x).detach();
                    $('#newButton').before("<img class='dash-checkbox-true' id='" + x + "-img' src='images/custom/" + x + ".png' /></img>");
                    $('#' + x + '-img').click(function() {
                        console.log("destroy loaded " + x);
                        $('#' + x + '-img').detach();
						$('#myDropdown').append('<a id="'+x+'" class="allert">'+rez+'</a>');
                                
                        psIn.SetProperty("ParentId", sId);
                        psIn.SetProperty("Parametr", x);
                        psIn.SetProperty("Value", "N");
                        psOut = oBS.InvokeMethod("SetUnsetAllert", psIn);

                    })

                };




                // Close the dropdown if the user clicks outside of it
                window.onclick = function(event) {
                    if (!event.target.matches('.dropbtn')) {
                        var dropdowns = document.getElementsByClassName("dropdown-content");
                        let i;
                        for (i = 0; i < dropdowns.length; i++) {
                            var openDropdown = dropdowns[i];
                            if (openDropdown.classList.contains('show')) {
                                openDropdown.classList.remove('show');
                            }
                        }
                    }
                }


            }


            CustContFrmPR.prototype.BindEvents = function() {
                console.log("BindEvents loaded");
                SiebelAppFacade.CustContFrmPR.superclass.BindEvents.apply(this, arguments);
            }

            CustContFrmPR.prototype.EndLife = function() {
                console.log("EndLife loaded");
                SiebelAppFacade.CustContFrmPR.superclass.EndLife.apply(this, arguments);
            }

            return CustContFrmPR;
        }());
        return "SiebelAppFacade.CustContFrmPR";
    })
}