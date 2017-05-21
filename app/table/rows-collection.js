define(['jquery', 'underscore', 'backbone', 'app/table/row-model'], function ($, _, Backbone, RowModel) {
    let RowsCollection = Backbone.Collection.extend({
        model: RowModel,
        _totalData: [],
        _isFiltered: false,

        defaults: {
            columnNames: []
        },

        initialize: function (attrs) {
            this.options = attrs;
            let data = this.options.data;
            // The initial data sent to collection will be saved
            if (data) {
                this._setTotalData(data);
            }

            // Data updates should reflect in _totalData
            this.listenTo(this, 'add', function () {
                this._setTotalData();
            });
            this.listenTo(this, 'remove', function () {
                this._setTotalData();
            });
            this.listenTo(this, 'reset', function () {
                this._setTotalData();
            });

            this.listenTo(this.options.filterModel, "change", function () {
                this.applyFilter(this.options.filterModel.get('filter'));
            })
        },

        // Every time new data has been added to the collection
        _setTotalData: function (data) {
            if (!this._isFiltered)
                this._totalData = data || this.toJSON();
        },

        // Apply a new filter to the collection
        applyFilter: function (criteria) {
            // Clear the previous filter
            this.clearFilter();

            // Mark this as filtered
            this._isFiltered = !!criteria;
            if (this._isFiltered) {
                // Apply new filter
                this.reset(this.where(criteria));
            }
        },

        // Clear all filters applied to this collection
        clearFilter: function () {
            // skip first reset event while the collection
            // has the original data
            if (this._isFiltered) {
                // Reset the collection with complete data set
                this.reset(this._totalData);
                this._isFiltered = false;
            }
        }
    });

    return RowsCollection;
});