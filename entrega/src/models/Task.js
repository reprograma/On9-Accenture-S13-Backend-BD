const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
    done: {type: Boolean, default: false},
    description: String,
    collab: {type: String, required: true},
},
{timestamps: true});

const Task =  mongoose.model("Task", userSchema);

module.exports = Task;