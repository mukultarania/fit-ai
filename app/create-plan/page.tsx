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
import { WorkoutPlan } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  weight: z.number().min(20).max(500),
  height: z.number().min(100).max(300),
  age: z.number().min(13).max(100),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  preferredWorkoutDays: z.number().min(1).max(7),
  workoutDuration: z.number().min(15).max(180),
});

export default function CreatePlan() {
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
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create Your Workout Plan</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating your plan...' : 'Create Workout Plan'}
            </Button>
          </form>
        </Form>

        {workoutPlan && (
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Your Personalized Workout Plan</h2>
            {workoutPlan.routines.map((routine, index) => (
              <div key={index} className="bg-secondary p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">{routine.day}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Duration: {routine.duration} minutes | Intensity: {routine.intensity}
                </p>
                <ul className="space-y-2">
                  {routine.exercises.map((exercise, exerciseIndex) => (
                    <li key={exerciseIndex} className="bg-background p-3 rounded">
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {exercise.sets} sets × {exercise.reps} | Rest: {exercise.restTime}s
                      </p>
                      {exercise.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{exercise.notes}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Recommendations</h3>
              <ul className="list-disc list-inside space-y-2">
                {workoutPlan.recommendations.map((rec, index) => (
                  <li key={index} className="text-muted-foreground">{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}