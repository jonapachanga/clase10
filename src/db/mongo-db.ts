
import { MONGO_HOST } from "../config";

const dbConnection = {
    mongoDbHost: MONGO_HOST,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }
};

export default dbConnection;