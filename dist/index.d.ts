type Watermark = {
    keyname: string;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
    opacity?: number;
    size?: string;
};
type OutPutFiles = ["360p", "480p", "720p", "1080p"];

declare class Media {
    static convert({ apiKey, keyname, outPutBucketId, outputs, generateSubtitles, watermark, }: {
        apiKey: string;
        keyname: string;
        outPutBucketId: string;
        outputs: OutPutFiles;
        generateSubtitles?: boolean;
        watermark?: Watermark;
    }): Promise<{
        trackingId: string;
    }>;
}
declare const media: typeof Media;

export { media };
