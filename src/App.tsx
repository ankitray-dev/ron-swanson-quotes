import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the type for the fetched quote
type Quote = string;

const App: React.FC = () => {
  const [quote, setQuote] = useState<Quote>(''); // Type is a string
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]); // Array of strings

  // Function to fetch a random quote
  const fetchQuote = async () => {
    try {
      const response = await axios.get<Quote[]>('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      setQuote(response.data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  // Fetch a quote on component mount
  useEffect(() => {
    fetchQuote();
  }, []);

  // Save the current quote to the list
  const saveQuote = () => {
    if (quote && !savedQuotes.includes(quote)) {
      setSavedQuotes((prevQuotes) => [...prevQuotes, quote]);
    }
  };

  // Delete a saved quote from the list
  const deleteQuote = (index: number) => {
    setSavedQuotes((prevQuotes) => prevQuotes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 underline">Ron Swanson Quotes</h1>
      
      {/* Display the quote in a card */}
      <div className="bg-white shadow-md p-6 rounded-lg text-center max-w-md mb-4">
        <p className="text-lg font-semibold text-gray-700">{quote || 'Fetching quote...'}</p>
      </div>

      {/* Buttons for fetching new quote and saving */}
      <div className="flex gap-4 mb-8">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={fetchQuote}
        >
          New Quote
        </button>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={saveQuote}
          disabled={!quote}
        >
          Save to List
        </button>
      </div>

      {/* Display saved quotes */}
      <div className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Saved Quotes:</h2>
        {savedQuotes.length === 0 ? (
          <p className="text-gray-500">No saved quotes yet.</p>
        ) : (
          <ul className="space-y-2">
            {savedQuotes.map((savedQuote, index) => (
              <li key={index} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <span>{savedQuote}</span>
                <button 
                  className="text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteQuote(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
