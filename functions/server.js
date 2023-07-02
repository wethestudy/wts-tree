require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const serverless= require('serverless-http');

const app = express();

app.use(cors());
app.use('/.netlify/functions/api', routes)

module.exports.handler = serverless(app)

// const port = process.env.PORT || 8000;

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });



// app.get('/api/airtable', (req, res) => {
//   const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
//   const BASE_ID = 'app7qupBwSPEY7HaZ';
//   const TABLE_NAME = 'tbl2LMlJCuEYW5jv5';

//   const endpoint = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
//   const config = {
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//     },
//   };

//   axios.get(endpoint, config)
//     .then((response) => {
//       const records = response.data.records;
//       // Process the fetched records as needed
//       res.json(records);
//     })
//     .catch((error) => {
//       // console.error(error);
//       res.status(500).json({ error: 'Failed to fetch records' });
//     });
// });

// app.get('/', (req, res) => {
//   res.send('Hello, server!');
// });


