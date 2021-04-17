const Image = require('../models/Image')

exports.getImage = async (req, res) => {
    if (req.params.id) {
        const find = await Image.findById(req.params.id).exec()
        if (find) {
            const img = Buffer.from(find.base64, "base64")
            res.writeHead(200, {
                "Content-Type": find.type,
                "Content-Length": img.length,
            })
            return res.end(img)
        }
        return res.status(404).send({
            message: "Not found image!",
        })
    }
}