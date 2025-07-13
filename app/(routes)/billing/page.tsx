import React from 'react';

export default function BillingPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <h1 className="text-xl font-semibold">Billing</h1>
        </div>
      </div>
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Current Plan</h3>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">Free Plan</div>
              <p className="text-muted-foreground">
                Basic features with limited usage
              </p>
              <div className="pt-2">
                <div className="text-sm text-muted-foreground">Usage this month:</div>
                <div className="text-sm font-medium">15 / 50 credits used</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Pro Plan</h3>
            <div className="space-y-2">
              <div className="text-2xl font-bold">$29<span className="text-sm font-normal">/month</span></div>
              <p className="text-muted-foreground">
                Advanced features and unlimited usage
              </p>
              <button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Upgrade to Pro
              </button>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
            <div className="space-y-2">
              <div className="text-2xl font-bold">Custom</div>
              <p className="text-muted-foreground">
                Custom solutions for teams and agencies
              </p>
              <button className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Plan Features</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Free Plan</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 50 AI generations per month</li>
                  <li>• Basic thumbnail templates</li>
                  <li>• Standard keyword research</li>
                  <li>• Community support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Pro Plan</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Unlimited AI generations</li>
                  <li>• Premium templates library</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                  <li>• A/B testing tools</li>
                  <li>• API access</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Billing History</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium text-sm">Free Plan</div>
                  <div className="text-xs text-muted-foreground">Current plan</div>
                </div>
                <div className="text-sm font-medium">$0.00</div>
              </div>
              <div className="text-sm text-muted-foreground">
                No billing history available. Upgrade to Pro to start your billing history.
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              No payment methods added. Add a payment method to upgrade your plan.
            </p>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
