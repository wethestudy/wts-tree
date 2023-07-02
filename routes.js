require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const MEMBERSTACK_API_KEY = process.env.MEMBERSTACK_ID;
const SECRET_API_KEY = process.env.SECRET_MEMBERSTACK_ID;
const BASE_ID = 'app7qupBwSPEY7HaZ';
const TABLE_NAME = 'tbl2LMlJCuEYW5jv5';


router.get('/api/memberstack', (req, res) => {
    // const memberstackId = `${MEMBERSTACK_API_KEY}`;
    // res.json({ publicKey: memberstackId });

    const url = 'https://admin.memberstack.com/members';

    axios.get(url, {
      headers: {
        "X-API-KEY": `${SECRET_API_KEY}`
      }
    })
      .then(response => {
        // console.log(response)
        // const memberId = response.data.id;
        res.json({ publicKey: MEMBERSTACK_API_KEY });
      })
      .catch(error => {
        console.error('Error fetching Memberstack ID:', error);
        res.status(500).json({ error: 'Failed to fetch Memberstack ID' });
      });


  });

router.get('/api/airtable', async (req, res) => {
    try {
      let allRecords = [];
      let offset = null;
  
      // Loop until all records are fetched
      while (true) {
        // Make the request to Airtable API with the offset
        const response = await axios.get(
          `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
            params: {
              pageSize: 100, // Maximum number of records per request (max: 100)
              offset: offset, // Set the offset
            },
          }
        );
  
        const records = response.data.records;
        allRecords = allRecords.concat(records);
  
        // If there are more records, update the offset for the next request
        if (response.data.offset) {
          offset = response.data.offset;
        } else {
          // If no more records, break the loop
          break;
        }
      }
  
      res.json(allRecords);
    } catch (error) {
      console.error('Error fetching records from Airtable:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;