const app = require('./app')
require('dotenv').config();
const mongoose = require('mongoose')


const db_url = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD)
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => {
        console.log(`DB Connected`);
    }
).catch((err) => {
    console.log(err);

})




app.listen(3030, () => {
    console.log(`OK`);
})

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})