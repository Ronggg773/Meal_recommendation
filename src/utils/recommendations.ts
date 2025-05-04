import { Restaurant, UserPreference, MealPeriod, OrderMethod } from '../types';
import { mockRestaurants } from '../data/mockRestaurants';

// Function to filter restaurants based on meal period
const filterByMealPeriod = (restaurants: Restaurant[], mealPeriod: MealPeriod): Restaurant[] => {
  // This is a simplified filter for the MVP
  // In a real app, we would have meal period data for each restaurant
  switch (mealPeriod) {
    case 'breakfast':
      return restaurants.filter(r => 
        r.type.toLowerCase().includes('breakfast') || 
        r.type.toLowerCase().includes('café') ||
        r.type.toLowerCase().includes('bakery')
      );
    case 'lunch':
      return restaurants.filter(r => 
        !r.type.toLowerCase().includes('breakfast') && 
        !r.type.toLowerCase().includes('late night')
      );
    case 'dinner':
      return restaurants.filter(r => 
        !r.type.toLowerCase().includes('breakfast') && 
        !r.type.toLowerCase().includes('bakery')
      );
    case 'late-night':
      return restaurants.filter(r => 
        r.type.toLowerCase().includes('late night') || 
        r.name.toLowerCase().includes('midnight')
      );
    default:
      return restaurants;
  }
};

// Function to filter restaurants based on food type
const filterByFoodType = (restaurants: Restaurant[], foodType: string): Restaurant[] => {
  if (!foodType) return restaurants;
  
  return restaurants.filter(restaurant => 
    restaurant.type.toLowerCase().includes(foodType.toLowerCase()) || 
    restaurant.name.toLowerCase().includes(foodType.toLowerCase())
  );
};

// Function to filter restaurants based on order method
const filterByOrderMethod = (restaurants: Restaurant[], orderMethod: OrderMethod): Restaurant[] => {
  // This is a simplified filter for the MVP
  // In a real app, we would have order method data for each restaurant
  switch (orderMethod) {
    case 'cook':
      // For 'cook', we would ideally recommend recipes instead of restaurants
      // For this MVP, we'll just return a smaller subset
      return restaurants.slice(0, Math.max(3, restaurants.length / 3));
    case 'nearby':
      // For 'nearby', prioritize restaurants with shorter distances
      return [...restaurants].sort((a, b) => {
        const distA = parseFloat((a.distance || '10 km').split(' ')[0]);
        const distB = parseFloat((b.distance || '10 km').split(' ')[0]);
        return distA - distB;
      });
    case 'delivery':
      // For 'delivery', we'd filter for restaurants that offer delivery
      // For this MVP, we'll just return all restaurants
      return restaurants;
    default:
      return restaurants;
  }
};

// Main function to get restaurant recommendations based on user preferences
export const getRecommendations = (preferences: UserPreference): Restaurant[] => {
  let filtered = [...mockRestaurants];
  
  // Apply filters based on user preferences
  filtered = filterByMealPeriod(filtered, preferences.mealPeriod);
  filtered = filterByFoodType(filtered, preferences.foodType);
  filtered = filterByOrderMethod(filtered, preferences.orderMethod);
  
  // Randomize the order for variety in recommendations
  filtered = shuffleArray(filtered);
  
  // Return top 3 recommendations, or fewer if not enough matches
  return filtered.slice(0, 3);
};

// Helper function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};