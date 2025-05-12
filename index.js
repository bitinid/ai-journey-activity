const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/config.json', (req, res) => {
  res.sendFile(__dirname + '/config.json');
});

app.post('/journeybuilder/execute', async (req, res) => {
  try {
    const inputData = req.body.inArguments?.[0];

    const aiResponse = await axios.post(process.env.AI_ENDPOINT1, inputData);

    const classifiedData = aiResponse.data;

    res.status(200).json({
      outArguments: [{ classifiedData }],
      result: 'success',
      inArguments: req.body.inArguments
    });
  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({ result: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI Journey Activity listening on port ${PORT}`);
});
