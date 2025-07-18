'use client';

import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VideoThumbnail[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState<VideoThumbnail | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<VideoThumbnail[]>([]);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [generatingThumbnailId, setGeneratingThumbnailId] = useState<string | null>(null);
  const [searchStep, setSearchStep] = useState<SearchStep>('search');

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
