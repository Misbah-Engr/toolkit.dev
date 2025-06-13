import React from "react";
import { type ImageGenerationResult } from "./types";

interface ImageGenerationResultsProps {
  result: ImageGenerationResult;
}

export function ImageGenerationResults({
  result,
}: ImageGenerationResultsProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Image Generation Results</h1>
      <img src={result.url} alt="Generated Image" />
    </div>
  );
}
