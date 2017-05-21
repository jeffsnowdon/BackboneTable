define(['jquery', 'underscore', 'backbone', 'app/table/row-model'], function ($, _, Backbone, RowModel) {
    let RowsCollection = Backbone.Collection.extend({
        model: RowModel,
        _allRows: [],
        _isFiltered: false,

        comparator: function (a, b) {
            let sortColumn = this.sortColumn;
            if (!sortColumn) {
                return 0;
            }
            let aVal = a.get('data')[sortColumn];
            let bVal = b.get('data')[sortColumn];
            if (!aVal || !bVal) {
                if (!aVal)
                    return 1
                else
                    return -1
            }
            return (aVal < bVal ? -1 : (aVal > bVal ? 1 : 0));
        },

        initialize: function (attrs) {
            this.applyFilter = _.debounce(this.applyFilter, 500);
            this.options = attrs;
            this.filterModel = this.options.filterModel;
            this.columnIndexMap = this.options.columnIndexMap;
            this.sortColumn = this.options.sortColumn ? this.options.sortColumn : null;
            let data = this.options.data;
            // The initial data sent to collection will be saved
            if (data) {
                this._setTotalData(data);
            }

            // Data updates should reflect in _allRows
            this.listenTo(this, 'add', function () {
                this._setTotalData();
            });
            this.listenTo(this, 'remove', function () {
                this._setTotalData();
            });
            this.listenTo(this, 'reset', function () {
                this._setTotalData();
            });

            this.listenTo(this.filterModel, "change", function () {
                this.applyFilter(this.filterModel.get('filter'), this.filterModel.get('targetColumnNames'));
            })
        },

        // Every time new data has been added to the collection
        _setTotalData: function (data) {
            if (!this._isFiltered)
                this._allRows = this.models;
        },

        // Apply a new filter to the collection
        applyFilter: function (filter, columnNames) {
            // Clear the previous filter
            this.clearFilter();

            // Mark this as filtered
            this._isFiltered = !!filter;
            if (this._isFiltered) {
                // Apply new filter
                let filteredData = this.filter(function (row) {
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
                this.reset(filteredData);
            }
        },

        // Clear all filters applied to this collection
        clearFilter: function () {
            // skip first reset event while the collection
            // has the original data
            if (this._isFiltered) {
                // Reset the collection with complete data set
                this.reset(this._allRows);
                this._isFiltered = false;
            }
        }
    });

    return RowsCollection;
});