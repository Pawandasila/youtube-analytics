"use client";

import React from "react";
import { PricingTable } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { CreditCard, Sparkles, Crown } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b ">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"
            >
              <CreditCard className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="text-xl font-semibold">Billing</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-8 p-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Billing & Subscription
            </h2>
            <Crown className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your YouTube content creation journey
          </p>
        </motion.div>

        {/* Clerk Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl hover:shadow-xl transition-shadow duration-300"
        >
          <div className="max-w-6xl mx-auto">
            <PricingTable />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
