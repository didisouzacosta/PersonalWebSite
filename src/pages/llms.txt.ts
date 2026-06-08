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
            `- [DuoTake](${absoluteUrl("/apps/duotake/")}): Reaction dual cam iPhone app that records front and rear cameras together with creator layouts, CropOut background removal, and a premium Teleprompter.`,
            `- [KuboRush](${absoluteUrl("/apps/kuborush/")}): Smart and relaxing block puzzle game for quick 2-minute breaks, with Hint, Shuffle, Rotate, Undo, Hall of Fame, and Weekly Rush.`,
            `- [LoopSize](${absoluteUrl("/apps/loopsize/")}): Ring measurement and size chart app for BR, US, UK, EU/ISO, JP, CN, and IN standards, with precise dimensions, iCloud sync, history, and branded PDF export.`,
            "",
        ].join("\n"),
        {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        },
    );
}
