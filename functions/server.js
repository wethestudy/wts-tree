import { isDevelopment } from '../src/devSettings';
import { url } from '../src/database/links.js'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless= require('serverless-http');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');

const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BASE_ID = 'app7qupBwSPEY7HaZ';
const TABLE_NAME = 'tbl2LMlJCuEYW5jv5';
const MEMBERSTACK_SECRET_API_KEY = process.env.REACT_APP_SECRET_MEMBERSTACK_ID;
const memberstackURL = 'https://admin.memberstack.com/members';

router.get('/demo', (req, res)=>{
  res.send('App is running...')
}) 

// router.get('/api/get-sample-member', async(req, res)=>{
//   axios.get(`${memberstackURL}/xtiandirige%40gmail.com`, {
//     headers: {
//       "X-API-KEY": `${MEMBERSTACK_SECRET_API_KEY}`
//     }
//   })
//     .then(response => {
//       // console.log(response)
//       // const memberId = response.data.id;
//       res.json(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching Memberstack ID:', error);
//       res.status(500).json({ error: 'Failed to fetch Memberstack ID' });
//     });
// });

router.get('/api/memberstack', async (req, res) => {
    // const memberstackId = `${MEMBERSTACK_API_KEY}`;
    // res.json({ publicKey: memberstackId });
    // const url = 'https://admin.memberstack.com/members';

    // try{
    //     const memberstackResponse = axios.get(url, {
    //         headers: {
    //           "X-API-KEY": `${SECRET_API_KEY}`
    //         }
    //       })
        
    //     res.json({ publicKey: MEMBERSTACK_API_KEY });
    // }catch(error){
    //     console.error('Error fetching Memberstack ID:', error);
    //     res.status(500).json({ error: 'Failed to fetch Memberstack ID' });
    // }

    axios.get(memberstackURL, {
      headers: {
        "X-API-KEY": `${MEMBERSTACK_SECRET_API_KEY}`
      }
    })
      // .then(response => {
      //   res.json({ publicKey: MEMBERSTACK_PUBLIC_API_KEY });
      // })
      .catch(error => {
        console.error('Error fetching Memberstack ID:', error);
        res.status(500).json({ error: 'Failed to fetch Memberstack ID' });
      });
  });

// router.get('/api/airtable', async (req, res) => {
//     try {
//       let allRecords = [];
//       let offset = null;
  
//       // Loop until all records are fetched
//       while (true) {
//         // Make the request to Airtable API with the offset
//         const response = await axios.get(
//           `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
//           {
//             headers: {
//               Authorization: `Bearer ${AIRTABLE_API_KEY}`,
//             },
//             params: {
//               pageSize: 100, // Maximum number of records per request (max: 100)
//               offset: offset, // Set the offset
//             },
//           }
//         );
  
//         const records = response.data.records;
//         allRecords = allRecords.concat(records);
  
//         // If there are more records, update the offset for the next request
//         if (response.data.offset) {
//           offset = response.data.offset;
//         } else {
//           // If no more records, break the loop
//           break;
//         }
//       }
  
//       res.json(allRecords);
//     } catch (error) {
//       console.error('Error fetching records from Airtable:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

const app = express();

const corsOptions = {
  origin: isDevelopment ? 'http://localhost:3000' : url,
  methods: 'GET,POST,PUT,PATCH,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use('/.netlify/functions/server', router)

app.use(bodyParser.json());
app.use('/.netlify/functions/api', router)

const handler = serverless(app);

// Export the wrapped handler function
module.exports.handler = async (event, context) => {
  // Invoke the wrapped handler function
  return await handler(event, context);
};

module.exports.handler = serverless(app)

// DEVELOPMENT
// const port = process.env.PORT || 8000;

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

// app.get('/api/airtable', async (req, res) => {
//   try {
//     let allRecords = [];
//     let offset = null;

//     // Loop until all records are fetched
//     while (true) {
//       // Make the request to Airtable API with the offset
//       const response = await axios.get(
//         `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
//         {
//           headers: {
//             Authorization: `Bearer ${AIRTABLE_API_KEY}`,
//           },
//           params: {
//             pageSize: 100, // Maximum number of records per request (max: 100)
//             offset: offset, // Set the offset
//           },
//         }
//       );

//       const records = response.data.records;
//       allRecords = allRecords.concat(records);

//       // If there are more records, update the offset for the next request
//       if (response.data.offset) {
//         offset = response.data.offset;
//       } else {
//         // If no more records, break the loop
//         break;
//       }
//     }

//     res.json(allRecords);
//   } catch (error) {
//     console.error('Error fetching records from Airtable:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/', (req, res) => {
//   res.send('Hello, server!');
// });