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
            "url": "/CustomerPayment/GetIndex",
            "type": "POST",
            "datatype": "json"
        },
        "columnDefs": [{
            "targets": [0],            
            "visible": false,
            "searchable": false
        }],
        "columns": [
            { "data": "PaymentID", "name": "PaymentID", "autoWidth": true },             
            {
                "data": "TransactionDate", "name": "TransactionDate", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToDDMMYYYY(full.TransactionDate);
                },
            },     
            { "data": "PaymentType", "name": "PaymentType", "autoWidth": true }, 
            { "data": "PaymentMode", "name": "PaymentMode", "autoWidth": true }, 
            { "data": "CustomerName", "name": "CustomerName", "autoWidth": true }, 
            {
                "data": "Amount", "name": "Amount", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.Amount);
                },                
            },          

            { "data": "PaymentMethod", "name": "PaymentMethod", "autoWidth": true },
            { "data": "Remark", "name": "Remark", "autoWidth": true },
            {
                "render": function (data, type, full)
                {
                    return "<a href='CustomerPayment/Edit/" + full.PaymentID + "' class='btn btn-success btn-mini btn-outline-primary'><i class='icofont icofont-ui-edit'></i></a>";                        
                }
            },
            {               
                "render": function (data, type, full) {
                    return "<a href='CustomerPayment/Delete/" + full.PaymentID + "' class='btn btn-danger btn-mini btn-outline-primary'><i class='icofont icofont-ui-close'></i></a>";        
                }
            },
           
        ]
    });
});  

