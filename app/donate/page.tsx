"use client";

export default function Donate() {
	return (
		<>
			<title>Donate Me</title>

			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-12 text-center">
				<h1 className="text-4xl font-bold mb-4">Support My Work 💖</h1>
				<p className="text-lg mb-6 max-w-2xl">
					Your support helps me create more content. You can Buy Me a Coffee.
				</p>

				{/* Stripe Donate Button */}
				{/* <a
					href="https://buy.stripe.com/YOUR_STRIPE_PAYMENT_LINK" // 🔁 replace with your real Stripe Payment Link
					target="_blank"
					rel="noopener noreferrer"
					className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl mb-4 transition"
				>
					Donate via Stripe 💳
				</a> */}

				{/* Divider */}
				{/* <div className="my-4 text-gray-500">OR</div> */}

				{/* Buy Me a Coffee Button */}
				<a
					href="https://buymeacoffee.com/holdroot20w" // 🔁 replace with your Buy Me a Coffee username
					target="_blank"
					rel="noopener noreferrer"
                >
					<img
						src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
						alt="Buy Me a Coffee"
						width={220}
						height={60}
						className="rounded-md shadow-md hover:scale-105 transition-transform"
					/>
				</a>
			</div>
		</>
	);
}
