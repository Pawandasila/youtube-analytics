import React from 'react';
import { UserProfile } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b ">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
      </div>
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        
        <div className="max-w-full">
          <UserProfile 
            routing="hash"
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
