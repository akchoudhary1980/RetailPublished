function GetList(ControlID,GetUrl) {
    $(function () {
        $("[id$=" + ControlID + "]").autocomplete({
            source: function (request, response) {
                $.ajax({
                    //url: '/Default.aspx/GetCityList',
                    url: GetUrl,
                    data: "{ 'prefix': '" + request.term + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",

                    success: function (data) {
                        response($.map(data.d, function (item) {
                            return {
                                label: item.split('-')[0],
                                val: item.split('-')[1]
                            }
                        }))
                    },
                    error: function (response) {
                        alert(response.responseText);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    }
                });
            },

            select: function (event, ui) {
                ////var label = ui.item.label;                  
            },

            minLength: 3
        });
    });
}
function GetDatePicker(ControlID) {
        function pageLoad() {
            $(ControlID).datepicker({

                changeMonth: true,
                changeYear: true,
                dateFormat: "dd-mm-yy"

            }).val()
        }
        $(function () {
            $(ControlID).datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: "dd-mm-yy"
            }).val()
        });
    
}
function FunctionRequest(GetURL)
{
    $.ajax({
        type: "POST",
        url: GetURL,        
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: "true",
        cache: "false",
        success: function (msg) {
            location.reload(true);
        },
        Error: function (x, e) {
        }
    });
}
function onlyNumbersWithDot(e) {
        var charCode;
        if (e.keyCode > 0) {
            charCode = e.which || e.keyCode;
        }
        else if (typeof (e.charCode) != "undefined") {
            charCode = e.which || e.keyCode;
        }
        if (charCode == 46)
            return true
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
}

function OnlyNumbers(e) {
    var charCode;
    if (e.keyCode > 0) {
        charCode = e.which || e.keyCode;
    }
    else if (typeof (e.charCode) != "undefined") {
        charCode = e.which || e.keyCode;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}


function mobilenumber(e) {
        var charCode;
        if (e.keyCode > 0) {
            charCode = e.which || e.keyCode;
        }
        else if (typeof (e.charCode) != "undefined") {
            charCode = e.which || e.keyCode;
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
function getAge(sourceID, destinationID) {
        var da = document.getElementById(sourceID).value;
        var d1 = new Date(da.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var n1 = d1.getFullYear();
        var d2 = new Date();
        var n2 = d2.getFullYear();
        document.getElementById(destinationID).value = n2 - n1;
}
function getduplicate(e)
{
    alert('this work');
}
function GetListwithEvent(ControlID, GetUrl) {
    $(function () {
        $("[id$=" + ControlID + "]").autocomplete({
            source: function (request, response) {
                $.ajax({
                    //url: '/Default.aspx/GetCityList',
                    url: GetUrl,
                    data: "{ 'prefix': '" + request.term + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",

                    success: function (data) {
                        response($.map(data.d, function (item) {
                            return {
                                label: item.split('-')[0],
                                val: item.split('-')[1]
                            }
                        }))
                    },
                    error: function (response) {
                        alert(response.responseText);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    }
                });
            },

            select: function (event, ui) {

                //setOldCustomer(ui.item.val);
                TextSectionOperation(ui.item.val);
               // alert("Selected ");
                //var label = ui.item.val;   
                //SelectionEventFire(itemvalue);
                ////var label = ui.item.label;                  
            },

            minLength: 3
        });
    });
}

function SetInputMobile(id) {
    $(document).ready(function () {
        $('#'+id).keypress(function () {
            return mobilenumber(event);
        });
    });
}
function SetInputNumeric(id) {
    $(document).ready(function () {
        $('#' + id).keypress(function () {
            return onlyNumbersWithDot(event);
        });
    });
}
function SetInputInt(id) {
    $(document).ready(function () {
        $('#' + id).keypress(function () {
            return OnlyNumbers(event);
        });
    });
}
function SetInputNumericIndian(id) {
    $(document).ready(function () {
        //alert('cal');
        var num;
        var result;
        // default value 
        num = $('#' + id).val(); // get Value  
        num = num.replace("₹", "");
        result = new Number(num).toLocaleString("hi-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' });
        $('#' + id).val(result); // Set the Value  
        $('#' + id).css("text-align", "right");

        // get foucs
        $('#' + id).focus(function () {
            $('#' + id).css("text-align", "right");
        });
        // key press event 
        $('#' + id).keypress(function () {
            return onlyNumbersWithDot(event);
        });
        // lost focus 
        $('#' + id).blur(function () {
            num = $('#' + id).val(); // get Value 
            num = num.replace("₹", "");
            result = new Number(num).toLocaleString("hi-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' });
            $('#' + id).val(result); // Set the Value  
            $('#' + id).css("text-align", "right");
        });
    });
}
function SetDoubleIndian(id) {
    $(document).ready(function () {
        //alert('cal');
        var num;
        var result;
        // default value 
        num = $('#' + id).val(); // get Value  
        result = new Number(num).toLocaleString("hi-IN", { maximumFractionDigits: 2 });
        $('#' + id).val(result); // Set the Value  
        $('#' + id).css("text-align", "right");

        // get foucs
        $('#' + id).focus(function () {
            $('#' + id).css("text-align", "right");
        });
        // key press event 
        $('#' + id).keypress(function () {
            return onlyNumbersWithDot(event);
        });
        // lost focus 
        $('#' + id).blur(function () {
            num = $('#' + id).val(); // get Value 
            //num = num.replace("₹", "");
            result = new Number(num).toLocaleString("hi-IN", { maximumFractionDigits: 2 });
            $('#' + id).val(result); // Set the Value  
            $('#' + id).css("text-align", "right");
        });
    });
}
function SetIntegerIndian(id) {
    $(document).ready(function () {
        //alert('cal');
        var num;
        var result;
        // default value 
        num = $('#' + id).val(); // get Value  
        result = new Number(num).toLocaleString("hi-IN", { maximumFractionDigits: 0 });
        $('#' + id).val(result); // Set the Value  
        $('#' + id).css("text-align", "right");

        // get foucs
        $('#' + id).focus(function () {
            $('#' + id).css("text-align", "right");
        });
        // key press event 
        $('#' + id).keypress(function () {
            return OnlyNumbers(event);
        });
        // lost focus 
        $('#' + id).blur(function () {
            num = $('#' + id).val(); // get Value 
            //num = num.replace("₹", "");
            result = new Number(num).toLocaleString("hi-IN", { maximumFractionDigits: 0 });
            $('#' + id).val(result); // Set the Value  
            $('#' + id).css("text-align", "right");
        });
    });
}

function RemoveIndianCulture(id) {
    var str = $('#' + id).val();    
    var str1 = str.replace("₹", "");    
    var str2 = (str1.trim()).replace(/[,]/g, "");
    $('#' + id).val(str2);
}

function ClearCulture(str) {    
    str = str.replace("₹", "");
    str = str.replace(",", "");
    return str;
}

function ConvertToDDMMYYYY(dateString) {
    date = new Date(dateString);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    var result = dt + '-' + month + '-' + year;
    return result;
}
function ConvertToIndian(num) {
    result = new Number(num).toLocaleString("hi-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' });
    return result;
}

function SetHindiInput(id) {
    $(document).ready(function () {
        // Load the Google Transliterate API
        google.load("elements", "1", { packages: "transliteration" });
        function onLoad() {
            var options = {
                sourceLanguage:
                    google.elements.transliteration.LanguageCode.ENGLISH,
                destinationLanguage:
                    [google.elements.transliteration.LanguageCode.HINDI],
                transliterationEnabled: true
            };

            // Create an instance on TransliterationControl with the required
            // options.
            var control = new google.elements.transliteration.TransliterationControl(options);

            // Enable transliteration in the textbox with id
            // 'transliterateTextarea'.
            control.makeTransliteratable([id]);
        }
        google.setOnLoadCallback(onLoad);

    });
}