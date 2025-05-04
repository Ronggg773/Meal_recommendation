import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UserInputForm from './components/UserInputForm';
import RestaurantList from './components/RestaurantList';
import { UserPreference, Restaurant } from './types';
import { getRecommendations } from './utils/recommendations';

function App() {
  const [preferences, setPreferences] = useState<UserPreference | null>(null);
  const [recommendations, setRecommendations] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Function to handle form submission
  const handleSubmit = (userPreferences: UserPreference) => {
    setPreferences(userPreferences);
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = getRecommendations(userPreferences);
      setRecommendations(results);
      setLoading(false);
      setShowResults(true);
      
      // Scroll to results
      if (results.length > 0) {
        window.scrollTo({
          top: document.getElementById('results-section')?.offsetTop || 0,
          behavior: 'smooth'
        });
      }
    }, 1500);
  };

  // Function to refresh recommendations
  const handleRefresh = () => {
    if (preferences) {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const results = getRecommendations(preferences);
        setRecommendations(results);
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <section className="mb-10">
            <UserInputForm onSubmit={handleSubmit} isLoading={loading} />
          </section>
          
          <section id="results-section" className={`transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <RestaurantList 
              restaurants={recommendations} 
              onRefresh={handleRefresh} 
              loading={loading} 
            />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;