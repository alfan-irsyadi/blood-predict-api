const express = require("express");
const { FuzzyLogic, rules } = require('./fuzzy.js')
const data = require('./data.json')

const app = express();
// const http = require(ht)
function mid(list) {
    return [list[0], (list[0] + list[1]) / 2, list[1]]
}

app.get("/", (req, res) => {
    console.log(data)
    if (req.query) {
        var golda = req.query.golda
        console.log(req.query)
        var muPersediaan = mid(data[golda]['persediaan'])
        var muPermintaan = mid(data[golda]['permintaan'])
        var muPenerimaan = mid(data[golda]['penerimaan'])
        var persediaan = req.query.persediaan
        var permintaan = req.query.permintaan
        var GoldaA = new FuzzyLogic(muPersediaan, muPermintaan, muPenerimaan)
        GoldaA.setRules(rules)
        var mamdani = Math.ceil(GoldaA.mamdani(persediaan, permintaan))
        var sugeno = (Math.ceil(GoldaA.sugeno(persediaan, permintaan)))
        res.type('application/json')
        // res.send("Express on Vercel");
        res.json(JSON.stringify({ 'mamdani': mamdani , 'sugeno': sugeno}, null, 4 ))
    }


});

app.listen(5000, () => {
    console.log("Running on port 5000.");
});


// Export the Express API
// module.exports = app;