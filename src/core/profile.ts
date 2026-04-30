import type { ProjectLanguage } from "./projects";

export interface ProfileContent {
    role: string;
    description: string;
    summary: string;
    homepageSkills: string[];
}

export const profileContent: Record<ProjectLanguage, ProfileContent> = {
    en: {
        role: "iOS & macOS Developer • AI Engineer",
        description: "iOS/macOS Developer and AI Engineer with 10+ years' experience in Swift, SwiftUI, and UIKit. Focused on UX, business rules, design, and clean architecture, using AI and Codex in daily work.",
        summary: "iOS/macOS Developer and AI Engineer with 10+ years of experience in Swift, SwiftUI, and UIKit, building scalable apps with a strong focus on UX, performance, and clean architecture. AI is now part of my daily workflow with tools like Codex, allowing me to focus more deeply on business rules, product design, and project architecture.",
        homepageSkills: ["Swift", "SwiftUI", "UIKit", "Objective-C", "SwiftData", "CoreData", "CI/CD", "React Native", "AI", "Codex", "Cloud", "Gemini"],
    },
    "pt-br": {
        role: "Desenvolvedor iOS & macOS • Engenheiro de IA",
        description: "Desenvolvedor iOS/macOS e Engenheiro de IA com mais de 10 anos de experiência em Swift, SwiftUI e UIKit. Focado em UX, regras de negócio, design e arquitetura limpa, usando IA e Codex no dia a dia.",
        summary: "Desenvolvedor iOS/macOS e Engenheiro de IA com mais de 10 anos de experiência em Swift, SwiftUI e UIKit, criando apps escaláveis com forte foco em UX, performance e arquitetura limpa. Atualmente, a IA faz parte do meu dia a dia com ferramentas como o Codex, permitindo um foco ainda maior nas regras de negócio, no design do produto e na arquitetura do projeto.",
        homepageSkills: ["Swift", "SwiftUI", "UIKit", "Objective-C", "SwiftData", "CoreData", "CI/CD", "React Native", "IA", "Codex", "Cloud", "Gemini"],
    },
};
