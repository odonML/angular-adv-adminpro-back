const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const CLIENT_ID = process.env.GOOGLE_ID;
const SECRET_ID = process.env.GOOGLE_SECRET;

const client = new OAuth2Client(SECRET_ID);
async function googleVerify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	console.log(payload);
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
	return payload;
}

module.exports = {
	googleVerify,
};
