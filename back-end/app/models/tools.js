const mongoose = require('../../database/index');

const ToolsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
});

const Tools = mongoose.model('Tools', ToolsSchema);
module.exports = Tools;