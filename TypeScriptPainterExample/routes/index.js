var db = require("../db");
function index(req, res) {
    //var painter = new db.Painter();
    //painter._id = new mongodb.ObjectID();
    //painter.name = "Vincent van Gogh";
    //painter.birthDate = 1850;
    //painter.description = "Vincent van Gogh was born on March 30, 1853, in Groot-Zundert, Netherlands. Van Gogh was a post-impressionist painter whose work, notable for its beauty, emotion and color, highly influenced 20th century art. He struggled with mental illness, and remained poor and virtually unknown throughout his life. Van Gogh died in France on July 29, 1890, at age 37, from a self-inflicted gunshot wound.";
    //painter.images = ["http://a2.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE1ODA0OTcxODExNDQwMTQx.jpg", "https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg"];
    //db.addPainter(painter, (item) => {});
    db.getPainterNames(function (painters) {
        res.render('index', { title: 'Express', year: new Date().getFullYear(), painters: painters });
    });
}
exports.index = index;
;
function painter(req, res) {
    db.getPainter(req.params.painterId, function (painter) {
        res.render('painter', { painter: painter });
    });
}
exports.painter = painter;
//# sourceMappingURL=index.js.map