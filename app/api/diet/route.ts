import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

const openai = new OpenAI({
	baseURL: "https://api.groq.com/openai/v1",
	apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
	if (!process.env.OPENAI_API_KEY) {
		return NextResponse.json(
			{
				error: "OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.",
			},
			{ status: 500 }
		);
	}

	try {
		const body = await req.json();
		const {
			country,
			state,
			weight,
			height,
			age,
			gender,
			activityLevel,
			dietaryPreference,
			goal,
			allergies,
			medicalConditions,
			userPref,
		} = body;

		const prompt = `Create a detailed diet plan for someone with the following characteristics:
- Country: ${weight}kg
- State: ${height}cm
- Weight: ${weight}kg
- Height: ${height}cm
- Age: ${age}
- Gender: ${gender}
- Activity Level: ${activityLevel}
- Dietary Preference: ${dietaryPreference}
- Goal: ${goal}
${allergies ? `- Allergies: ${allergies}` : ""}
${medicalConditions ? `- Medical Conditions: ${medicalConditions}` : ""}
${userPref ? `- User Preferences: ${userPref}` : ""}

The response should be a valid JSON object with the following structure:
{
  "dailyCalories": 2000,
  "macronutrients": {
    "protein": 150,
    "carbs": 200,
    "fats": 70
  },
  "mealPlan": [
    {
      "name": "Breakfast",
      "time": "8:00 AM",
      "calories": 500,
      "items": [
        {
          "name": "Food Item",
          "portion": "100g",
          "calories": 200,
          "protein": 20,
          "carbs": 30,
          "fats": 10,
          "notes": "Optional preparation tips"
        }
      ],
      "notes": "Optional meal notes"
    }
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2"
  ],
  "supplements": [
    "Supplement 1 (if needed)",
    "Supplement 2 (if needed)"
  ],
  "restrictions": [
    "Food to avoid 1",
    "Food to avoid 2"
  ]
}`;

		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content:
						"You are a professional nutritionist creating personalized diet plans. Provide detailed, safe, and effective meal plans based on the individual's needs and restrictions. Always respond with valid JSON that matches the specified structure.",
				},
				{
					role: "user",
					content: prompt,
				},
			],
			model: "llama-3.3-70b-versatile",
			response_format: { type: "json_object" },
			temperature: 0.7,
			max_tokens: 32768,
		});

		const dietPlan = completion.choices[0]?.message?.content;

		if (!dietPlan) {
			return NextResponse.json(
				{ error: "No response from OpenAI" },
				{ status: 500 }
			);
		}

		try {
			const parsedPlan = JSON.parse(dietPlan);

			if (!parsedPlan.mealPlan || !Array.isArray(parsedPlan.mealPlan)) {
				return NextResponse.json(
					{ error: "Invalid diet plan structure" },
					{ status: 500 }
				);
			}

			return NextResponse.json(parsedPlan);
		} catch (parseError) {
			console.error("Error parsing diet plan:", parseError);
			return NextResponse.json(
				{ error: "Failed to parse diet plan response" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Error generating diet plan:", error);
		const errorMessage =
			error instanceof Error
				? error.message
				: "Failed to generate diet plan";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
