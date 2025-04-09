import React from "react";
import { descriptions } from "../utils/descriptions";

const ResultCard = ({ result }) => {
  const { predicted_class, confidence } = result;
  const desc = descriptions[predicted_class] || {};

  return (
    <div className="mt-6 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
      {/* Diagnosis Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {predicted_class}
            </h2>
            <p className="text-blue-100 mt-1 text-sm">AI-Powered Diagnosis</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              {(confidence * 100).toFixed(1)}%
            </div>
            <div className="text-blue-200 text-sm mt-1">Confidence Level</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-1000 ease-out"
              style={{ width: `${confidence * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-6 space-y-6">
        {/* Condition Overview */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">
              Condition Overview
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">{desc.about}</p>
        </div>

        {/* Clinical Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                Clinical Indicators
              </h3>
            </div>
            <ul className="space-y-2">
              {desc.signs?.split(". ").map(
                (item, index) =>
                  item && (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-sm text-gray-600"
                    >
                      <span className="text-blue-500">•</span>
                      <span>{item}</span>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* Visual Patterns */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                Visual Patterns
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {desc.visualPatterns?.split(", ").map(
                (item, index) =>
                  item && (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-800 text-sm rounded-full border border-blue-100"
                    >
                      {item.trim()}
                    </span>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Deep Learning Insights */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM15 9l-3 3m0 0l-3 3m3-3V5"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">
              Model Interpretation
            </h3>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-gray-600 text-sm leading-relaxed">
              {desc.deepLearningInsights}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
