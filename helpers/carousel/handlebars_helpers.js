const _ = require("lodash")

module.exports = {
    generate_title_helper: function () {

        var title = this.product_basic_info.normalized_name + " (" + this.general_specifications.model_color + ", " + this.memory_storage.internal_storage + ")";
        return title;
    },


    generate_price_helper: function () {

        cheapest_retailer = _.minBy(this.product_retailers, function (o) { return o.product_pricing.special_price || 999999; });

        if (cheapest_retailer.product_pricing.special_price > 0) {

            var return_string =   cheapest_retailer.product_pricing.special_price;

            return return_string

        } else {

            return "Out of stock"
        }

    },

    generate_old_price_helper: function () {

        cheapest_retailer = _.minBy(this.product_retailers, function (o) { return o.product_pricing.special_price || 999999; });

        if (cheapest_retailer.product_pricing.mrp > 0) {

            var return_string = cheapest_retailer.product_pricing.mrp;

            return return_string

        } else {

            return "Out of stock"
        }

    },


    get_reactions: function (selected_variant, reaction) {

        console.log("selected variant ", selected_variant, "reaction ", reaction)


        if (selected_variant.reactions && selected_variant.reactions[reaction]) {
            return selected_variant.reactions[reaction]
        } else {

            return ""
        }

    }

}

