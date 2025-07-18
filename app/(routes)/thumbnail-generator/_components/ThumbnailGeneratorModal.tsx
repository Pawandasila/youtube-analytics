"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Upload,
  ImageIcon,
  User,
  Loader2,
  Sparkles,
  X,
  AlertCircle,
} from "lucide-react";

interface ThumbnailGeneratorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: FormData) => Promise<{ success: boolean; data?: any }>;
}

const ThumbnailGeneratorModal: React.FC<ThumbnailGeneratorModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    content: "",
    referenceImage: null as File | null,
    faceImage: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImages, setPreviewImages] = useState({
    reference: null as string | null,
    face: null as string | null,
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.length < 5) {
      newErrors.content = "Content must be at least 5 characters long";
    } else if (formData.content.length > 500) {
      newErrors.content = "Content must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (file: File, type: "reference" | "face") => {
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        [type]: "Please upload a valid image file",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [type]: "Image size must be less than 5MB",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, [type]: "" }));

    setFormData((prev) => ({
      ...prev,
      [type === "reference" ? "referenceImage" : "faceImage"]: file,
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImages((prev) => ({
        ...prev,
        [type]: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (type: "reference" | "face") => {
    setFormData((prev) => ({
      ...prev,
      [type === "reference" ? "referenceImage" : "faceImage"]: null,
    }));
    setPreviewImages((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsGenerating(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("content", formData.content);
      if (formData.referenceImage) {
        submitFormData.append("referenceImage", formData.referenceImage);
      }
      if (formData.faceImage) {
        submitFormData.append("faceImage", formData.faceImage);
      }

      await onSubmit(submitFormData);

      // Success - reset form
      setFormData({
        content: "",
        referenceImage: null,
        faceImage: null,
      });
      setPreviewImages({
        reference: null,
        face: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      setErrors({ submit: "Failed to generate thumbnail. Please try again." });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl text-gray-900 dark:text-white">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              AI Thumbnail Generator
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Create stunning thumbnails for your YouTube videos using AI. Fill
              in the details below to get started.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-l-4 border-blue-500 p-3 rounded-r-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <p className="text-blue-900 dark:text-blue-100 text-sm">
                💡 <strong>Pro Tip:</strong> Add a reference image for better AI
                results! Without it, you'll get a generic thumbnail.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="flex items-center gap-2">
              <span className="text-red-500">*</span>
              Video Content
            </Label>
            <Textarea
              id="content"
              placeholder="Describe your YouTube title or description..."
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              className={`min-h-[120px] ${
                errors.content ? "border-red-500" : ""
              }`}
            />
            {errors.content && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                {errors.content}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.content.length}/500 characters
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Reference Image Upload */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Reference Image (Optional)
              </Label>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "reference");
                  }}
                  className="hidden"
                  id="reference-upload"
                />
                <Label
                  htmlFor="reference-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {previewImages.reference ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previewImages.reference}
                        alt="Reference preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={(e) => {
                          e.preventDefault();
                          removeImage("reference");
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        reference image
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </Label>
                {errors.reference && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.reference}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Face Image (Optional)
              </Label>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "face");
                  }}
                  className="hidden"
                  id="face-upload"
                />
                <Label
                  htmlFor="face-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {previewImages.face ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previewImages.face}
                        alt="Face preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={(e) => {
                          e.preventDefault();
                          removeImage("face");
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <User className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        face image
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </Label>
                {errors.face && (
                  <p className="text-sm text-red-500 mt-1">{errors.face}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {errors.submit && (
              <p className="text-sm text-red-500 text-center">
                {errors.submit}
              </p>
            )}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isGenerating}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isGenerating || !formData.content.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Thumbnail
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ThumbnailGeneratorModal;
