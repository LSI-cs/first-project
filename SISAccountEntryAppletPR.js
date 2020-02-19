if (typeof(SiebelAppFacade.SISAccountEntryAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.SISAccountEntryAppletPR");
    define("siebel/custom/SISAccountEntryAppletPR", ["siebel/phyrenderer"], function() {
        SiebelAppFacade.SISAccountEntryAppletPR = (function() {

            function SISAccountEntryAppletPR(pm) {
                SiebelAppFacade.SISAccountEntryAppletPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(SISAccountEntryAppletPR, SiebelAppFacade.PhysicalRenderer);

            SISAccountEntryAppletPR.prototype.Init = function() {
                console.log("InitPR loaded");
                SiebelAppFacade.SISAccountEntryAppletPR.superclass.Init.call(this);
                this.AttachPMBinding("ContactId", this.GetAllert);
            }

            SISAccountEntryAppletPR.prototype.ShowUI = function() {
                console.log("ShowUI loaded");
                SiebelAppFacade.SISAccountEntryAppletPR.superclass.ShowUI.apply(this, arguments);


            }

            SISAccountEntryAppletPR.prototype.BindData = function() {
                console.log("BindData loaded");
                SiebelAppFacade.SISAccountEntryAppletPR.superclass.BindData.call(this);

                this.ConstructAllert();
            };

            SISAccountEntryAppletPR.prototype.GetAllert = function() {
                let PM = this.GetPM();
                console.log("GetAllert loaded " + PM.Get('ContactId'));
                let array = [
                    "Stock",
                    "Allert",
                    "Bankrot",
                    "Advokat",
                    "NotThirdPerson",
                    "Zalog",
                    "Disability",
                    "NotCommBank",
                    "Pensioner",
                    "PND",
                    "TerminationAgreement",
                    "Death",
                    "Insurance",
                    "Prison"
                ];

                let oBS = SiebelApp.S_App.GetService("RB BS"),
                    psIn = SiebelApp.S_App.NewPropertySet(),
                    psOut = SiebelApp.S_App.NewPropertySet(),
                    sId = PM.Get('ContactId');
                if (sId != "" && typeof sId != undefined) {
                    psIn.SetProperty("ParentId", sId);
                    psOut = oBS.InvokeMethod("GetAllert", psIn);


                    for (let i = 0; i < array.length; i++) {
                        $('#' + array[i] + '-img').detach();
                        console.log(array[i] + "  " + psOut.GetChildByType("ResultSet").GetProperty(array[i]));
                        if (psOut.GetChildByType("ResultSet").GetProperty(array[i]) == 'Y') {
                            $('#newButton').before("<img class='dash-checkbox-true' id='" + array[i] + "-img' src='images/custom/" + array[i] + ".png' /></img>");
                            $('#' + array[i] + '-img').click(function() {
                                console.log("destroy loaded " + array[i]);
                                $('#' + array[i] + '-img').detach();

                                psIn.SetProperty("ParentId", sId);
                                psIn.SetProperty("Parametr", array[i]);
                                psIn.SetProperty("Value", "N");
                                psOut = oBS.InvokeMethod("SetUnsetAllert", psIn);

                            })
                        }
                    }

                }


            };


            SISAccountEntryAppletPR.prototype.ConstructAllert = function() {
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
                /*	$("[name='" + alertControlName + "']").parent().after("<img class='dash-checkbox-true' id='newAllert-img' src='images/custom/newAllert.png' /></img>");
				
				$('#newAllert-img').click(function() {
					console.log("newAllert click ");
				//	document.getElementById('#mySelect').style.display == "block"
				})*/
                //img id="rock" src="static/rps img/rock.png" height="100" width="100">
                $("[name='" + alertControlName + "']").parent().after('<div id="newButton" class="dropdown"><img id="dropbtn"  class="dropbtn" src="images/custom/newAllert.png"></button><div id="myDropdown" class="dropdown-content"><a id="Stock" class="allert">Акция</a><a id="Allert" class="allert">Аллерт</a><a id="Bankrot" class="allert">Банкротство</a><a id="Advokat" class="allert">Взаимодействие через адвоката</a><a id="NotThirdPerson" class="allert">Запрет на взаимодействие с 3-ми лицами</a><a id="Zalog" class="allert">Наличие залога</a><a id="Disability" class="allert">Инвалидность</a><a id="NotCommBank" class="allert">Отказ от взаимодействия с банком</a><a id="Pensioner" class="allert">Пенсионер</a><a id="PND" class="allert">ПНД</a><a id="TerminationAgreement"  class="allert">Расторжение договора</a><a id="Death" class="allert">Смерть</a><a id="Insurance" class="allert">Cтраховка</a><a id="Prison" class="allert">Тюрьма</a>  </div> </div>');


                /* When the user clicks on the button,
            toggle between hiding and showing the dropdown content */


                let butClick = document.getElementById('dropbtn');
                // document.getElementById('myDropdown').style.display = 'none';

                butClick.onclick = function() {
                    document.getElementById('myDropdown').classList.toggle("show");
                }

                let array = [
                    "Stock",
                    "Allert",
                    "Bankrot",
                    "Advokat",
                    "NotThirdPerson",
                    "Zalog",
                    "Disability",
                    "NotCommBank",
                    "Pensioner",
                    "PND",
                    "TerminationAgreement",
                    "Death",
                    "Insurance",
                    "Prison"
                ];


                //Create and append the options
                for (let i = 0; i < array.length; i++) {
                    $('#' + array[i]).click(function() {
                        $('#' + array[i]).bind("click", addImageAlert(this.id));
                    });
                }



                var addImageAlert = function(x) {
                    //	debugger; 
                    let sId = PM.Get("GetBusComp").GetFieldValue("Id");

                    psIn.SetProperty("ParentId", sId);
                    psIn.SetProperty("Parametr", x);
                    psIn.SetProperty("Value", "Y");
                    psOut = oBS.InvokeMethod("SetUnsetAllert", psIn);

                    $('#newButton').before("<img class='dash-checkbox-true' id='" + x + "-img' src='images/custom/" + x + ".png' /></img>");
                    $('#' + x + '-img').click(function() {
                        console.log("destroy loaded " + x);
                        $('#' + x + '-img').detach();

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

            //	$('#mySelect').select(alert( $('#mySelect option:selected').text() ));




            SISAccountEntryAppletPR.prototype.BindEvents = function() {
                console.log("BindEvents loaded");
                SiebelAppFacade.SISAccountEntryAppletPR.superclass.BindEvents.apply(this, arguments);
            }

            SISAccountEntryAppletPR.prototype.EndLife = function() {
                console.log("EndLife loaded");
                SiebelAppFacade.SISAccountEntryAppletPR.superclass.EndLife.apply(this, arguments);
            }

            return SISAccountEntryAppletPR;
        }());
        return "SiebelAppFacade.SISAccountEntryAppletPR";
    })
}