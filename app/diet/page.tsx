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
import { useToast } from '@/hooks/use-toast';
import { DietPlan } from '@/lib/types';
import { DownloadDietPDFButton } from '@/components/diet-pdf';

const dietaryPreferences = [
  { value: 'no_restrictions', label: 'No Restrictions' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'keto', label: 'Ketogenic' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'low_carb', label: 'Low Carb' },
  { value: 'low_fat', label: 'Low Fat' },
  { value: 'gluten_free', label: 'Gluten Free' }
];

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Lightly active (light exercise 1-3 days/week)' },
  { value: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)' },
  { value: 'very', label: 'Very active (hard exercise 6-7 days/week)' },
  { value: 'extra', label: 'Extra active (very hard exercise & physical job)' }
];

const goals = [
  { value: 'lose_weight', label: 'Lose Weight' },
  { value: 'maintain', label: 'Maintain Weight' },
  { value: 'gain_weight', label: 'Gain Weight' },
  { value: 'build_muscle', label: 'Build Muscle' },
  { value: 'improve_health', label: 'Improve Overall Health' }
];

const formSchema = z.object({
  weight: z.number().min(20).max(500),
  height: z.number().min(100).max(300),
  age: z.number().min(13).max(100),
  gender: z.enum(['male', 'female', 'other']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'very', 'extra']),
  dietaryPreference: z.enum([
    'no_restrictions',
    'vegetarian',
    'vegan',
    'pescatarian',
    'keto',
    'paleo',
    'mediterranean',
    'low_carb',
    'low_fat',
    'gluten_free'
  ]),
  goal: z.enum(['lose_weight', 'maintain', 'gain_weight', 'build_muscle', 'improve_health']),
  allergies: z.string().optional(),
  medicalConditions: z.string().optional()
});

export default function DietPlan() {
  const [isLoading, setIsLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 70,
      height: 170,
      age: 30,
      gender: 'male',
      activityLevel: 'moderate',
      dietaryPreference: 'no_restrictions',
      goal: 'maintain',
      allergies: '',
      medicalConditions: ''
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to generate diet plan');
      }

      const data = await response.json();
      setDietPlan(data);
      
      toast({
        title: 'Success!',
        description: 'Your personalized diet plan has been generated.',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate diet plan';
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
          <h1 className="text-3xl font-bold mb-6">Create Your Diet Plan</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {activityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietaryPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your dietary preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dietaryPreferences.map((diet) => (
                          <SelectItem key={diet.value} value={diet.value}>
                            {diet.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {goals.map((goal) => (
                          <SelectItem key={goal.value} value={goal.value}>
                            {goal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Allergies</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="List any food allergies (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medicalConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Conditions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="List any relevant medical conditions (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating your plan...' : 'Create Diet Plan'}
              </Button>
            </form>
          </Form>
        </Card>

        {/* Diet Plan Preview Section */}
        <Card className="p-6">
          <h2 className="text-3xl font-bold mb-6">
            {dietPlan ? 'Diet Overview' : 'Diet Preview'}
          </h2>
          {!dietPlan ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Fill out the form to generate your personalized diet plan
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-secondary p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Daily Targets</h3>
                <p className="text-muted-foreground">Calories: {dietPlan.dailyCalories} kcal</p>
                <p className="text-muted-foreground">Protein: {dietPlan.macronutrients.protein}g</p>
                <p className="text-muted-foreground">Carbs: {dietPlan.macronutrients.carbs}g</p>
                <p className="text-muted-foreground">Fats: {dietPlan.macronutrients.fats}g</p>
              </div>

              <div className="bg-secondary p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Sample Meals</h3>
                <ul className="space-y-2">
                  {dietPlan.mealPlan.map((meal, index) => (
                    <li key={index} className="text-muted-foreground">
                      {meal.name} ({meal.time}) - {meal.calories} kcal
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-muted-foreground">
                  Download the PDF for your complete diet plan including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Detailed meal plans</li>
                  <li>Portion sizes and macronutrients</li>
                  <li>Preparation tips</li>
                  <li>Nutritional recommendations</li>
                </ul>
                <DownloadDietPDFButton dietPlan={dietPlan} />
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}