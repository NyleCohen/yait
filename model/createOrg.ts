import mongoose from 'mongoose';

const createOrgSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    name: {
        type: String,
        required: true
    },
}, { autoCreate: true, capped: 1024 });

function createOrg(colName: string) {
    mongoose.model(colName, createOrgSchema);
}

module.exports = createOrg;
