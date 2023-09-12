import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
});

export const Event = mongoose.model("Event", EventSchema);