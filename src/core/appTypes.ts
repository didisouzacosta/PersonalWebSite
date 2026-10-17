import type { AlternateLocale } from "./seo";

export interface AppFeature {
    title: string;
    description: string;
}

export interface AppUseCase {
    title: string;
    description: string;
}

export interface AppFact {
    label: string;
    value: string;
}

export interface AppTestimonial {
    quote: string;
    author: string;
    context?: string;
}

export interface AppVideo {
    youtubeUrl: string;
    title?: string;
    caption?: string;
}

export interface AppFaqItem {
    question: string;
    answer: string;
}

export interface AppMeta {
    name: string;
    content: string;
}

export type LocalizedScreenshotUrl = string | {
    en: string;
    ptBr?: string;
    "pt-br"?: string;
};

export interface AppScreenshotImage {
    url: LocalizedScreenshotUrl;
    alt: string;
    caption?: string;
    placeholder?: false;
}

export interface AppScreenshotPlaceholder {
    placeholder: true;
    alt: string;
    caption?: string;
}

export type AppScreenshot = AppScreenshotImage | AppScreenshotPlaceholder;

// Content of an app page, independent of which site renders it.
export interface AppPageContent {
    appId?: string;
    appStoreUrl?: string;
    testFlightUrl?: string;
    title: string;
    pageTitle?: string;
    appName?: string;
    favicon: string;
    appIcon: string;
    socialImage?: string;
    socialImageAlt?: string;
    socialImageType?: string;
    description: string;
    screenshots: AppScreenshot[];
    faq: AppFaqItem[];
    metas: AppMeta[];
    lang?: string;
    applicationCategory?: string;
    operatingSystem?: string;
    features?: AppFeature[];
    useCases?: AppUseCase[];
    facts?: AppFact[];
    testimonials?: AppTestimonial[];
    video?: AppVideo;
    primaryKeyword?: string;
    secondaryKeywords?: string[];
    canonicalUrl?: string;
    alternateLocales?: AlternateLocale[];
}
