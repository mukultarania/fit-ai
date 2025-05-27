'use client';

export function About() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">About FitAI</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          FitAI is your personal AI-powered fitness companion, designed to create customized workout plans
          that adapt to your unique needs, goals, and schedule. Our advanced artificial intelligence
          technology analyzes your profile and preferences to generate optimal training routines that
          help you achieve your fitness objectives effectively and safely.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-muted-foreground mb-6">
          We believe that everyone deserves access to professional-quality fitness guidance. Our mission
          is to make personalized workout planning accessible to all, combining the latest in AI
          technology with established exercise science principles to help you reach your full potential.
        </p>
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Simply input your details, including your fitness level, goals, and schedule preferences, and
          our AI will generate a comprehensive workout plan tailored specifically to you. Each plan
          includes detailed exercise instructions, progressive overload recommendations, and adaptable
          schedules to fit your lifestyle.
        </p>
      </div>
    </div>
  );
}