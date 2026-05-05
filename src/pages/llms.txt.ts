import { absoluteUrl } from "../core/seo";

export function GET() {
    return new Response(
        [
            "# Adriano Souza Costa",
            "",
            "> Personal website for Adriano Souza Costa, an iOS/macOS developer and AI enthusiast, including resume pages and iOS app landing pages.",
            "",
            "## Main Pages",
            `- [Home](${absoluteUrl("/")}): Portfolio overview, featured projects, and professional profile.`,
            `- [Resume](${absoluteUrl("/resume/")}): English resume with iOS, macOS, Swift, SwiftUI, UIKit, Objective-C, and AI experience.`,
            `- [Curriculo](${absoluteUrl("/resume/pt-br/")}): Portuguese resume.`,
            "",
            "## Apps",
            `- [DuoTake](${absoluteUrl("/apps/duotake/")}): Dual-camera iPhone app that records front and back cameras at the same time for reactions, reviews, TikTok, Reels, and Shorts.`,
            `- [KuboRush](${absoluteUrl("/apps/kuborush/")}): Smart and relaxing block puzzle game for quick 2-minute breaks, with Hint, Shuffle, Rotate, Undo, Hall of Fame, and Weekly Rush.`,
            `- [LoopSize](${absoluteUrl("/apps/loopsize/")}): Ring size finder and converter for BR, US, UK, EU/ISO, JP, CN, and IN standards, with precise dimensions, iCloud-synced saved sizes, and PDF sharing.`,
            "",
        ].join("\n"),
        {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        },
    );
}
