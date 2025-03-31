import React, { useState } from 'react';
import MaterialsSection from './components/Sections/MaterialsSection';
import MonstersSection from './components/Sections/MonstersSection';

function App() {
  const [activeSection, setActiveSection] = useState('materials');
  const [showForm, setShowForm] = useState(true);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-indigo-900 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-8 text-white tracking-wider">
            Enciclopedia de Zelda
          </h1>
          <div className="flex justify-center space-x-4">
            <button 
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-300 transform hover:scale-105
                ${activeSection === 'materials' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveSection('materials')}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Materiales
              </span>
            </button>
            <button 
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-300 transform hover:scale-105
                ${activeSection === 'monsters' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveSection('monsters')}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Monstruos
              </span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleForm}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center shadow-lg hover:shadow-xl
              ${showForm 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {showForm ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Ocultar Formulario
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Mostrar Formulario
              </>
            )}
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {activeSection === 'materials' ? (
            <MaterialsSection showForm={showForm} />
          ) : (
            <MonstersSection showForm={showForm} />
          )}
        </div>
      </main>
      
      <footer className="bg-indigo-900 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Alejandro Cabrera Carrasco - Desarrollado con React y Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
