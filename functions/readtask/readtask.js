// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

var faunadb = require('faunadb'),
  q = faunadb.query;


const handler = async (event) => {
  try {

    var adminClient = new faunadb.Client({ secret: 'fnAERSkuizACRFtz7ioe5sC1Nav8WRKw3q0N_omf' });

    const result = await adminClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("messages"))),
        q.Lambda((x) => q.Get(x))
      )
    )


    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
