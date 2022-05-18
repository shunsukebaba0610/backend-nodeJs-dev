const express = require("express");
const app = express();
const PORT = 3000;
const stripe = require("stripe")("sk_test_51Kaf1ULsotxuoiWEAZZUcXnDrlNWk0Fc46ulhSv8zbswqYN97nWpah1K3WwD9wC5t0QBJ3oNfdFaZjeLdjpf0p8p00HRtXqCxO");
const YOUR_DOMAIN = 'http://localhost:3000'

//静的ファイルの反映
app.use(express.static("public"));

//サブスクリプション登録の生成
app.post("/create-checkout-session", async(req, res) => {
	try{
		const prices = await stripe.prices.list();
		console.log(prices);
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: prices.data[0].id,
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: `${ YOUR_DOMAIN }/success.html?session_id={CHECKOUT_SESSIONZ_ID}`,
			cancel_url: `${ YOUR_DOMAIN }/cancel_url`,
		});
		res.redirect(303, session.url);

	} catch(err) {
		console.log(err);
	}
});

app.listen(PORT, console.log("サーバーが起動しました。"));