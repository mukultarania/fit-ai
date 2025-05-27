'use client';

import { Card } from '@/components/ui/card';
import { Dumbbell, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface WorkoutSplitProps {
  setCurrentPage: (page: 'home' | 'create-plan' | 'about' | 'research' | 'splits') => void;
}

const workoutSplits = [
  {
    title: 'Bro Split',
    subtitle: '1 Muscle Per Day',
    description: 'A training split that dedicates an entire workout to a single muscle group. This allows for high volume and intensity for each muscle group with maximum recovery time between sessions.',
    benefits: [
      'Maximum recovery time for each muscle group',
      'High volume training for each body part',
      'Flexible scheduling',
      'Good for intermediate to advanced lifters'
    ],
    example: 'Monday: Chest, Tuesday: Back, Wednesday: Legs, Thursday: Shoulders, Friday: Arms'
  },
  {
    title: 'Push / Pull / Legs (PPL)',
    subtitle: 'Classic 3-day split',
    description: 'Organizes workouts based on movement patterns. Push days focus on chest, shoulders, and triceps. Pull days target back and biceps. Leg days cover all lower body exercises.',
    benefits: [
      'Balanced muscle development',
      'Efficient workout grouping',
      'Can be run 3 or 6 days per week',
      'Good for all experience levels'
    ],
    example: 'Day 1: Push (Chest/Shoulders/Triceps), Day 2: Pull (Back/Biceps), Day 3: Legs'
  },
  {
    title: 'Upper / Lower Split',
    subtitle: 'Alternating upper and lower body workouts',
    description: 'Divides training into upper body and lower body days. This allows for training muscle groups twice per week with adequate recovery time.',
    benefits: [
      'Optimal training frequency',
      'Good balance of volume and recovery',
      'Flexible 2-4 day schedule',
      'Suitable for all fitness levels'
    ],
    example: 'Monday/Thursday: Upper Body, Tuesday/Friday: Lower Body'
  },
  {
    title: 'Full Body Workout',
    subtitle: 'Complete body workout in each session',
    description: 'Trains all major muscle groups in a single session. Ideal for beginners or those with limited time to train.',
    benefits: [
      'Time efficient',
      'High training frequency',
      'Great for beginners',
      'Flexible scheduling'
    ],
    example: '3-4 exercises for each major muscle group per session, 2-3 times per week'
  },
  {
    title: 'Chest + Triceps / Back + Biceps / Legs + Shoulders',
    subtitle: 'Traditional bodybuilding split',
    description: 'Pairs complementary muscle groups together for maximum pump and muscle growth.',
    benefits: [
      'Focused muscle group training',
      'Great for muscle growth',
      'Good mind-muscle connection',
      'Optimal pump and metabolic stress'
    ],
    example: 'Day 1: Chest/Triceps, Day 2: Back/Biceps, Day 3: Legs/Shoulders'
  },
  {
    title: 'Push / Pull / Legs / Upper / Lower Hybrid',
    subtitle: 'Advanced 5-day split',
    description: 'Combines PPL and upper/lower training for advanced lifters who can handle high training volume.',
    benefits: [
      'High training frequency',
      'Maximum muscle growth stimulus',
      'Good for advanced lifters',
      'Balanced approach to strength and size'
    ],
    example: 'Monday: Push, Tuesday: Pull, Wednesday: Legs, Thursday: Upper, Friday: Lower'
  },
  {
    title: 'Powerlifting Split',
    subtitle: 'Squat / Bench / Deadlift Focused',
    description: 'Focuses on the three main powerlifting movements with accessory work to support strength gains.',
    benefits: [
      'Maximum strength development',
      'Sport-specific training',
      'Clear performance metrics',
      'Competition preparation'
    ],
    example: 'Day 1: Squat focus, Day 2: Bench focus, Day 3: Deadlift focus'
  },
  {
    title: 'Bodybuilding Split',
    subtitle: 'High Volume, Isolation Focus',
    description: 'Emphasizes muscle isolation and high volume training for maximum muscle growth.',
    benefits: [
      'Maximum muscle hypertrophy',
      'Detailed muscle sculpting',
      'Great mind-muscle connection',
      'Aesthetic focus'
    ],
    example: '5-6 day split with high volume and isolation exercises'
  },
  {
    title: 'Powerbuilding',
    subtitle: 'Strength + Hypertrophy Combo',
    description: 'Combines powerlifting and bodybuilding principles for both strength and size gains.',
    benefits: [
      'Balanced strength and size gains',
      'Varied training stimulus',
      'Best of both worlds approach',
      'Good for intermediate lifters'
    ],
    example: 'Heavy compound lifts followed by bodybuilding accessories'
  },
  {
    title: 'CrossFit / Functional Training',
    subtitle: 'High-intensity functional movements',
    description: 'Combines strength training, cardio, and functional movements for overall fitness.',
    benefits: [
      'Improved overall fitness',
      'Varied workouts',
      'Community aspect',
      'Athletic performance focus'
    ],
    example: 'Daily WODs combining strength, cardio, and skill work'
  },
  {
    title: 'Circuit Training Split',
    subtitle: 'High Intensity, Multiple Muscle Groups',
    description: 'Moves quickly between exercises with minimal rest for cardiovascular and muscular endurance.',
    benefits: [
      'Time efficient',
      'Fat loss promotion',
      'Improved conditioning',
      'Full body workout'
    ],
    example: '3-4 circuits of 6-8 exercises with minimal rest'
  },
  {
    title: 'Calisthenics Split',
    subtitle: 'Skill + Strength Focused',
    description: 'Uses bodyweight exercises and progressive overload for strength and skill development.',
    benefits: [
      'No equipment needed',
      'Builds functional strength',
      'Improves body control',
      'Progressive skill development'
    ],
    example: 'Push/Pull/Legs format with bodyweight progressions'
  },
  {
    title: 'Athlete/Performance Split',
    subtitle: 'Speed, Agility, Strength',
    description: 'Focuses on athletic performance with a mix of strength, power, and conditioning work.',
    benefits: [
      'Sport-specific training',
      'Improved athleticism',
      'Balanced development',
      'Performance focused'
    ],
    example: 'Strength training + power development + sport-specific work'
  },
  {
    title: '5x5 Training',
    subtitle: 'Full Body, Strength Focused',
    description: 'Simple but effective program focusing on compound movements for strength gains.',
    benefits: [
      'Rapid strength gains',
      'Simple to follow',
      'Good for beginners',
      'Focus on fundamentals'
    ],
    example: '3 workouts per week, 5 sets of 5 reps on main lifts'
  },
  {
    title: 'German Volume Training',
    subtitle: '10x10 for Major Lifts',
    description: 'High volume training method using 10 sets of 10 reps for massive muscle growth.',
    benefits: [
      'Rapid muscle growth',
      'Mental toughness',
      'Improved work capacity',
      'Advanced training method'
    ],
    example: '10 sets of 10 reps on 1-2 exercises per body part'
  }
];

export function WorkoutSplits({ setCurrentPage }: WorkoutSplitProps) {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Training Split Guide</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Choose the perfect workout split for your goals, schedule, and experience level
        </p>
        <Button onClick={() => setCurrentPage('create-plan')} className="bg-primary">
          Create Your Workout Plan <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-8">
        {workoutSplits.map((split, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{split.title}</h2>
                <p className="text-muted-foreground mb-4">{split.subtitle}</p>
                <p className="mb-6">{split.description}</p>
                
                <h3 className="font-semibold mb-2">Key Benefits:</h3>
                <ul className="list-disc list-inside mb-6 text-muted-foreground">
                  {split.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Example Split:</h3>
                  <p className="text-muted-foreground">{split.example}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}