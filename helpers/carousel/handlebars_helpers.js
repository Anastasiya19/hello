

const exphbs = require('express-handlebars');
const _ = require("lodash")
const fs = require("fs")
const path = require("path")

var handlebars_helpers = {
    generate_title_helper: function () {

        var title = this.product_basic_info.normalized_name + " (" + this.general_specifications.model_color + ", " + this.memory_storage.internal_storage + ")";
        return title;
    },


    generate_price_helper: function () {

        cheapest_retailer = _.minBy(this.product_retailers, function (o) { return o.product_pricing.special_price || 999999; });

        if (cheapest_retailer.product_pricing.special_price > 0) {

            var return_string = cheapest_retailer.product_pricing.special_price;

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

var hbs = exphbs.create({

    helpers: handlebars_helpers,
    partialsDir: [

        path.join(__dirname, '../../views/partials/')
    ],
    defaultLayout: "client",
    layoutsDir: path.join(__dirname, '../../views/layouts/')
});


fs.readFile(path.join(__dirname, "../../jsons/show_me apple phones.json"), 'utf8', function (err, apple_json) {
    if (err) {
        console.log('Error  ' + err);
        return;
    }
    fs.readFile(path.join(__dirname, "../../jsons/_Samsung_phones.json"), 'utf8', function (err, samsung_json) {
        var apple_phones = JSON.parse(apple_json).web_reply.data.mobiles[0].variants
        var samsung_phones = JSON.parse(samsung_json).web_reply.data.mobiles[0].variants
        hbs.renderView(path.join(__dirname, "../../views/chat.handlebars"), {
            carousel: [
                {carousel_phone: apple_phones}, { carousel_phone: samsung_phones }
            ]
        }, (err, temp) => {
            console.log(temp)
            console.log(err)
            fs.writeFile(path.join(__dirname, "../../public/chat.html"), temp, "utf8", function (err) {
                console.log(err)
            })
        })
        // .catch(err=>{
        //     console.log(err)
        // })
        // console.log(carousel_phone)
        // fs.readFile(path.join(__dirname,"../../views/chat.handlebars"), 'utf8',function(err, temp) {
        // hbs.handlebars.compile(temp)({carousel_phone:carousel_phone},{helpers: handlebars_helpers});
        // })
    })
})
//render(filePath, context, [options])


