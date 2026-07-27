#!/bin/bash
TARGET_DIR="/Users/macbookpro/Documents/antigravity/charming-kepler/silent/public/video"
SOURCE_DIR="/Users/macbookpro/Desktop/video"

for file in "$SOURCE_DIR"/*.{mp4,mov}; do
    if [ -f "$file" ]; then
        filename=$(basename -- "$file")
        filename_no_ext="${filename%.*}"
        
        # We output everything as mp4
        output_file="$TARGET_DIR/${filename_no_ext}.mp4"
        
        echo "Processing $file -> $output_file"
        # -an to remove audio, scale to max 1080p, adjust crf for smaller size
        ffmpeg -i "$file" -vcodec libx264 -crf 28 -preset fast -vf "scale=-2:1080" -an -y "$output_file"
    fi
done
echo "All videos processed."
