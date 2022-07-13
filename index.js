const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");
const request = require("request");

const getRate = () =>
  new Promise((resolve, reject) => {
    request(
      {
        uri: "https://dashenbanksc.com/daily-exchange-rates",
      },
      (error, response, body) => {
        if (body) {
          let $ = cheerio.load(body);

          cheerioTableparser($);

          let data = $("table").parsetable();

          if (!data || data.length == 0) return resolve([]);

          let rate = [];
          for (let i = 1; i < 18; i++) {
            rate.push({
              currency: data[1][i].replace(/&nbsp;\s*/g, ""),
              buying: data[2][i].replace(/&nbsp;\s*/g, ""),
              selling: data[3][i].replace(/&nbsp;\s*/g, ""),
              "transaction buying": data[4][i].replace(/&nbsp;\s*/g, ""),
              "transaction selling": data[5][i].replace(/&nbsp;\s*/g, ""),
            });
          }
          return resolve(rate);
        } else return reject(error);
      }
    );
  });

module.exports = {
  getRate: getRate,
};
