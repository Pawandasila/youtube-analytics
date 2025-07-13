import React from 'react';

export default function ThumbnailSearchPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <h1 className="text-xl font-semibold">Thumbnail Search</h1>
        </div>
      </div>
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Discover Trending Thumbnails</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Trending Analysis</h3>
            <p className="text-muted-foreground">
              Analyze what makes thumbnails perform well across different niches and categories.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Competitor Research</h3>
            <p className="text-muted-foreground">
              Study successful thumbnails from top creators in your field to understand best practices.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
            <p className="text-muted-foreground">
              Get insights into click-through rates, engagement levels, and thumbnail effectiveness.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Search Filters</h3>
            <p className="text-muted-foreground">
              Filter by category, view count, upload date, and other criteria to find exactly what you need.
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Search Features</h3>
          <p className="text-muted-foreground mb-4">
            Use our advanced search capabilities to find the perfect thumbnail inspiration for your content.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Search by Category</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Gaming thumbnails</li>
                <li>• Educational content</li>
                <li>• Entertainment & vlogs</li>
                <li>• Technology reviews</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Advanced Filters</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• View count range</li>
                <li>• Upload date period</li>
                <li>• Channel size</li>
                <li>• Engagement rate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
