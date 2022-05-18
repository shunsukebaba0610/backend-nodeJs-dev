require("dotenv").config();

module.exports = {
	jwt: {
		secret: process.env.SECRETKEY,
		options: {
			algorithm: "HS256", //使うアルゴリズム(暗号化方式)
			expiresIn: "1d",    //暗号キーの期限(１日)
		},
	},
}