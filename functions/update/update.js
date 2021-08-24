// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

var faunadb = require('faunadb'),
  q = faunadb.query;

const handler = async (event) => {
  try {
    let reqObj = JSON.parse(event.body);
    var adminClient = new faunadb.Client({ secret: 'fnAERSkuizACRFtz7ioe5sC1Nav8WRKw3q0N_omf' });
    const result = await adminClient.query(
      q.Update(
        q.Ref(q.Collection('messages'), reqObj.id),
        { data: { detail: reqObj.x } },
      )
    )
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
