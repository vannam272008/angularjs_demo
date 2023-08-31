angular.module('ExportExcelService', [])
    .service('exportExcelService', function () {
        this.exportExcel = (data, filename) => {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Request Sheet 1');

            // Add data to the worksheet
            data.forEach(function (rowData) {
                worksheet.addRow(rowData);
            });

            // Save the workbook as a file
            workbook.xlsx.writeBuffer().then(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(blob, filename + '.xlsx');
            });
        };
    });