'use client';

import { Search, Lock, Crown } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '@clerk/nextjs';
import {
  VideoThumbnail,
  SearchStep,
  SearchHero,
  ProgressSteps,
  SearchResults,
  LoadingSpinner,
  AISuggestions,
  HowItWorks,
  PopularSearches
} from './_components';

export default function ThumbnailSearchPage() {
  const { has } = useAuth();
  
  // All hooks must be called before any conditional logic
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VideoThumbnail[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState<VideoThumbnail | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<VideoThumbnail[]>([]);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [generatingThumbnailId, setGeneratingThumbnailId] = useState<string | null>(null);
  const [searchStep, setSearchStep] = useState<SearchStep>('search');
  
  // Check user's plan
  const hasFreePlan = !has || (!has({ plan: 'pro_plan' }) && !has({ plan: 'business_plan' }));
  const hasProPlan = has && has({ plan: 'pro_plan' });
  const hasBusinessPlan = has && has({ plan: 'business_plan' });

  // Thumbnail Search is available for Pro and Business plans only
  if (hasFreePlan) {
    return (
      <div className="flex h-full flex-col">
        <div className="border-b">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold">Thumbnail Search</h1>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 max-w-md"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-10 h-10 text-white" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pro Plan Required
              </h2>
              <p className="text-lg text-muted-foreground">
                Thumbnail Search is available for Pro and Business plan subscribers.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Available Features:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-600 dark:text-gray-400">Free Plan: Outlier Generator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    <span className="text-gray-600 dark:text-gray-400">Pro Plan: Outlier + Thumbnail Search</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    <span className="text-gray-600 dark:text-gray-400">Business Plan: All Features</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span>Upgrade to Pro or Business plan to unlock this feature</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/billing'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Crown className="w-5 h-5" />
                Upgrade to Pro Plan
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    
    setLoading(true);
    try {
      const result = await axios.get(`/api/thumbnail-search?query=${encodeURIComponent(searchQuery.trim())}`);
      console.log(result.data);
      
      setSearchResults(result.data || []);
      setSearchStep('results');
      
      toast.success(`Found ${result.data?.length || 0} thumbnails for "${searchQuery}"`);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search thumbnails');
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailSelect = async (thumbnail: VideoThumbnail) => {
    setSelectedThumbnail(thumbnail);
    setGeneratingAI(true);
    setGeneratingThumbnailId(thumbnail.id);
    
    try {
      // Use the thumbnail URL to get AI-powered search suggestions
      const result = await axios.get(`/api/thumbnail-search?thumbnailUrl=${encodeURIComponent(thumbnail.thumbnailUrl)}`);
      console.log('AI suggestions result:', result.data);
      
      setAiSuggestions(result.data || []);
      setSearchStep('ai-suggestions');
      toast.success(`AI generated ${result.data?.length || 0} similar thumbnails for you!`);
    } catch (error) {
      console.error('AI suggestions error:', error);
      toast.error('Failed to generate AI suggestions');
    } finally {
      setGeneratingAI(false);
      setGeneratingThumbnailId(null);
    }
  };

  const handleNewSearch = () => {
    setSearchStep('search');
    setSearchResults([]);
    setSearchQuery('');
    setGeneratingThumbnailId(null);
  };

  const handleBackToResults = () => {
    setSearchStep('results');
    setAiSuggestions([]);
    setSelectedThumbnail(null);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    handleSearch();
  };

  const handleGenerateMore = () => {
    if (selectedThumbnail) {
      handleThumbnailSelect(selectedThumbnail);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Thumbnail Search & AI Generator</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-8 p-8 pt-6">
        {/* Hero Section */}
        <SearchHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          loading={loading}
        />

        {searchStep === 'search' && (
          <PopularSearches onTagClick={handleTagClick} />
        )}

        <ProgressSteps searchStep={searchStep} />

        {searchStep === 'results' && searchResults.length > 0 && (
          <SearchResults
            searchQuery={searchQuery}
            searchResults={searchResults}
            onThumbnailSelect={handleThumbnailSelect}
            onNewSearch={handleNewSearch}
            generatingThumbnailId={generatingThumbnailId}
          />
        )}

        {searchStep === 'ai-suggestions' && aiSuggestions.length > 0 && (
          <AISuggestions
            selectedThumbnail={selectedThumbnail}
            aiSuggestions={aiSuggestions}
            onGenerateMore={handleGenerateMore}
            onBackToResults={handleBackToResults}
            isGenerating={generatingAI}
          />
        )}

        {searchStep === 'ai-suggestions' && aiSuggestions.length === 0 && generatingAI && (
          <LoadingSpinner />
        )}

        {searchStep === 'search' && <HowItWorks />}

      </div>
    </div>
  );
}
