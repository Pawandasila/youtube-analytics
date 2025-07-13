import React from 'react';

export default function KeywordsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <h1 className="text-xl font-semibold">Keywords</h1>
        </div>
      </div>
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Keyword Research & Analysis</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Trending Keywords</h3>
            <p className="text-muted-foreground">
              Discover the most searched keywords in your niche with real-time trend analysis.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Competition Analysis</h3>
            <p className="text-muted-foreground">
              Analyze keyword difficulty and competition levels to find opportunities.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Long-tail Suggestions</h3>
            <p className="text-muted-foreground">
              Get AI-powered long-tail keyword suggestions for better ranking opportunities.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Search Volume Data</h3>
            <p className="text-muted-foreground">
              Access accurate search volume data and seasonal trends for strategic planning.
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Keyword Research Tools</h3>
          <p className="text-muted-foreground mb-4">
            Leverage our comprehensive keyword research tools to optimize your content strategy and improve discoverability.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">Research Tools</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keyword planner</li>
                <li>• Trend analyzer</li>
                <li>• Competitor keywords</li>
                <li>• Related keywords</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Analytics</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Search volume tracking</li>
                <li>• Keyword difficulty score</li>
                <li>• Ranking potential</li>
                <li>• Seasonal trends</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Optimization</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Title optimization</li>
                <li>• Tag suggestions</li>
                <li>• Description keywords</li>
                <li>• Content planning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
