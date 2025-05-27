'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { WorkoutPlan, WorkoutSplitType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { DownloadPDFButton } from './workout-pdf';

const workoutSplits: { value: WorkoutSplitType; label: string; description: string }[] = [
  {
    value: 'bro_split',
    label: 'Bro Split',
    description: '1 Muscle Per Day'
  },
  {
    value: 'ppl',
    label: 'Push / Pull / Legs (PPL)',
    description: 'Classic 3-day split focusing on pushing, pulling, and leg movements'
  },
  {
    value: 'upper_lower',
    label: 'Upper / Lower Split',
    description: 'Alternating between upper and lower body workouts'
  },
  {
    value: 'full_body',
    label: 'Full Body Workout',
    description: 'Complete body workout in each session'
  },
  {
    value: 'chest_back',
    label: 'Chest + Triceps / Back + Biceps / Legs + Shoulders',
    description: 'Traditional bodybuilding split'
  },
  {
    value: 'ppl_upper_lower',
    label: 'Push / Pull / Legs / Upper / Lower Hybrid',
    description: 'Advanced 5-day split combining PPL and upper/lower'
  },
  {
    value: 'powerlifting',
    label: 'Powerlifting Split',
    description: 'Squat / Bench / Deadlift Focused'
  },
  {
    value: 'bodybuilding',
    label: 'Bodybuilding Split',
    description: 'High Volume, Isolation Focus'
  },
  {
    value: 'powerbuilding',
    label: 'Powerbuilding',
    description: 'Strength + Hypertrophy Combo'
  },
  {
    value: 'crossfit',
    label: 'CrossFit / Functional Training',
    description: 'High-intensity functional movements'
  },
  {
    value: 'circuit',
    label: 'Circuit Training Split',
    description: 'High Intensity, Multiple Muscle Groups'
  },
  {
    value: 'calisthenics',
    label: 'Calisthenics Split',
    description: 'Skill + Strength Focused'
  },
  {
    value: 'athlete',
    label: 'Athlete/Performance Split',
    description: 'Speed, Agility, Strength'
  },
  {
    value: 'five_by_five',
    label: '5x5 Training',
    description: 'Full Body, Strength Focused'
  },
  {
    value: 'german_volume',
    label: 'German Volume Training',
    description: '10x10 for Major Lifts'
  }
];

const formSchema = z.object({
  weight: z.number().min(20).max(500),
  height: z.number().min(100).max(300),
  age: z.number().min(13).max(100),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  preferredWorkoutDays: z.number().min(1).max(7),
  workoutDuration: z.number().min(15).max(180),
  userConcerns: z.string().optional(),
  workoutSplit: z.enum([
    'bro_split',
    'ppl',
    'upper_lower',
    'full_body',
    'chest_back',
    'ppl_upper_lower',
    'powerlifting',
    'bodybuilding',
    'powerbuilding',
    'crossfit',
    'circuit',
    'calisthenics',
    'athlete',
    'five_by_five',
    'german_volume'
  ] as const)
});

export function CreatePlan() {
  const [isLoading, setIsLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 70,
      height: 170,
      age: 30,
      fitnessLevel: 'beginner',
      preferredWorkoutDays: 3,
      workoutDuration: 60,
      userConcerns: '',
      workoutSplit: 'full_body'
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned an invalid response format');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate workout plan');
      }

      setWorkoutPlan(data);
      toast({
        title: 'Success!',
        description: 'Your personalized workout plan has been generated.',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate workout plan';
      console.error(error);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-6">Create Your Workout Plan</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="workoutSplit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Split</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred workout split" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {workoutSplits.map((split) => (
                          <SelectItem key={split.value} value={split.value}>
                            <div>
                              <div className="font-medium">{split.label}</div>
                              <div className="text-sm text-muted-foreground">{split.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a workout split that matches your goals and schedule
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Your current weight in kilograms</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Your height in centimeters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fitnessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your fitness level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredWorkoutDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Workout Days per Week</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="7"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workoutDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Workout Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="15"
                        max="180"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      How long would you like each workout session to be?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userConcerns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Considerations</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any injuries, goals, or specific concerns (e.g., bad knees, want to focus on upper body, etc.)"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Let us know about any specific needs or goals you have
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating your plan...' : 'Create Workout Plan'}
              </Button>
            </form>
          </Form>
        </Card>

        {/* Workout Preview Section */}
        <Card className="p-6">
          <h2 className="text-3xl font-bold mb-6">
            {workoutPlan ? 'Workout Overview' : 'Workout Preview'}
          </h2>
          {!workoutPlan ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Fill out the form to generate your personalized workout plan
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-secondary p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Weekly Schedule Overview</h3>
                <ul className="list-disc list-inside space-y-2">
                  {workoutPlan.weeklySchedule.map((day, index) => (
                    <li key={index} className="text-muted-foreground">{day}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-secondary p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Key Exercises</h3>
                <ul className="list-disc list-inside space-y-2">
                  {workoutPlan.routines.map((routine) => (
                    <li key={routine.day} className="text-muted-foreground">
                      {routine.day}: {routine.exercises[0].name}
                      {routine.exercises.length > 1 ? ' + more' : ''}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-muted-foreground">
                  Download the PDF for your complete workout plan including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Detailed exercise instructions</li>
                  <li>Sets, reps, and rest periods</li>
                  <li>Form tips and notes</li>
                  <li>Comprehensive recommendations</li>
                </ul>
                <DownloadPDFButton workoutPlan={workoutPlan} />
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}