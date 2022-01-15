const mongoose = require("mongoose");

const documnetSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Document", documnetSchema);
