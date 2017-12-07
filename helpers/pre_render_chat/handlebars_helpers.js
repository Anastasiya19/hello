
const _ = require("lodash")

module.exports = {

    // helper for creating the title very similar to the front end helper
    generate_title_helper: function () {

        var title = this.product_basic_info.normalized_name + " (" + this.general_specifications.model_color + ", " + this.memory_storage.internal_storage + ")";
        return title;
    },

    // helper that will return the lowest special price among retailers excluding  zeros
    generate_price_helper: function () {

        cheapest_retailer = _.minBy(this.product_retailers, function (o) { return o.product_pricing.special_price || 999999; });

        if (cheapest_retailer.product_pricing.special_price > 0) {

            var return_string = cheapest_retailer.product_pricing.special_price;

            return return_string

        } else {

            return "Out of stock"
        }

    },

    // the same as the above except it returns the mrp price
    generate_old_price_helper: function () {

        cheapest_retailer = _.minBy(this.product_retailers, function (o) { return o.product_pricing.special_price || 999999; });

        if (cheapest_retailer.product_pricing.mrp > 0) {

            var return_string = cheapest_retailer.product_pricing.mrp;

            return return_string

        } else {

            return "Out of stock"
        }

    },

    // check if the phone have the reactions object and returns them
    get_reactions: function (selected_variant, reaction) {

  
        if (selected_variant.reactions && selected_variant.reactions[reaction]) {
            return selected_variant.reactions[reaction]
        } else {

            return ""
        }

    }

}

