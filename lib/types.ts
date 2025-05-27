export interface UserProfile {
  weight: number;
  height: number;
  age: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferredWorkoutDays: number;
  workoutDuration: number;
  equipment: string[];
  userConcerns?: string;
  workoutSplit?: WorkoutSplitType;
}

export type WorkoutSplitType = 
  | 'bro_split'
  | 'ppl'
  | 'upper_lower'
  | 'full_body'
  | 'chest_back'
  | 'ppl_upper_lower'
  | 'powerlifting'
  | 'bodybuilding'
  | 'powerbuilding'
  | 'crossfit'
  | 'circuit'
  | 'calisthenics'
  | 'athlete'
  | 'five_by_five'
  | 'german_volume';

export interface WorkoutPlan {
  routines: WorkoutRoutine[];
  recommendations: string[];
  weeklySchedule: string[];
}

export interface WorkoutRoutine {
  day: string;
  exercises: Exercise[];
  duration: number;
  intensity: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restTime: number;
  notes?: string;
}

export interface DietPlan {
  dailyCalories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fats: number;
  };
  mealPlan: MealPlan[];
  recommendations: string[];
  supplements?: string[];
  restrictions?: string[];
}

export interface MealPlan {
  name: string;
  time: string;
  calories: number;
  items: MealItem[];
  notes?: string;
}

export interface MealItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  notes?: string;
}