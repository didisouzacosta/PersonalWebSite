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
            `- [KuboRush](${absoluteUrl("/apps/kuborush/")}): Casual block puzzle game for iOS with power-ups and weekly competition.`,
            `- [LoopSize](${absoluteUrl("/apps/loopsize/")}): Ring size converter for iPhone with multiple international standards and PDF export.`,
            "",
        ].join("\n"),
        {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        },
    );
}
