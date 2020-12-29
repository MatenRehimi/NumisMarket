import * as admin from 'firebase-admin';

exports.handler = function(event, context, callback) {
    
    // let x = auth.createUserWithEmailAndPassword(email,password)
    console.log(event.httpMethod)
    callback(null, {
        statusCode:200,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify("s")
    });
 
}