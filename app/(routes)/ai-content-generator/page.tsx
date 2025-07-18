"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  FileText,
  Tag,
  Image,
  Loader2,
  Copy,
  Download,
  ArrowLeft,
  Hash,
  CheckCircle,
  Play,
  Eye,
  Clock,
  TrendingUp,
  Zap,
  Users,
  Target,
  History,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { RunStatus } from "@/services/GlobalApi";

interface TitleOption {
  title: string;
  seo_score: number;
}

interface ThumbnailOption {
  heading: string;
  url: string;
  prompt: string;
  fileId?: string;
  fallback?: boolean;
}

interface GeneratedContent {
  titles: TitleOption[];
  selectedTitle: string;
  description: string;
  tags: string[];
  thumbnails: ThumbnailOption[];
}

interface SavedContent {
  id: number;
  userInput: string;
  title: string;
  description: string;
  tags: string;
  thumbnails: string;
  userEmail: string;
  createdAt: number;
  updatedAt: number;
}

type GenerationStep = "input" | "titles" | "content" | "history";

export default function AIContentGeneratorPage() {
  const [inputTitle, setInputTitle] = useState("");
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [currentStep, setCurrentStep] = useState<GenerationStep>("input");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState<number | null>(
    null
  );
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Fetch saved content on component mount
  useEffect(() => {
    fetchSavedContent();
  }, []);

  const fetchSavedContent = async () => {
    try {
      setIsLoadingHistory(true);
      const response = await axios.get('/api/ai-content-generator');
      setSavedContent(response.data.data || []);
    } catch (error) {
      console.error("Error fetching saved content:", error);
      toast.error("Failed to load previous content");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const loadSavedContent = (content: SavedContent) => {
    try {
      const titles = JSON.parse(content.title);
      const tags = JSON.parse(content.tags);
      const thumbnails = JSON.parse(content.thumbnails);
      
      setGeneratedContent({
        titles: titles,
        selectedTitle: titles[0]?.title || "",
        description: content.description,
        tags: tags,
        thumbnails: thumbnails,
      });
      
      setInputTitle(content.userInput);
      setCurrentStep("content");
      toast.success("Previous content loaded successfully!");
    } catch (error) {
      console.error("Error loading saved content:", error);
      toast.error("Failed to load saved content");
    }
  };

  const handleGenerate = async () => {
    if (!inputTitle.trim()) {
      toast.error("Please enter a title to generate content");
      return;
    }

    setIsGenerating(true);
    setCurrentStep("titles");

    try {
      const response = await axios.post('/api/ai-content-generator', {
        title: inputTitle,
      });

      // The backend returns the runId from Inngest
      const aiContent = response.data;
      console.log("Initial response:", aiContent);

      // Wait a bit for the function to start
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      let attempts = 0;
      const maxAttempts = 30;
      let isCompleted = false;

      while (!isCompleted && attempts < maxAttempts) {
        try {
          const runStatus = await RunStatus(aiContent.runId);
          console.log("Run status:", runStatus);

          if (runStatus) {
            if (runStatus.status === 'Completed') {
              // Extract the data from the database result
              const dbResult = runStatus.output?.data?.database?.result?.[0];
              
              if (dbResult) {
                // Parse the JSON strings from the database
                const titles = JSON.parse(dbResult.title);
                const tags = JSON.parse(dbResult.tags);
                const thumbnails = JSON.parse(dbResult.thumbnails);
                
                setGeneratedContent({
                  titles: titles,
                  selectedTitle: "",
                  description: dbResult.description,
                  tags: tags,
                  thumbnails: thumbnails,
                });

                console.log("Parsed content:", {
                  titles,
                  description: dbResult.description,
                  tags,
                  thumbnails
                });

                isCompleted = true;
                toast.success("AI content generated successfully!");
                break;
              } else {
                throw new Error("No data found in the result");
              }
            } else if (runStatus.status === 'Failed') {
              throw new Error("Content generation failed");
            } else {
              console.log("⏳ Still processing...");
            }
          } else {
            console.log("⏳ Run not found yet, waiting...");
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          attempts++;

        } catch (statusError) {
          console.error("❌ Error checking status:", statusError);
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      if (!isCompleted) {
        alert("⏰ Generation is taking longer than expected, but it's still processing in the background! Check back in a few minutes.");
      }

    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
      setCurrentStep("input");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTitleSelect = async (titleIndex: number) => {
    if (!generatedContent) return;

    setIsGenerating(true);
    setSelectedTitleIndex(titleIndex);
    const selectedTitle = generatedContent.titles[titleIndex].title;

    try {
      // Since we already have all the content generated, we just need to set the selected title
      setGeneratedContent({
        ...generatedContent,
        selectedTitle,
      });

      setCurrentStep("content");
      toast.success("Content ready to use!");
    } catch (error) {
      toast.error("Failed to prepare content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOver = () => {
    setInputTitle("");
    setGeneratedContent(null);
    setCurrentStep("input");
    setSelectedTitleIndex(null);
    setIsGenerating(false);
    // Refresh saved content when starting over
    fetchSavedContent();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Content copied to clipboard!");
  };

  const downloadContent = () => {
    if (!generatedContent) return;

    const content = `Title: ${generatedContent.selectedTitle}

Description:
${generatedContent.description}

Tags:
${generatedContent.tags.join(", ")}

Thumbnail URLs:
${generatedContent.thumbnails.map((thumb, index) => `${index + 1}. ${thumb.heading}: ${thumb.url}`).join("\n")}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generatedContent.selectedTitle
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content downloaded successfully!");
  };

  const steps = [
    { id: "input", title: "Enter Topic", icon: Search },
    { id: "titles", title: "Choose Title", icon: Target },
    { id: "content", title: "Get Content", icon: CheckCircle },
    { id: "history", title: "Previous Content", icon: History },
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Advanced AI generates optimized content",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "SEO Optimized",
      description: "Built for maximum discoverability",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Engagement Ready",
      description: "Crafted to boost viewer interaction",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get complete content in seconds",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const popularTopics = [
    "How to Learn React",
    "YouTube SEO Tips",
    "Morning Routine",
    "Productivity Hacks",
    "AI Tools Review",
    "Web Development",
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">AI Content Generator</h1>
          </div>

          {currentStep !== "input" && (
            <div className="hidden md:flex items-center space-x-4 ml-auto mr-4">
              {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted =
                  steps.findIndex((s) => s.id === currentStep) > index;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : isCompleted
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                          isCompleted
                            ? "bg-green-400"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {currentStep !== "input" && (
            <button
              onClick={handleStartOver}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Start Over
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-8 p-8 pt-6 min-h-[calc(100vh-3.5rem)]">
        {currentStep === "input" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 max-w-4xl mx-auto flex flex-col justify-center min-h-[calc(100vh-8rem)]"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Create Amazing
                <br />
                <span className="text-4xl md:text-5xl">YouTube Content</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Transform your ideas into engaging YouTube content with
                AI-powered titles, descriptions, tags, and thumbnails
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter your video topic (e.g., 'How to Learn React')"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && !isGenerating && handleGenerate()
                    }
                    className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 shadow-sm focus:shadow-md transition-all duration-200"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  disabled={isGenerating || !inputTitle.trim()}
                  className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl min-w-[140px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate
                    </>
                  )}
                </motion.button>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-3 text-center">
                  Popular topics:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setInputTitle(topic)}
                      className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setCurrentStep("history")}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <History className="w-4 h-4" />
                  View Previous Content ({savedContent.length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div
                      className={`relative h-24 bg-gradient-to-br ${feature.color} p-4`}
                    >
                      <div className="absolute top-3 left-3">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === "titles" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 max-w-4xl mx-auto flex flex-col justify-center min-h-[calc(100vh-8rem)]"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Choose Your Perfect Title
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select the title that best captures your content's essence and
                maximizes engagement
              </p>
            </div>

            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-bounce delay-100"></div>
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    🚀 Generating AI Content...
                  </h3>
                  <div className="space-y-2">
                    <p className="text-lg text-muted-foreground">
                      Our AI is creating amazing content for your video
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Analyzing trends</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
                        <span>Generating thumbnails</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                        <span>Optimizing SEO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {generatedContent?.titles.map((titleOption, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => handleTitleSelect(index)}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                            {titleOption.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {titleOption.title.length}/60 characters
                            </span>
                            <span className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              SEO: {titleOption.seo_score}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {currentStep === "content" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent leading-tight mb-4">
                Your Content Package
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create engaging, SEO-optimized YouTube
                content
              </p>
            </div>

            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Creating Your Content Package...
                </h3>
                <p className="text-muted-foreground text-lg">
                  Generating description, tags, and thumbnail options
                </p>
              </div>
            ) : (
              generatedContent && (
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          Selected Title
                        </h3>
                        <button
                          onClick={() =>
                            copyToClipboard(generatedContent.selectedTitle)
                          }
                          className="p-2 text-gray-500 hover:text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/50">
                        <p className="text-gray-900 dark:text-white font-semibold text-lg">
                          {generatedContent.selectedTitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            Description
                          </h3>
                          <button
                            onClick={() =>
                              copyToClipboard(generatedContent.description)
                            }
                            className="p-2 text-gray-500 hover:text-green-500 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 max-h-80 overflow-y-auto border border-gray-200/50 dark:border-gray-600/50">
                          <pre className="text-gray-900 dark:text-white text-sm whitespace-pre-wrap font-sans leading-relaxed">
                            {generatedContent.description}
                          </pre>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {generatedContent.description.length}/5000 characters
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            SEO Optimized
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
                              <Image className="w-5 h-5 text-white" />
                            </div>
                            Thumbnail Options
                          </h3>
                          <span className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                            {generatedContent.thumbnails.length} Options
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {generatedContent.thumbnails.map(
                            (thumbnail, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: 0.1 * index,
                                }}
                                className="group relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-video cursor-pointer hover:shadow-lg transition-all duration-300"
                                onClick={() => window.open(thumbnail.url, '_blank')}
                              >
                                <img
                                  src={thumbnail.url}
                                  alt={`${thumbnail.heading} - Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                  <Download className="w-5 h-5 text-white mb-2" />
                                  <span className="text-white text-xs font-medium text-center px-2">
                                    {thumbnail.heading}
                                  </span>
                                </div>
                                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  {index + 1}
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  {thumbnail.heading}
                                </div>
                              </motion.div>
                            )
                          )}
                        </div>
                        <div className="mt-4 text-center">
                          <p className="text-sm text-muted-foreground">
                            Click any thumbnail to open in new tab
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                            <Hash className="w-5 h-5 text-white" />
                          </div>
                          SEO Tags
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                            {generatedContent.tags.length} Tags
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(generatedContent.tags.join(", "))
                            }
                            className="p-2 text-gray-500 hover:text-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                        {generatedContent.tags.map((tag, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.02 * index }}
                            className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-full border border-purple-200/50 dark:border-purple-800/50 hover:scale-105 transition-transform duration-200 cursor-default"
                          >
                            #{tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center pt-8 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        🎉 Your content is ready!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Download the complete package or copy individual sections
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={downloadContent}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Download className="w-6 h-6" />
                        Download Complete Package
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              )
            )}
          </motion.div>
        )}

        {currentStep === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight mb-4">
                Previous Content
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your previously generated YouTube content packages
              </p>
            </div>

            {isLoadingHistory ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Loading Previous Content...
                </h3>
                <p className="text-muted-foreground text-lg">
                  Fetching your content history
                </p>
              </div>
            ) : savedContent.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Previous Content
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start creating your first AI-generated YouTube content
                </p>
                <button
                  onClick={() => setCurrentStep("input")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5" />
                  Create New Content
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedContent.map((content) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    onClick={() => loadSavedContent(content)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {content.userInput}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(content.createdAt * 1000).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {JSON.parse(content.tags).length} tags
                          </span>
                          <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {JSON.parse(content.thumbnails).length} thumbnails
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description Preview:
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {content.description}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Tags:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {JSON.parse(content.tags).slice(0, 3).map((tag: string, index: number) => (
                              <span
                                key={index}
                                className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                            {JSON.parse(content.tags).length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{JSON.parse(content.tags).length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Click to load content
                          </span>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-muted-foreground">
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
