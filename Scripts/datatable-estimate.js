function ConvertToDDMMYYYY(stingdate) {
    //alert(stingdate);
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
            "url": "/Estimate/GetIndex",
            "type": "POST",
            "datatype": "json"
        },
        "columnDefs": [{
            "targets": [0],            
            "visible": false,
            "searchable": false
        }],
        "columns": [
            { "data": "EstimateID", "name": "EstimateID", "autoWidth": true },  
            { "data": "SerialNo", "name": "SerialNo", "autoWidth": true }, 
            {
                "data": "EstimateDate", "name": "EstimateDate", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToDDMMYYYY(full.EstimateDate);
                },
            },  
            {
                "data": "ReminderDate", "name": "ReminderDate", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToDDMMYYYY(full.ReminderDate);
                },
            },  
            { "data": "CustomerName", "name": "CustomerName", "autoWidth": true }, 
            {
                "data": "EstimateValue", "name": "EstimateValue", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.EstimateValue);
                },                
            },
            {
                "data": "EstimateGST", "name": "EstimateGST", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.EstimateGST);
                },
            },
            {
                "data": "EstimateTotal", "name": "EstimateTotal", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.EstimateTotal);
                },
            },

            {
                "render": function (data, type, full) {
                    return "<a href='PrintPreview/" + full.EstimateID + "' class='btn btn-info btn-mini btn-outline-info'><i class='icofont icofont-print'></i></a>";
                }
            },            
            
            {
                "render": function (data, type, full)
                {
                    return "<a href='Edit/" + full.EstimateID + "' class='btn btn-success btn-mini btn-outline-primary'><i class='icofont icofont-ui-edit'></i></a>";                        
                }
            },
            {               
                "render": function (data, type, full) {
                    return "<a href='Delete/" + full.EstimateID + "' class='btn btn-danger btn-mini btn-outline-primary'><i class='icofont icofont-ui-close'></i></a>";        
                }
            },
           
        ]
    });
});  

