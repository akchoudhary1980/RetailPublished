﻿var totalamt = 0;
var totalgst = 0;
var subtotal = 0;
var discount = 0;
var grandtotal = 0;

SetDoubleIndian('DiscountPercent');
SetInputNumericIndian('DiscountValue');
SetInputNumericIndian('Discount');

SetInputNumeric('PQty');
SetInputNumeric('PRate');
SetInputNumeric('SQty');
SetInputNumeric('SRate');

 function FormValidation() {
        RemoveIndianCulture("DiscountValue");
        RemoveIndianCulture("Discount");
        RemoveIndianCulture("DiscountPercent");
}
function GetSaleNo() {
    //Get Sale No
    $.ajax({
        type: "POST",
        url: "/Sale/GetSaleNo",
        dataType: "json",
        data: { CompID: 1 },
        success: function (response) {
            var str = response;
            $("#SerialNo").val(str);
        }
    });  
}

function SetSaleNo() {
    //Set Sale No-- >   
    var saleno = $("#SerialNo").val();
    $.ajax({
        type: "POST",
        url: "/Sale/SetSaleNo",
        dataType: "json",
        data: { SaleNo: saleno },
        success: function (response) {
            var str = response;
            $("#SerialNo").val(str);
        }
    });
}

// Date picker / Auto Load Function
$(function () {
    $("#SalesDate").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd-mm-yy"
    });
});
// Get Update Discount No-- >    
    function UpdateDiscount(method) {
        var per = 0; var disamount = 0; var saleamount = 0;
        grandtotal = ClearCulture(grandtotal);
        if (method == "P") {
            per = parseFloat($("#DiscountPercent").val());
            disamount = Math.round(grandtotal * per / 100).toFixed(2);
            saleamount = grandtotal - disamount;
            $("#DiscountPercent").val(per);
            $("#DiscountValue").val(ConvertToIndian(disamount));
            $("#Discount").val(ConvertToIndian(disamount));
            $("#GroundTotal").text(ConvertToIndian(saleamount)); // Errore
        }
        else {
            disamount = ClearCulture($("#DiscountValue").val());
            disamount = parseFloat(disamount);
            per = Math.round(disamount / grandtotal * 100).toFixed(2);
            saleamount = grandtotal - disamount;
            $("#DiscountPercent").val(per);
            $("#DiscountValue").val(ConvertToIndian(disamount));
            $("#Discount").val(ConvertToIndian(disamount));
            $("#GroundTotal").text(ConvertToIndian(saleamount));
        }
    }
    $(function () {
            $("#DiscountPercent").blur(function () {
                UpdateDiscount("P");
            });
        $("#DiscountValue").blur(function () {
            UpdateDiscount("V");
        });
    });

// Customer Auto Complete
$(document).ready(function () {
    $("#CustomerID").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Share/CustomerNameAutoComplete",
                type: "POST",
                dataType: "json",
                data: { Prefix: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.CustomerName, value: item.CustomerName, id: item.CustomerID };
                    }))
                },
            })
        },
        select: function (event, ui) {
            CustomerDetailsFill(ui.item.id);
            $("#CustomerHiddenID").val(ui.item.id);
        }
    });
})
// Fill Customer
function CustomerDetailsFill(customerid) {
    $.ajax({
        type: "POST",
        url: "/Share/CustomerDetailFill",
        dataType: "json",
        data: { CustomerID: customerid },
        success: function (response) {
            var str = response;
            var res = str.split("^");
            $('#CustomerHiddenID').val(res[0]);
            $('#CustomerName').val(res[1]);
            $('#Address').val(res[2]);
            $('#State').val(res[3]);
            $('#City').val(res[4]);
            $('#Mobile').val(res[5]);
            $('#WhatsApp').val(res[6]);
            $('#Email').val(res[7]);
            $('#ProfessionID').val(res[8]);
            $('#GSTNo').val(res[9]);
            $('#CustomerID').val(res[1]);
        }
    });
}
// Open Customer Model
function addCustomer() {
    $('#CustomerModel').modal('show');
}
// Close Customer Model
function closeCustomer() {
    $('#CustomerModel').modal('hide');
}
// Clear Customer Model
function clearCustomer() {
    $("#CustomerHiddenID").val("0");
    $("#CustomerName").val("");
    $("#Address").val("");
    $("#State").val("");
    $("#City").val("");
    $("#Mobile").val("");
    $("#WhatsApp").val("");
    $("#Email").val("");
    $("#ProfessionID").val("");
}
// Add new Customer 
function newCustomer() {
    $("#CustomerHiddenID").val("0");
    var customername = $("#CustomerName").val();
    $("#CustomerID").val(customername);
    $('#CustomerModel').modal('hide');
}
// Product Auto Complete
$(document).ready(function () {
    $("#ProductName").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Share/ProductAutoComplete",
                type: "POST",
                dataType: "json",
                data: { Prefix: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.ProductName, value: item.ProductName, id: item.ProductID };
                    }))
                },
            })
        },
        select: function (event, ui) {
            AutoFillData(ui.item.id, "P");
            $("#ProductID").val(ui.item.id);
        }
    });
})
// Service Auto Complete
$(document).ready(function () {
    $("#ServiceName").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Share/ServiceAutoComplete",
                type: "POST",
                dataType: "json",
                data: { Prefix: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.ServiceName, value: item.ServiceName, id: item.ServiceID };
                    }))
                },
            })
        },
        select: function (event, ui) {
            AutoFillData(ui.item.id, "S");
            $("#ServiceID").val(ui.item.id);
        }
    });
})
// Auto Fill Data
function AutoFillData(itemid, itype) {
    $.ajax({
        type: "POST",
        url: "/Share/AutoFillData",
        dataType: "json",
        data: { iID: itemid, iType: itype },
        success: function (response) {
            var str = response;
            var res = str.split("^");
            // if condition
            if (itype == "P") {
                $('#PUnit').val(res[0]);
                $('#PGST').val(res[1]);
                $('#PRate').val(res[2]);
                $('#PQty').val(1); // Default Value
            }
            else {
                $('#SUnit').val(res[0]);
                $('#SGST').val(res[1]);
                $('#SRate').val(res[2]);
                $('#SQty').val(1); // Default Value
            }
        }
    });
}
// for Add Trans Data
function InsertRow(itype) {    
    var itemtype = itype;
    var itemid, qty, rate;

    if (itemtype == "P") {
        itemid = $('#ProductID').val();
        qty = $('#PQty').val();
        rate = $('#PRate').val();
    }
    else {
        itemid = $('#ServiceID').val();
        qty = $('#SQty').val();
        rate = $('#SRate').val();
    }

    $.ajax({
        type: 'POST',       
        url: "/Sale/InsertRow",
        dataType: 'json',
        data: { iID: itemid, iQty: qty, iRate: rate, iType: itemtype },
        success: function (data) {
            DisplayData(data);
        }
    });
}
// for Remove Trans Data
function DeleteRow(serno) {
   
    $.ajax({
        type: 'POST',       
        url: "/Sale/DeleteRow",      
        dataType: 'json',
        data: { iSer: serno },
        success: function (data) {
            DisplayData(data);
        }
    });
}
// for Display Data-- > 
function DisplayData(data) {       
        var counter = 0;
        $("#dtTable tbody tr").remove();
        var items = '';
    $.each(data, function (i, item) {
            counter = counter + 1;
            var rows = "<tr>"
                + "<td>" + counter + "</td>"
                + "<td>" + item.ItemName + "</td>"
                + "<td>" + item.HSNCode + "</td>"
                + "<td class='text-right'>" + item.Quantity + "</td>"
                + "<td class='text-right'>" + item.Unit + "</td>"
                + "<td class='text-right'>" + item.Rate + "</td>"
                + "<td class='text-right'>" + item.Amount + "</td>"
                + "<td class='text-right'>" + item.GSTSlab + "%</td>"
                + "<td class='text-right'>" + item.GSTAmount + "</td>"
                + "<td><button type='button' id=" + item.SerNo + " onclick='DeleteRow(this.id)' class='btn btn-danger btn-mini btn-outline-primary'><i class='icofont icofont-ui-close'></i></button></td>"
                + "</tr>";
            $('#dtTable tbody').append(rows);            
    });

    // Get Calculation 
    discount = $('#Discount').val();
    $.ajax({
        type: "POST",
        url: "/Sale/Calculation",
        async: false,
        dataType: "json",
        data: { Dis: discount },
        success: function (response) {           
            totalamt = response.TotalAmount;          
            totalgst = response.TotalGST;
            subtotal = response.SubTotal;
            discount = response.Discount
            grandtotal = response.GrandTotal;           
            $('#Discount').val(discount);     
            $('#GroundTotal').text(grandtotal);    
            
        }
    });
    //
    $('#dtTable tbody').append('<tr><td colspan="6" align="right" > <b>Total</b></td><td class="text-right"><b style="color:green">' + totalamt + '</b></td><td></td><td class="text-right"><b style="color:green">' + totalgst + '</b></td><td></td></tr><tr><td colspan="8" class="text-right"><b>Sub Total (Amount + GST Amt) </b></td><td class="text-right"><b style="color:green">' + subtotal + '</b></td><td></td></tr>');
        // Clear Product & Service Data
        $('#ProductName').val("");
        $('#PQty').val("");
        $('#PUnit').val("");
        $('#PRate').val("");
        $('#PGST').val("");

        $('#ServiceName').val("");
        $('#SQty').val("");
        $('#SUnit').val("");
        $('#SRate').val("");
        $('#SGST').val("");

    }

