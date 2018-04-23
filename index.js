const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser');
const request = require('request');

const getRate = () => new Promise((resolve, reject) => {
    request({
        uri: "https://dashenbanksc.com/cashexchangerate/rate.php",
    }, (error, response, body) => {
        if (body) {
            let $ = cheerio.load(body);

            cheerioTableparser($);

            let data = $("table").parsetable();

            let rate = [];
            for (let i = 1, l = data[0].length; i < l; i++) {
                rate.push({
                    currency: data[0][i].replace(/\n &#xA0;/g, ''),
                    buying: data[1][i].replace(/\n &#xA0;/g, ''),
                    selling: data[2][i].replace(/\n &#xA0;/g, ''),
                })
            }
            return resolve(rate);
        } else return reject(error)
    });
});

module.exports = {
    getRate: getRate
}


