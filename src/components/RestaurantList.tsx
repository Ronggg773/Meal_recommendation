import React from 'react';
import { Restaurant } from '../types';
import RestaurantCard from './RestaurantCard';
import { RotateCw } from 'lucide-react';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRefresh: () => void;
  loading: boolean;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRefresh, loading }) => {
  if (restaurants.length === 0 && !loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 mb-4">沒有找到符合條件的餐廳。請嘗試調整您的偏好。</p>
        <button
          onClick={onRefresh}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150"
        >
          重新推薦
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">為您推薦的餐廳</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className={`flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <RotateCw size={16} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
          重新推薦
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;