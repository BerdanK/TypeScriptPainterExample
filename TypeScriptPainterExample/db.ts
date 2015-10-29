import mongodb = require("mongodb");

var server = new mongodb.Server("localhost", 27017, { auto_reconnect: true });
var db = new mongodb.Db("PainterDb", server, { w: 1 });
db.open(() => { });

export interface IPainter {
    _id: mongodb.ObjectID;
    name: string;
    birthDate: number;
    description: string;
    images: string[];
}

export class Painter implements IPainter {
    _id: mongodb.ObjectID;
    name: string;
    birthDate: number;
    description: string;
    images: string[];
}

export function getPainter(id: mongodb.ObjectID, callback: (painter: IPainter) => void ) {
    db.collection("painters", (error, painters) => {
        if (error) {
            console.error(error);
            return;
        }

        painters.findOne({ _id: new mongodb.ObjectID(id.toString()) }, (error, painter) => {
            if (error) {
                console.error(error);
                return;
            }
            callback(painter);
        });
    });
}

export function getPainterNames(callback: (painters: IPainter[]) => void) {
    db.collection("painters", (error, painters) => {
        if (error) {
            console.error(error);
            return;
        }
        painters.find({}, { "name": 1 }).toArray((error, items) => {
            if (error) {
                console.error(error);
                return;
            }
            callback(items);
        });
    });
}

export function addPainter(items: IPainter, callback: (painter: IPainter) => void) {
    db.collection("painters", (error, painters) => {
        if (error) {
            console.error(error);
            return;
        }

        painters.insert(items, (error, painter) => {
            if (error) {
                console.error(error);
                return;
            }
            callback(painter);
        });
    });
}