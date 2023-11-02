'use strict';
import app from './src/inbound/rest/router.js';

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
    console.log(`Environment ${process.env.NODE_ENV}!`);
})