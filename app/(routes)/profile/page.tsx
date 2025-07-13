import React from 'react';
import { UserProfile } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
      </div>
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
        </div>
        
        <div className="max-w-4xl">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "border shadow-sm",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
