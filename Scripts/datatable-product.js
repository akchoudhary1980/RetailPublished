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
            "url": "/Product/GetIndex",
            "type": "POST",
            "datatype": "json"
        },
        "columnDefs": [{
            "targets": [0],            
            "visible": false,
            "searchable": false
        }],
        "columns": [
            { "data": "ProductID", "name": "ProductID", "autoWidth": true },            
            {
                "data": "Picture", "name": "Picture",
               
                "render": function (data, type, full, meta) {
                    return "<img src='../UploadFiles/" + full.Picture+"' height='50'/>";
                },                
                "orderable": false,
                "searchable": false
            },
            { "data": "ProductName", "name": "ProductName", "autoWidth": true },
            { "data": "CategoryName", "name": "CategoryName", "autoWidth": true },
            { "data": "GroupName", "name": "GroupName", "autoWidth": true },  
            { "data": "BrandName", "name": "BrandName", "autoWidth": true },
            {
                "data": "MRPRate", "name": "MRPRate", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.MRPRate);
                },                
            },
            {
                "data": "Price", "name": "Price", className: "text-right",
                "render": function (data, type, full, meta) {
                    return ConvertToIndian(full.Price);
                },
            },

            { "data": "UnitName", "name": "UnitName", "autoWidth": true },
            {
                "data": "PercentValue", "name": "PercentValue", className: "text-right",
                "render": function (data, type, full, meta) {
                    return full.PercentValue +"%";
                },
            }, 
            
            {
                "render": function (data, type, full)
                {
                    return "<a href='Edit/" + full.ProductID + "' class='btn btn-success btn-mini btn-outline-primary'><i class='icofont icofont-ui-edit'></i></a>";                        
                }
            },
            {
                "render": function (data, type, full) {
                    return "<a href='Delete/" + full.ProductID + "' class='btn btn-danger btn-mini btn-outline-primary'><i class='icofont icofont-ui-close'></i></a>";        
                }
            },
           
        ]
    });
});  

