#!/bin/bash
cd /Users/macbookpro/Documents/antigravity/charming-kepler/silent/public/video

# The list of videos in order
VIDEOS=(
    "motion-accoustic-wall-panels-vj-loop-2026-07-10-01-27-29-utc.mp4"
    "acoustic-foam-soundproof-panel-audio-insulation-st-2026-02-10-17-27-07-utc.mp4"
    "modern-interior-design-with-hanging-ceiling-panels-2026-07-16-15-29-27-utc.mp4"
    "modern-soundproof-acoustic-pod-in-a-contemporary-o-2026-01-22-06-05-17-utc.mp4"
    "sound-recording-room-fully-soundproofed-for-record-2025-12-17-14-57-27-utc.mp4"
)

rm -f file_list.txt
for i in "${!VIDEOS[@]}"; do
    vid="${VIDEOS[$i]}"
    # Output file name
    out="trimmed_$i.mp4"
    # Trim the first 3 seconds, rescale/crop to standard 1080p to avoid concat issues
    # Using a standard 1920x1080 resolution, 30fps to ensure they concat flawlessly
    ffmpeg -y -i "$vid" -t 3 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" -c:v libx264 -preset fast -crf 23 -an "$out"
    echo "file '$out'" >> file_list.txt
done

# Concat them
ffmpeg -y -f concat -safe 0 -i file_list.txt -c copy hero-merged.mp4

# Clean up trimmed parts
for i in "${!VIDEOS[@]}"; do
    rm -f "trimmed_$i.mp4"
done
rm -f file_list.txt

echo "Merged video saved as hero-merged.mp4"
