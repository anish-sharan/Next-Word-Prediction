import { useState, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [predictions, setPredictions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!text.trim()) {
        setPredictions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('/predict-next-word', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });

        console.log(response)

        if (response.ok) {
          const data = await response.json();
          setPredictions(data.next_word ? [data.next_word] : []);

        }
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(debounceTimer);
  }, [text]);

  const handlePredictionClick = (word: string) => {
    setText(prev => prev + ' ' + word);
  };

  const handleClear = () => {
    setText('');
    setPredictions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-blue-600" />
            <h1 className="text-5xl font-bold text-slate-900">Word Predictor</h1>
          </div>
          <p className="text-lg text-slate-600">
            Start typing and watch AI predict your next word
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            <label htmlFor="text-input" className="block text-sm font-semibold text-slate-700 mb-3">
              Your Text
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something here..."
              className="w-full h-48 px-4 py-3 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
            />

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-slate-500">
                {text.split(/\s+/).filter(w => w).length} words
              </div>
              {text && (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-8 py-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                Predicted Next Words
              </h2>
              {isLoading && (
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              )}
            </div>

            {predictions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {predictions.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handlePredictionClick(word)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 active:scale-95"
                  >
                    {word}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400">
                  {text.trim() ? 'No predictions available' : 'Start typing to see predictions'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Click on any predicted word to add it to your text
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
