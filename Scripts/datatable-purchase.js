function ConvertToDDMMYYYY(stingdate) {   
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(stingdate);
    var mydate = new Date(parseFloat(results[1]));
    year = mydate.getFullYear();
    month = mydate.getMonth() + 1;
    day = mydate.getDate();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    var outdate = day + '-' + month + '-' + year;
    return outdate;
}
function ConvertToIndian(num) {
    result = new Number(num).toLocaleString("hi-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' });
    return result;
}

$(document).ready(function () {
    $("#cbtn-selectors1").dataTable({
        //
        "pageLength": 10,
        dom: 'Bfrtip',
        buttons: [{
            extend: 'copyHtml5',
            exportOptions: {
                columns: [0, ':visible']
            }
        }, {
            extend: 'excelHtml5',
            exportOptions: {
                columns: ':visible'
            }
        }, {
            extend: 'pdfHtml5',
            exportOptions: {
                columns: [0, 1, 2, 5]
            }
        }, 'colvis'],
        //
        "processing": true,
        "serverSide": true,
        "filter": true,

        "ajax": {
            "url": "/Purchase/GetIndex",
            "type": "POST",
            "datatype": "json"
        },
        "columnDefs": [{
            "targets": [0],            
            "visible": false,
            "searchable": false
        }],
        "columns": [
            { "data": "PurchaseID", "name": "PurchaseID", "autoWidth": true },  
            { "data": "SerialNo", "name": "SerialNo", "autoWidth": true }, 
            {
                "data": "PurchaseDate", "name": "PurchaseDate", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToDDMMYYYY(full.PurchaseDate);
                },
            },     
            { "data": "VenderName", "name": "VenderName", "autoWidth": true }, 
            {
                "data": "PurchaseValue", "name": "PurchaseValue", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.PurchaseValue);
                },                
            },
            {
                "data": "PurchaseGST", "name": "PurchaseGST", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.PurchaseGST);
                },
            },
            {
                "data": "PurchaseTotal", "name": "PurchaseTotal", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.PurchaseTotal);
                },
            },

            {
                "render": function (data, type, full) {
                    return "<a href='Purchase/PrintPreview/" + full.PurchaseID + "' class='btn btn-info btn-mini btn-outline-info'><i class='icofont icofont-print'></i></a>";
                }
            },

            {
                "data": "VenderID", "name": "VenderID",
                "render": function (data, type, full) {
                    return "<a href='Purchase/PaymentPay/" + full.VenderID + "' class='btn btn-info btn-mini btn-outline - info'><i class='icofont icofont-cur-rupee'></i>";
                }
            },
            
            {
                "render": function (data, type, full)
                {
                    return "<a href='Purchase/Edit/" + full.PurchaseID + "' class='btn btn-success btn-mini btn-outline-primary'><i class='icofont icofont-ui-edit'></i></a>";                        
                }
            },
            {               
                "render": function (data, type, full) {
                    return "<a href='Purchase/Delete/" + full.PurchaseID + "' class='btn btn-danger btn-mini btn-outline-primary'><i class='icofont icofont-ui-close'></i></a>";        
                }
            },
           
        ]
    });
});  

