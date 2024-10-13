import mongoose, { model, Schema } from "mongoose"


const nameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});


const Name = mongoose.models.Name || model('Name', nameSchema);


export default Name;