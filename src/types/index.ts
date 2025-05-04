export type MealPeriod = 'breakfast' | 'lunch' | 'dinner' | 'late-night';
export type OrderMethod = 'cook' | 'nearby' | 'delivery';

export interface Location {
  lat: number;
  lng: number;
}

export interface UserPreference {
  mealPeriod: MealPeriod;
  foodType: string;
  orderMethod: OrderMethod;
  address: string;
  location: Location | null;
}

export interface Restaurant {
  id: string;
  name: string;
  type: string;
  address: string;
  distance?: string;
  recommendation: string;
  rating: number;
  priceLevel: 1 | 2 | 3;
  imageUrl: string;
}