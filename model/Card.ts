import { model, Schema } from "mongoose"


const cardSchema = new Schema({
    frontText: {
        type: String,
        required: true
    },
    backText: {
        type: String,
        required: true
    },
    backTitle: {
        type: String,
        required: true
    }
});


const Card = model('Card', cardSchema);


export default Card;