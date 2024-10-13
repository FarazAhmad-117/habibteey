import { model, Schema } from "mongoose"


const nameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});


const Name = model('Name', nameSchema);


export default Name;