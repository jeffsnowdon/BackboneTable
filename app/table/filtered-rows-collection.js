define(['jquery', 'underscore', 'backbone', 'app/table/row-model'], function ($, _, Backbone, RowModel) {
    let FilteredRowsCollection = Backbone.Collection.extend({
        model: RowModel,
        rowsCollection: null,
        sortColumn: null,
        sortAscending: true,
        filterModel: null,
        paginationModel: null,

        initialize: function (attrs) {
            this.options = attrs;
            this.filterModel = this.options.filterModel;
            this.paginationModel = this.options.paginationModel;
            this.sortColumn = this.options.sortColumn ? this.options.sortColumn : null;
            this.rowsCollection = this.options.rowsCollection;

            this.listenTo(this.rowsCollection, "add remove reset update", function () {
                this.resetWithFilters();
            }, this);

            this.listenTo(this.filterModel, "change", function () {
                this.resetWithFilters();
            }, this);

            this.listenTo(this.paginationModel, "change", function () {
                this.resetWithFilters();
            }, this)
        },

        /**
         * Filter
         */
        resetWithFilters: function () {
            models = this.applyFilterToModels(this.rowsCollection.models);
            models = this.applySort(models);
            models = this.applyPagination(models);
            this.reset(models);
        },
        applyFilterToModels: function (models) {
            let filteredData = models;
            let filter = this.filterModel.get('filter');
            let columnNames = this.filterModel.get('targetColumnNames');

            // Mark this as filtered
            this.isFiltered = !!filter;
            if (this.isFiltered) {
                // Apply new filter
                filteredData = _.filter(models, function (row) {
                    let result = false;
                    for (var i = 0; i < columnNames.length; i++) {
                        let columnName = columnNames[i];
                        let dataForColumn = row.get('data')[columnName];
                        if (dataForColumn && _.contains(dataForColumn, filter)) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            return filteredData;
        },

        /**
         * Pagination
         */
        applyPagination: function (models) {
            let rowsPerPage = this.paginationModel.get('rowsPerPage');
            let currentPageIndex = this.paginationModel.get('currentPageIndex');
            if (rowsPerPage == -1 || currentPageIndex == -1 || models.length == 0) {
                return models;
            }
            let modelIndexMin = Math.min(models.length - 1, rowsPerPage * currentPageIndex);
            let modelIndexMax = modelIndexMin + rowsPerPage;
            modelIndexMax = Math.min(models.length - 1, modelIndexMax);
            return models.slice(modelIndexMin, modelIndexMax);
        },
        calculateNumPages: function(){
            let models = this.applyFilterToModels(this.rowsCollection.models);
            let rowsPerPage = this.paginationModel.get('rowsPerPage');
            return Math.ceil(models.length / rowsPerPage);
        },

        /**
         * Sort
         */
        applySort: function(models){
            return models.sort(_.bind(this.compareRows, this));
        },
        compareRows: function (a, b) {
            let sortColumn = this.sortColumn;
            if (!sortColumn) {
                return this.sortByRowID(a, b);
            }
            let aVal = a.get('data')[sortColumn];
            let bVal = b.get('data')[sortColumn];
            if (!aVal || !bVal) {
                if (!aVal)
                    return this.applyAscending(1);
                else
                    return this.applyAscending(-1);
            }
            if (aVal.localeCompare(bVal) == -1) {
                return this.applyAscending(-1);
            } else if (aVal.localeCompare(bVal) == 1) {
                return this.applyAscending(1);
            } else {
                //they are equal
                //use row ID's instead for consistent sorting
                return this.sortByRowID(a, b);
            }
        },
        sortByRowID: function (a, b) {
            return a.cid < b.cid ? -1 : (a.cid > b.cid ? 1 : 0);
        },
        applyAscending: function (sortValue) {
            if (this.sortAscending || sortValue == 0)
                return sortValue;
            return sortValue == -1 ? 1 : -1;

        },
        toggleSortColumn: function (sortColumn) {
            //column toggle
            if (this.sortColumn == sortColumn)
                this.sortAscending = !this.sortAscending;
            //new column
            else {
                this.sortColumn = sortColumn;
                this.sortAscending = true;
            }
            // this.sort();
            this.resetWithFilters();
        }
    });

    return FilteredRowsCollection;
});