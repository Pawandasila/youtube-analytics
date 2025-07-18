import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  let searchQuery = searchParams.get("query") || "";
  const thumbnailUrl = searchParams.get("thumbnailUrl") || "";

  if (thumbnailUrl) {
    try {
      const response = await openai.chat.completions.create({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "You are an expert YouTube thumbnail analyzer. Analyze the provided thumbnail image and extract the most relevant search keywords that would help find similar YouTube videos. Focus on: 1) Main subject/topic (person, object, activity), 2) Visual style (colorful, minimalist, dramatic), 3) Content type (tutorial, review, vlog, gaming), 4) Key visual elements (text overlays, emotions, objects). Return exactly 5 comma-separated keywords that are commonly used in YouTube searches. Keywords should be specific enough to find similar content but broad enough to return good results. Do not include generic words like 'video', 'YouTube', 'thumbnail'. Example format: cooking tutorial, kitchen setup, food preparation, recipe guide, chef cooking"
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": thumbnailUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const aiResult = response.choices[0].message.content;
      searchQuery = aiResult || searchQuery;
    } catch (error) {
      console.error("Error analyzing thumbnail:", error);
      // Continue with original query if AI analysis fails
    }
  }

  // Get youtube video list api
  const youtubeSearchResult = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=20&key=${process.env.YOUTUBE_API_KEY}`
  );

  const searchData = youtubeSearchResult.data;

  const videoIds = searchData.items
    .map((item: any) => item.id.videoId)
    .join(",");


  // get Youtube detail by id api
  const videoResult = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${videoIds}&key=${process.env.YOUTUBE_API_KEY}`
  );

  const videoResultData = videoResult.data;

  const videoDetails = videoResultData.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    statistics: item.statistics,
    thumbnailUrl: item.snippet.thumbnails.high.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    viewCount: item.statistics.viewCount,
    likeCount: item.statistics.likeCount,
    duration: item.contentDetails?.duration || "N/A",
    commentCount: item.statistics.commentCount,
  }));

  return NextResponse.json(videoDetails);
}
