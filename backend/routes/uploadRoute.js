const express = require("express");
const { upload } = require("../middleware/upload");
const { uploadOnCloudinary } = require("../utils/cloudinary");
 // your cloudinary upload logic

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    const localPath = req.file?.path;

    const result = await uploadOnCloudinary(localPath);

    if (result) {
        res.json({ url: result.secure_url });
    } else {
        res.status(500).json({ error: "File upload failed" });
    }
});

module.exports = router;
