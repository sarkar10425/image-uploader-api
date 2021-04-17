const Image = require('../models/Image')
require("dotenv").config()

exports.postImage = async (req, res) => {
    console.log("I am here post/upload")
    if (req.body.base64) {
        // check max image
        const count = await Image.find().countDocuments().exec()
        const deleteMax = process.env.max_image / 2
        let c = 0
        if (count >= process.env.max_image) {
            const getForRemove = await Image.find().sort({ createdAt: -1 }).exec()
            for (let elem of getForRemove) {
                console.log(elem._id)
                await Image.findByIdAndDelete(elem._id).exec()
                c++
                if (c >= deleteMax) {
                    console.log("break")
                    break
                }
            }
        }
        const type = req.body.base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]
        const image = new Image({ base64: req.body.base64.split(",")[1], type })
        const save = await image.save()
        const fullUrl = req.protocol + "://" + req.get("host") + "/image"
        return res.json({ success: true, url: fullUrl + "/" + save._id })
    }
    return res.json({ success: false })
}