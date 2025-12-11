const app = require('../src/config/app');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

require('dotenv').config();


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

    console.log("Servidor rodando",PORT);
})

