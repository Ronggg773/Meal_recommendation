import React from 'react';
import { Restaurant } from '../types';
import { MapPin, Star, DollarSign, ExternalLink } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { name, type, address, distance, recommendation, rating, priceLevel, imageUrl } = restaurant;

  // Generate Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name} ${address}`
  )}`;

  // Helper to render price level
  const renderPriceLevel = (level: number) => {
    return Array(level)
      .fill(0)
      .map((_, index) => (
        <DollarSign key={index} size={16} className="text-gray-600 inline-block" />
      ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <span className="flex items-center text-sm font-medium text-amber-500">
            <Star size={16} className="fill-amber-500 text-amber-500 mr-1" />
            {rating}
          </span>
        </div>
        
        <div className="flex items-center mb-3">
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
            {type}
          </span>
          <span className="text-gray-500 text-sm flex items-center">
            {renderPriceLevel(priceLevel)}
          </span>
        </div>
        
        <div className="flex items-start text-gray-600 mb-3">
          <MapPin size={18} className="mr-1 mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            {address}
            {distance && <span className="ml-1 text-green-600">({distance})</span>}
          </p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">推薦理由：</h4>
          <p className="text-gray-600 text-sm">{recommendation}</p>
        </div>
        
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center transition duration-150"
        >
          在 Google Maps 中查看
          <ExternalLink size={14} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default RestaurantCard;