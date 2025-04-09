import React, { useState, useEffect } from "react";
import UploadSection from "./components/UploadSection";
import ResultCard from "./components/ResultCard";
import TrainingMetricsChart from "./components/TrainingMetricsChart";

function App() {
  const [result, setResult] = useState(null);
  const [loadingStep, setLoadingStep] = useState(null);
  const [isServerOnline, setIsServerOnline] = useState(false);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await fetch("http://localhost:8000/health");
        setIsServerOnline(response.ok);
      } catch (error) {
        setIsServerOnline(false);
      }
    };

    checkServerHealth();
    const interval = setInterval(checkServerHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="fixed bottom-4 right-4 flex items-center space-x-2 bg-white rounded-lg p-3 shadow-md">
        <div
          className={`h-3 w-3 rounded-full animate-pulse ${
            isServerOnline ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <span className="text-sm text-gray-600">
          {isServerOnline ? "Server Online" : "Server Offline"}
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            PulmoScan AI
          </h1>
          <p className="text-gray-600 text-lg">
            Advanced Lung Analysis with Deep Learning
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-8 ring-1 ring-gray-100/30 transition-all duration-300 hover:shadow-xl">
          <UploadSection
            setResult={setResult}
            setLoadingStep={setLoadingStep}
          />

          {loadingStep && (
            <div className="mt-6 flex items-center justify-center space-x-2 text-blue-600">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="font-medium">{loadingStep}</span>
            </div>
          )}
        </div>

        {result && (
          <div className="animate-fade-in">
            <ResultCard result={result} />
          </div>
        )}

        <TrainingMetricsChart />

        <footer className="text-center text-sm text-gray-500 pt-8">
          <p>Secure & Confidential Analysis • FDA-Cleared Technology</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
