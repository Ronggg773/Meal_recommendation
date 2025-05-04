import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-400 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center">
        <UtensilsCrossed className="text-white mr-2" size={28} />
        <h1 className="text-2xl font-bold text-white">三餐選擇器</h1>
      </div>
    </header>
  );
};

export default Header;