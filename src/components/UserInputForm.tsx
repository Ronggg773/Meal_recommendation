import React, { useState, useEffect } from 'react';
import { UserPreference, MealPeriod, OrderMethod } from '../types';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

interface UserInputFormProps {
  onSubmit: (preferences: UserPreference) => void;
  isLoading: boolean;
}

const libraries: ("places")[] = ["places"];

const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit, isLoading }) => {
  const [preferences, setPreferences] = useState<UserPreference>({
    mealPeriod: 'lunch',
    foodType: '',
    orderMethod: 'nearby',
    address: '',
    location: null
  });
  
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.formatted_address && place.geometry?.location) {
        setPreferences(prev => ({
          ...prev,
          address: place.formatted_address,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">找不到吃什麼？讓我們幫你！</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="mealPeriod" className="block text-sm font-medium text-gray-700 mb-1">
            餐期
          </label>
          <select
            id="mealPeriod"
            name="mealPeriod"
            value={preferences.mealPeriod}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            required
          >
            <option value="breakfast">早餐</option>
            <option value="lunch">午餐</option>
            <option value="dinner">晚餐</option>
            <option value="late-night">宵夜</option>
          </select>
        </div>

        <div>
          <label htmlFor="foodType" className="block text-sm font-medium text-gray-700 mb-1">
            食物類型（選填）
          </label>
          <input
            type="text"
            id="foodType"
            name="foodType"
            value={preferences.foodType}
            onChange={handleChange}
            placeholder="例如：日式、炸物、甜點..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="orderMethod" className="block text-sm font-medium text-gray-700 mb-1">
            點餐方式
          </label>
          <select
            id="orderMethod"
            name="orderMethod"
            value={preferences.orderMethod}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            required
          >
            <option value="cook">自己煮</option>
            <option value="nearby">附近買</option>
            <option value="delivery">外送</option>
          </select>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            地址
          </label>
          {isLoaded ? (
            <Autocomplete
              onLoad={setAutocomplete}
              onPlaceChanged={handlePlaceSelect}
              restrictions={{ country: "tw" }}
            >
              <input
                type="text"
                id="address"
                name="address"
                value={preferences.address}
                onChange={handleChange}
                placeholder="請輸入您的地址或位置"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </Autocomplete>
          ) : (
            <input
              type="text"
              id="address"
              name="address"
              value={preferences.address}
              onChange={handleChange}
              placeholder="載入中..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              disabled
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? '尋找中...' : '幫我找餐廳'}
        </button>
      </form>
    </div>
  );
};

export default UserInputForm;