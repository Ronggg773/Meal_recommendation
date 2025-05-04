import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-8 border-t border-gray-200">
      <div className="container mx-auto text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} 三餐選擇器 | MVP Version</p>
      </div>
    </footer>
  );
};

export default Footer;