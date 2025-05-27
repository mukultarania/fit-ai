import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { weight, height, age, fitnessLevel, preferredWorkoutDays, workoutDuration, userConcerns, workoutSplit } = body;

    const prompt = `Create a detailed ${fitnessLevel} level workout plan using the ${workoutSplit || 'full body'} training style for someone with the following characteristics:
- Weight: ${weight}kg
- Height: ${height}cm
- Age: ${age}
- Preferred workout days per week: ${preferredWorkoutDays}
- Workout duration: ${workoutDuration} minutes
${userConcerns ? `- Special considerations: ${userConcerns}` : ''}

The response should be a valid JSON object with the following structure:
{
  "routines": [
    {
      "day": "Day 1",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 3,
          "reps": "12",
          "restTime": 60,
          "notes": "Optional form tips"
        }
      ],
      "duration": 60,
      "intensity": "Medium"
    }
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2"
  ],
  "weeklySchedule": [
    "Monday: Workout A",
    "Wednesday: Workout B"
  ]
}`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional fitness trainer creating personalized workout plans. Provide detailed, safe, and effective workout routines based on the specified training split and be careful with user age and user concerns. Always respond with valid JSON that matches the specified structure."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000,
    });

    const workoutPlan = completion.choices[0]?.message?.content;
    
    if (!workoutPlan) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      );
    }

    try {
      const parsedPlan = JSON.parse(workoutPlan);
      
      if (!parsedPlan.routines || !Array.isArray(parsedPlan.routines)) {
        return NextResponse.json(
          { error: 'Invalid workout plan structure' },
          { status: 500 }
        );
      }

      return NextResponse.json(parsedPlan);
      
    } catch (parseError) {
      console.error('Error parsing workout plan:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse workout plan response' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating workout plan:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate workout plan';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}