require('dotenv').config();

export default {
	mongo_uri: process.env.MONGO_URI || 'mongodb://db',
	port: parseInt(process.env.PORT || '4801')
}
