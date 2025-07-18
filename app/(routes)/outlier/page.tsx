'use client';

import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import {
  VideoThumbnail,
  SearchStep,
  OutlierHero,
  ProgressSteps,
  SearchResults,
  OutlierKnowledge,
  OutlierPopularSearches
} from './_components';

export default function ThumbnailSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VideoThumbnail[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchStep, setSearchStep] = useState<SearchStep>('search');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    
    setLoading(true);
    try {
      const result = await axios.get(`/api/outlier?query=${encodeURIComponent(searchQuery.trim())}`);
      console.log(result.data);
      
      setSearchResults(result.data || []);
      setSearchStep('results');
      
      toast.success(`Found ${result.data?.length || 0} outlier videos for "${searchQuery}"`);
    
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search outlier videos');
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setSearchStep('search');
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    handleSearch();
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-600 rounded-lg">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Outlier Video Discovery & Analysis</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-8 p-8 pt-6">
        {/* Hero Section */}
        <OutlierHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          loading={loading}
        />

        {searchStep === 'search' && (
          <OutlierPopularSearches onTagClick={handleTagClick} />
        )}

        <ProgressSteps searchStep={searchStep} />

        {searchStep === 'results' && searchResults.length > 0 && (
          <SearchResults
            searchQuery={searchQuery}
            searchResults={searchResults}
            onNewSearch={handleNewSearch}
          />
        )}

        {searchStep === 'search' && <OutlierKnowledge />}

      </div>
    </div>
  );
}
