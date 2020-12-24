exports.handler = function(event, context, callback) {
    console.log(event.body);
    const x = JSON.stringify(event.body)
    console.log(x)
    console.log(typeof(x))
    console.log(x["email"])
    callback(null, {
        statusCode:200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: JSON.stringify("hello world")
    });
}