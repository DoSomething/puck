const KeenAnalysis = require('keen-analysis');

/* 
 * Iterate over list of Keen.io events, determine if they're already in Puck,
 * if not, insert them into the Puck database.
 */
async function processEventsForPuck(events) {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    // Attempt to find the event in the Puck database.
    const eventsFromPuck = await events.find({"meta.id": event.meta.id});

    // If found in Puck -- great! Continue on to the next event.
    if (eventsFromPuck.length) {
      console.log(`${event.meta.id} found in Puck`);
      continue;
    }

    // Otherwise, insert the event to the Puck database.
    try {
      await events.insert(event);
      console.log(`${event.meta.id} added to Puck`);
    } catch(err) {
      console.log(err);
    }
  }
}

/*
 * Iterate over list of Keen.io collections, grabbing each list of events per collection
 * and processing them for Puck backfill.
 */
async function processKeenCollections(collections) {
  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    console.log(`Processing ${collection}`);

    try {
      // Query for all the events of this collection filtered by timestamp.
      const response = await client
        .query('extraction', {
          event_collection: collection,
          timeframe: 'this_14_days',
          filters: [
            {
              property_name: 'meta.timestamp',
              operator: 'gte',
              property_value: 1548180867000,
            },
            {
              property_name: 'meta.timestamp',
              operator: 'lte',
              property_value: 1548185200000,
            }
          ],
        });

      // Remove the Keen.io specific fields from the events.
      const results = response.result.map(r => {
        delete r.keen;
        return r;
      });

      console.log(`Found ${results.length} ${collection} events.`);

      processEventsForPuck(results);
    } catch(err) {
      console.log(err);
    }

    if (i % 5 === 0) {
      // Sleep a bit every 5 calls so we don't get locked out of the Keen API for too many requests in a short timespan.
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
  };
}

async function run(client) {
  // initialize a connection to the Puck database.
  const db = require('monk')(process.env.MONGODB_URI);
  // Grab the events collection.
  const events = db.get('events');

  try {
    // Grab all collections (event names) from Keen.io.
    const response = await client
      .get(client.url('events'))
      .auth(client.readKey())
      .send()

    // Filter out the event names themselves from the response.
    const collections = response.map(collection => collection.name);

    // Process the collections.
    await processKeenCollections(collections);

    // Close the connection to the Puck database.
    db.close();
  } catch(err) {
    console.log(err);
  }
}

const client = new KeenAnalysis({
  projectId: process.env.KEEN_PROJECT_ID,
  readKey: process.env.KEEN_READ_KEY,
});

run(client);


