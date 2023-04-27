const express = require('express');
const router = express.Router();

const { getDataParamsResponse } = require('../helper/google_sheet_api');

router.post('/dialogflow', async (req, res) => {
    let intentName = req.body.queryResult.intent.displayName;

    getDataParamsResponse(intentName, req.body.queryResult.parameters);

    // res.send(
    //     {
    //         fulfillmentText: result
    //     }
    // );
});

module.exports = {
    router
};
