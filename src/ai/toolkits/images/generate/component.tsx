import React from "react";

import Image from "next/image";

import type { ImageGenerationParams, ImageGenerationResult } from "./types";

interface ImageGenerationCallProps {
  args: ImageGenerationParams;
}

export function ImageGenerationCallingComponent({
  args,
}: ImageGenerationCallProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Generating image for:</span>
      <span className="font-medium">{args.prompt}</span>
    </div>
  );
}

interface ImageGenerationResultsProps {
  result: ImageGenerationResult;
}

export function ImageGenerationResults({
  result,
}: ImageGenerationResultsProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Image Generation Results</h1>
      <Image src={result.url} alt="Generated Image" width={500} height={500} />
    </div>
  );
}
