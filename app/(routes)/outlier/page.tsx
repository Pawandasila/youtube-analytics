import React from 'react';

export default function OutlierPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <h1 className="text-xl font-semibold">Outlier</h1>
        </div>
      </div>
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Outlier Analysis</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Performance Anomalies</h3>
            <p className="text-muted-foreground">
              Identify videos that performed significantly better or worse than expected.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Success Pattern Analysis</h3>
            <p className="text-muted-foreground">
              Understand what made your outlier content succeed and replicate those factors.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Viral Content Detection</h3>
            <p className="text-muted-foreground">
              Discover trending content patterns and viral elements in your niche.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Underperformer Insights</h3>
            <p className="text-muted-foreground">
              Learn why some content underperformed and how to improve future uploads.
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Outlier Detection Features</h3>
          <p className="text-muted-foreground mb-4">
            Our advanced outlier analysis helps you understand the factors behind exceptional content performance.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="font-medium text-sm mb-1">High Performers</div>
                  <div className="text-xs text-muted-foreground">Videos exceeding expected metrics by 200%+</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="font-medium text-sm mb-1">Viral Detection</div>
                  <div className="text-xs text-muted-foreground">Content with exponential growth patterns</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="font-medium text-sm mb-1">Underperformers</div>
                  <div className="text-xs text-muted-foreground">Content below baseline performance</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Analysis Insights</h4>
              <div className="space-y-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="font-medium text-sm mb-1">Success Factors</div>
                  <div className="text-xs text-muted-foreground">Title, thumbnail, timing, and content analysis</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="font-medium text-sm mb-1">Trend Correlation</div>
                  <div className="text-xs text-muted-foreground">Alignment with trending topics and algorithms</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="font-medium text-sm mb-1">Improvement Suggestions</div>
                  <div className="text-xs text-muted-foreground">Actionable recommendations for future content</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
