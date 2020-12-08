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
            "url": "/VenderPayment/GetVenderOutstanding",
            "type": "POST",
            "datatype": "json"
        },
        "columnDefs": [{
            "targets": [0],            
            "visible": false,
            "searchable": false
        }],
        "columns": [
            { "data": "VenderID", "name": "VenderID", "autoWidth": true }, 
            { "data": "VenderName", "name": "VenderName", "autoWidth": true }, 
            { "data": "Mobile", "name": "Mobile", "autoWidth": true }, 
            { "data": "Whatsup", "name": "Whatsup", "autoWidth": true },
            { "data": "Email", "name": "Email", "autoWidth": true },

            {
                "data": "PurchaseTotal", "name": "PurchaseTotal", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.PurchaseTotal);
                },
            },
            {
                "data": "TotalPayment", "name": "TotalPayment", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.TotalPayment);
                },
            },
            {
                "data": "Outstanding", "name": "Outstanding", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.Outstanding);
                },
            },
            {
                
                "render": function (data, type, full,meta)
                {                       
                    var myURL = "Details/" + full.VenderID;
                    return "<a href=" + myURL + " class='btn btn-success btn-mini btn-outline-primary'><i class='icofont icofont-notebook'></i></a>";                        
                }
            },            
           
        ]
    });
});  

