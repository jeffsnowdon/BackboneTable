define(['jquery', 'underscore', 'backbone', 'app/table/table-view', 'app/table/row-model', 'app/table/rows-collection', 'app/filter/filter-model', 'app/filter/filter-view'], function ($, _, Backbone, TableView, RowModel, RowsCollection, FilterModel, FilterView) {

    let filterModel = new FilterModel();
    let filterView = new FilterView({
        model: filterModel
    });
    filterView.render();

    let rowsCollection = new RowsCollection({
        filterModel: filterModel,
        data: {}
    });
    rowsCollection['columnNames'] = ["Column 1", "Column 2", "Column 3"];

    let tableView = new TableView({
        collection: rowsCollection
    });
    tableView.render();



    let container = $("#container");
    container.empty();
    container.append(filterView.el);
    container.append(tableView.el);


    let makeid = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 1; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    let rows = [];
    for (let rowIndex = 0; rowIndex < 100; rowIndex++) {
        let curRow = new RowModel({
            columnData: [makeid(), makeid(), makeid()]
        });
        rows.push(curRow);
    }
    rowsCollection.reset(rows);


});