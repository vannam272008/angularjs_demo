angular.module('ExportExcelService', [])
    .service('exportExcelService', function () {
        this.exportExcel = (data, filename) => {

            const headers = [
                { header: "Request Code", key: "RequestCode" },
                { header: "Department", key: "Department" },
                { header: "Created by", key: "CreatedBy" },
                { header: "User", key: "ReceiverUser" },
                { header: "Created Date", key: "Created" },
                { header: "From", key: "UsageFrom" },
                { header: "To", key: "UsageTo" }
            ];

            // Config Data
            var dataConfigList = [];
            data.map((item) => {
                var dataConfig = {
                    RequestCode: item.RequestCode,
                    Department: item.Department.Name,
                    CreatedBy: item.SenderUser.FullName,
                    ReceiverUser: item.ReceiveUser.FullName,
                    Created: item.Created,
                    UsageFrom: item.UsageFrom,
                    UsageTo: item.UsageTo
                }
                dataConfigList.push(dataConfig);
            });
            // Config Data

            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Request Sheet 1');
            worksheet.columns = headers;
            // Add data to the worksheet
            dataConfigList.forEach(function (rowData) {
                worksheet.addRow(rowData);
            });

            // var rowDefinitions = [
            //     { height: 20, style: { font: { bold: true } } }, // Header row
            //     { height: 18 }, // Data rows
            //     { height: 18 } // Data rows
            //     // Add more row definitions as needed
            // ];

            // // Create a table from the data
            // worksheet.addTable({
            //     name: 'RequestTable', // Table name
            //     ref: 'A1', // Starting cell reference for the table
            //     headerRow: true, // Use the first row as headers
            //     totalsRow: false, // Don't add a totals row
            //     style: {
            //         theme: 'TableStyleLight9', // Use a built-in table style
            //         showFirstColumn: false,
            //         showLastColumn: false,
            //         showRowStripes: true,
            //     }, // Table style (optional)
            //     columns: headers, // Define columns
            //     rows: rowDefinitions, // Define custom row definitions
            // });

            // Save the workbook as a file
            workbook.xlsx.writeBuffer().then(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(blob, filename + '.xlsx');
            });
        };

    });