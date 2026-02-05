# @oneminutecloud/media-convert

The official TypeScript/JavaScript SDK for [OneMinute Cloud](https://oneminutecloud.com) Media Convert — a cloud-based media transcoding service that converts video files into multi-resolution HLS streams.

[![npm version](https://img.shields.io/npm/v/@oneminutecloud/media-convert)](https://www.npmjs.com/package/@oneminutecloud/media-convert)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

- **Multi-resolution transcoding** — Convert videos to 360p, 480p, 720p, and 1080p
- **HLS output** — Stream-ready HTTP Live Streaming format
- **Automatic subtitles** — Optional subtitle generation for your media
- **Watermarking** — Overlay watermarks with configurable position, opacity, and size
- **Job tracking** — Track conversion progress via a unique tracking ID
- **Dual module support** — Works with both ESM and CommonJS
- **Fully typed** — First-class TypeScript support with bundled type definitions
- **Tree-shakeable** — Marked side-effect free for optimal bundling

## Installation

```bash
npm install @oneminutecloud/media-convert
```

```bash
yarn add @oneminutecloud/media-convert
```

```bash
pnpm add @oneminutecloud/media-convert
```

## Quick Start

```typescript
import { media } from "@oneminutecloud/media-convert";

const { trackingId } = await media.convert({
  apiKey: "your-api-key",
  keyname: "my-bucket/videos/input.mp4",
  outPutBucketId: "550e8400-e29b-41d4-a716-446655440000",
  outputs: ["360p", "480p", "720p", "1080p"],
});

console.log("Job started:", trackingId);
```

## API Reference

### `media.convert(options)`

Submits a media conversion job and returns a tracking ID.

```typescript
const { trackingId } = await media.convert(options);
```

#### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `apiKey` | `string` | Yes | Your OneMinute Cloud API key |
| `keyname` | `string` | Yes | Path to the input media file (minimum 3 path segments, e.g. `bucket/folder/file.mp4`) |
| `outPutBucketId` | `string` | Yes | UUID of the bucket where the transcoded files will be stored |
| `outputs` | `OutPutFiles` | Yes | Resolution array: `["360p", "480p", "720p", "1080p"]` |
| `generateSubtitles` | `boolean` | No | Enable automatic subtitle generation |
| `watermark` | `Watermark` | No | Watermark configuration (see below) |

#### Returns

```typescript
Promise<{ trackingId: string }>
```

### Types

#### `Watermark`

```typescript
type Watermark = {
  keyname: string;       // Path to the watermark image file
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  opacity?: number;      // Watermark opacity (0-1)
  size?: string;         // Watermark size
};
```

#### `OutPutFiles`

```typescript
type OutPutFiles = ["360p", "480p", "720p", "1080p"];
```

## Examples

### Basic Conversion

```typescript
import { media } from "@oneminutecloud/media-convert";

const { trackingId } = await media.convert({
  apiKey: process.env.OMC_API_KEY,
  keyname: "my-bucket/uploads/video.mp4",
  outPutBucketId: "550e8400-e29b-41d4-a716-446655440000",
  outputs: ["360p", "480p", "720p", "1080p"],
});
```

### With Subtitles

```typescript
const { trackingId } = await media.convert({
  apiKey: process.env.OMC_API_KEY,
  keyname: "my-bucket/uploads/lecture.mp4",
  outPutBucketId: "550e8400-e29b-41d4-a716-446655440000",
  outputs: ["360p", "480p", "720p", "1080p"],
  generateSubtitles: true,
});
```

### With Watermark

```typescript
const { trackingId } = await media.convert({
  apiKey: process.env.OMC_API_KEY,
  keyname: "my-bucket/uploads/promo.mp4",
  outPutBucketId: "550e8400-e29b-41d4-a716-446655440000",
  outputs: ["360p", "480p", "720p", "1080p"],
  watermark: {
    keyname: "my-bucket/assets/logo.png",
    position: "bottom-right",
    opacity: 0.8,
    size: "150x150",
  },
});
```

## Error Handling

The SDK throws descriptive errors for invalid inputs. Wrap calls in try/catch to handle them:

```typescript
import { media } from "@oneminutecloud/media-convert";

try {
  const { trackingId } = await media.convert({
    apiKey: process.env.OMC_API_KEY,
    keyname: "my-bucket/uploads/video.mp4",
    outPutBucketId: "550e8400-e29b-41d4-a716-446655440000",
    outputs: ["360p", "480p", "720p", "1080p"],
  });
  console.log("Conversion started:", trackingId);
} catch (error) {
  console.error("Conversion failed:", error.message);
}
```

| Error Message | Cause |
|---|---|
| `ONEMINUTECLOUD_API_KEY is not defined` | API key was not provided |
| `Your API key is invalid!` | The provided API key is not valid |
| `Invalid keyname!` | Keyname must contain at least 3 path segments (e.g. `bucket/folder/file.mp4`) |
| `Output Bucket ID is required` | Missing `outPutBucketId` parameter |
| `Invalid output bucket ID` | Bucket ID is not a valid UUID |

## Requirements

- Node.js 18+ (uses the native `fetch` API)
- A valid OneMinute Cloud API key

## License

[ISC](https://opensource.org/licenses/ISC)
