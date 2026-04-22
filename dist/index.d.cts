type Watermark = {
    keyname: string;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
    opacity?: number;
    size?: string;
};
type OutPutFiles = ("360p" | "480p" | "720p" | "1080p")[];

declare class Media {
    static convert({ apiKey, keyname, outPutBucketId, outputs, generateSubtitles, watermark, webhookUrl, }: {
        apiKey: string;
        keyname: string;
        outPutBucketId: string;
        outputs: OutPutFiles;
        generateSubtitles?: boolean;
        watermark?: Watermark;
        webhookUrl: string;
    }): Promise<{
        trackingId: string;
    }>;
    static verifyWebhook({ apiKey, headers, body, }: {
        apiKey: string;
        headers: Record<string, any>;
        body: any;
    }): Promise<{
        valid: boolean;
    }>;
    static getMetadata({ apiKey, trackingId, }: {
        apiKey: string;
        trackingId: string;
    }): Promise<{
        video_id: string;
        fileCount: number;
        totalSizeBytes: number;
        resolution: string[];
    }>;
}
declare const media: typeof Media;

export { media };
