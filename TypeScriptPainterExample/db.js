var mongodb = require("mongodb");
var server = new mongodb.Server("localhost", 27017, { auto_reconnect: true });
var db = new mongodb.Db("PainterDb", server, { w: 1 });
db.open(function () { });
var Painter = (function () {
    function Painter() {
    }
    return Painter;
})();
exports.Painter = Painter;
function getPainter(id, callback) {
    db.collection("painters", function (error, painters) {
        if (error) {
            console.error(error);
            return;
        }
        painters.findOne({ _id: new mongodb.ObjectID(id.toString()) }, function (error, painter) {
            if (error) {
                console.error(error);
                return;
            }
            callback(painter);
        });
    });
}
exports.getPainter = getPainter;
function getPainterNames(callback) {
    db.collection("painters", function (error, painters) {
        if (error) {
            console.error(error);
            return;
        }
        painters.find({}, { "name": 1 }).toArray(function (error, items) {
            if (error) {
                console.error(error);
                return;
            }
            callback(items);
        });
    });
}
exports.getPainterNames = getPainterNames;
function addPainter(items, callback) {
    db.collection("painters", function (error, painters) {
        if (error) {
            console.error(error);
            return;
        }
        painters.insert(items, function (error, painter) {
            if (error) {
                console.error(error);
                return;
            }
            callback(painter);
        });
    });
}
exports.addPainter = addPainter;
//# sourceMappingURL=db.js.map