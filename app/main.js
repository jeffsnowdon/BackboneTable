define(['jquery', 'underscore', 'backbone', 'app/table/table-view', 'app/table/row-model', 'app/table/rows-collection', 'app/table/filtered-rows-collection', 'app/filter/filter-model', 'app/filter/filter-view'], function ($, _, Backbone, TableView, RowModel, RowsCollection, FilteredRowsCollection, FilterModel, FilterView) {

    let columnIndexMap = {
        "Column1": 0,
        "Column2": 1,
        "Column3": 2
    }

    let filterModel = new FilterModel({
        targetColumnNames: ["Column1", "Column2", "Column3"],
        placeHolder: "Filter by any column..."
    });
    let filterView = new FilterView({
        model: filterModel
    });
    filterView.render();

    let rowsCollection = new RowsCollection({
    });

    let filteredRowsCollection = new FilteredRowsCollection({
        filterModel: filterModel,
        rowsCollection: rowsCollection
    });

    let columnNames = [];
    Object.keys(columnIndexMap).forEach(function (columnName) {
        columnNames.push(columnName);
    })
    filteredRowsCollection['columnNames'] = columnNames;

    let tableView = new TableView({
        collection: filteredRowsCollection
    });
    tableView.render();



    let appContainer = $("#appContainer");
    appContainer.empty();
    appContainer.append(filterView.el);
    appContainer.append(tableView.el);


    let makeid = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 1; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    let rows = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        let curRow = new RowModel({
            data: {
                "Column1": makeid(),
                "Column2": makeid(),
                "Column3": makeid()
            },
            columnIndexMap: columnIndexMap
        });
        rows.push(curRow);
    }
    rowsCollection.reset(rows);

    //GET SELECTED ROWS
    // window.setInterval(function(){
    //     let selectedRows = rowsCollection.where({
    //         selected: true
    //     });
    //     console.log('selected rows count: '+selectedRows.length);
    //     if (selectedRows.length > 0)
    //         console.log('first selected row: '+selectedRows[0].get('data')['Column1']);
    // }, 1000);

    //RESET DATA
    // window.setTimeout(function () {
    //     console.log("Update data");
    //     let rows = [];
    //     for (let rowIndex = 0; rowIndex < 1000; rowIndex++) {
    //         let curRow = new RowModel({
    //             data: {
    //                 "Column1": makeid(),
    //                 "Column2": makeid(),
    //                 "Column3": makeid()
    //             },
    //             columnIndexMap: columnIndexMap
    //         });
    //         rows.push(curRow);
    //     }
    //     rowsCollection.reset(rows);
    // }, 10000);
    //ADD DATA
    window.setInterval(function () {
        console.log("Add data");
        let curRow = new RowModel({
            data: {
                "Column1": makeid(),
                "Column2": makeid(),
                "Column3": makeid()
            },
            columnIndexMap: columnIndexMap
        });
        // let rows = [];
        // for (let rowIndex = 0; rowIndex < 1000; rowIndex++) {
        //     let curRow = new RowModel({
        //         data: {
        //             "Column1": makeid(),
        //             "Column2": makeid(),
        //             "Column3": makeid()
        //         },
        //         columnIndexMap: columnIndexMap
        //     });
        //     rows.push(curRow);
        // }
        rowsCollection.add(curRow);
    }, 5000);

});