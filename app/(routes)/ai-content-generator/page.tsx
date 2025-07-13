import React from 'react';

export default function AIContentGeneratorPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <h1 className="text-xl font-semibold">AI Content Generator</h1>
        </div>
      </div>
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">AI-Powered Content Creation</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Video Scripts</h3>
            <p className="text-muted-foreground">
              Generate engaging video scripts tailored to your content style and audience.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Title Generation</h3>
            <p className="text-muted-foreground">
              Create compelling, SEO-optimized titles that drive clicks and engagement.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Description Writing</h3>
            <p className="text-muted-foreground">
              Generate detailed, keyword-rich descriptions that improve discoverability.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Content Ideas</h3>
            <p className="text-muted-foreground">
              Get unlimited content ideas based on trending topics in your niche.
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">AI Content Tools</h3>
          <p className="text-muted-foreground mb-6">
            Leverage advanced AI to create high-quality content that resonates with your audience and drives engagement.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <h4 className="font-medium">Script Generation</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Hook Creation</div>
                    <div className="text-muted-foreground text-xs">Engaging opening lines</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Story Structure</div>
                    <div className="text-muted-foreground text-xs">Narrative flow optimization</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Call-to-Actions</div>
                    <div className="text-muted-foreground text-xs">Engagement prompts</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Content Planning</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Topic Research</div>
                    <div className="text-muted-foreground text-xs">Trending subject analysis</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Content Calendar</div>
                    <div className="text-muted-foreground text-xs">Strategic scheduling</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Series Planning</div>
                    <div className="text-muted-foreground text-xs">Multi-part content strategy</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Optimization</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">SEO Integration</div>
                    <div className="text-muted-foreground text-xs">Keyword optimization</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Audience Targeting</div>
                    <div className="text-muted-foreground text-xs">Demographic customization</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Performance Prediction</div>
                    <div className="text-muted-foreground text-xs">Success probability analysis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
