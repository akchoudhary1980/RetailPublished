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
            "url": "/Sale/GetIndex",
            "type": "POST",
            "datatype": "json"
        },
        "columnDefs": [{
            "targets": [0],            
            "visible": false,
            "searchable": false
        }],
        "columns": [
            { "data": "SalesID", "name": "SalesID", "autoWidth": true },  
            { "data": "SerialNo", "name": "SerialNo", "autoWidth": true }, 
            {
                "data": "SalesDate", "name": "SalesDate", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToDDMMYYYY(full.SalesDate);
                },
            },     
            { "data": "CustomerName", "name": "CustomerName", "autoWidth": true }, 
            {
                "data": "SaleValue", "name": "SaleValue", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.SaleValue);
                },                
            },
            {
                "data": "SaleGST", "name": "SaleGST", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.SaleGST);
                },
            },
            {
                "data": "SaleTotal", "name": "SaleTotal", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.SaleTotal);
                },
            },

            {
                "render": function (data, type, full) {
                    return "<a href='Sale/PrintPreview/" + full.SalesID + "' class='btn btn-info btn-mini btn-outline-info'><i class='icofont icofont-print'></i></a>";
                }
            },

            {
                "data": "CustomerID", "name": "CustomerID",
                "render": function (data, type, full) {
                    return "<a href='Sale/Payment/" + full.CustomerID + "' class='btn btn-info btn-mini btn-outline - info'><i class='icofont icofont-cur-rupee'></i>";
                }
            },
            
            {
                "render": function (data, type, full)
                {
                    return "<a href='Sale/Edit/" + full.SalesID + "' class='btn btn-success btn-mini btn-outline-primary'><i class='icofont icofont-ui-edit'></i></a>";                        
                }
            },
            {               
                "render": function (data, type, full) {
                    return "<a href='Sale/Delete/" + full.SalesID + "' class='btn btn-danger btn-mini btn-outline-primary'><i class='icofont icofont-ui-close'></i></a>";        
                }
            },
           
        ]
    });
});  

