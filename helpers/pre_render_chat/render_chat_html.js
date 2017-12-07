
const exphbs = require('express-handlebars'),
    _ = require("lodash"),
    fs = require("fs"),
    path = require("path"),
    async = require("async"),
    Q = require("q"),
    handlebars_helpers = require("./handlebars_helpers"),
    get_json = require("./get_jsons");

const chat_view_path = path.join(__dirname, "../../views/chat.handlebars");

// the path to the jsons containing the phones data
const jsons_path = path.join(__dirname, "../../jsons/")
//the path to the rendered html
const html_path = path.join(__dirname, "../../public/chat.html")

// the text is the title of the carousel for side carousels
const jsons = {
    chat_carousels: [{
        text: "show me Apple phones",
        json:"show_me apple phones.json"
    },{
        text: "show me Samsung phones",
        json:"_Samsung_phones.json"
    }],
    side_carousels: [{
        text: "Top rated Mobiles",
        json:"google_pixel_phones.json"
    },{
        text: "Expert Pick Mobiles",
        json:"_HTC_phones.json"
    },{
        text: "Phones with fingerprint scanner",
        json:"_Samsung_phones.json"
    }]
}



// this will be  scheduled
render_chat_html(jsons).then(() => {

    console.log('done')

}).catch(err => {
    console("Error")
})



/**
 *  this function will read the json and render the chat html
 * @param {Array} jsons will contain the name of the jsons to include in the context
 * 
 */
function render_chat_html(jsons) {

    var deferred = Q.defer()

    // creating the view engine with the helpers specified below 
    // client layout and the specified path the partials 
    var hbs = exphbs.create({
        helpers: handlebars_helpers,
        partialsDir: [
            path.join(__dirname, '../../views/partials/')
        ],
        defaultLayout: "client",
        layoutsDir: path.join(__dirname, '../../views/layouts/')
    });

    var context = {
        chat_carousels: [],
        side_carousels: []
    }

    async.forEachOfSeries(jsons, function (json, carousel_key, carousel_callback) {
        // reading each json file asynchronously in order 
        async.forEachOfSeries(jsons[carousel_key], function (carousel, json_key, callback) {
            // reading the josn
            fs.readFile(jsons_path + carousel.json, "utf8", function (err, data) {
                if (err) return callback(err);

                // parsing the json
                try {
                    context[carousel_key].push({
                         carousel_phones: JSON.parse(data).web_reply.data.mobiles[0].variants,
                         text:carousel.text 
                        });
                } catch (e) {
                    return callback(e);
                }
                callback();
            });
        }, function (err) {
            if (err) {
                console.error("Error reading or parsing the json ", err.message);
                return deferred.reject(err)
            }

            carousel_callback()
        })
    },
        // when all jsons have been read and the context is created
        function (err) {
            if (err) {
                console.error("Error reading or parsing the json ", err.message);
                return deferred.reject(err)
            }

            console.log("context ",context)
            // rendering the template with the context 
            hbs.renderView(chat_view_path, context, (err, template) => {

                if (err) {
                    console.log("err rendering ", err);
                    return deferred.reject(err)
                }
                // saving the rendered template string in the html file
                fs.writeFile(html_path, template, "utf8", function (err) {

                    if (err) {
                        console.log("err saving template", err)
                        return deferred.reject(err)
                    }


                    return deferred.resolve()
                })
            })
        });
    return deferred.promise
}
