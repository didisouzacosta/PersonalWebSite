import type { AnalyticsPageContext } from "./analyticsContext";

type Primitive = string | number | boolean | undefined;

export type AnalyticsProperties = Record<string, Primitive>;

export interface AnalyticsIdentifyPayload {
    userId?: string;
    name?: string;
    email?: string;
    [key: string]: Primitive;
}

interface HimetricaGlobal {
    track?: (name: string, props?: AnalyticsProperties) => void;
    identify?: (payload: AnalyticsIdentifyPayload) => void;
    pageview?: (props?: { title?: string; path?: string; referrer?: string }) => void;
    trackPageView?: (path?: string) => void;
    getVisitorId?: () => string | undefined;
    reset?: () => void;
    flush?: () => void;
}

declare global {
    interface Window {
        himetrica?: HimetricaGlobal;
        __SITE_ANALYTICS_CONTEXT__?: AnalyticsPageContext;
        __SITE_ANALYTICS_INITIALIZED__?: boolean;
    }
}

const pendingEvents: Array<{ name: string; props: AnalyticsProperties }> = [];

const getContext = () => window.__SITE_ANALYTICS_CONTEXT__;

const sanitizeProperties = (props: AnalyticsProperties) => {
    return Object.fromEntries(
        Object.entries(props).filter(([, value]) => value !== undefined),
    ) as Record<string, string | number | boolean>;
};

const getBaseProperties = (): AnalyticsProperties => {
    const context = getContext();

    return {
        page_path: window.location.pathname,
        page_title: document.title,
        page_type: context?.pageType,
        page_language: context?.lang,
        project_slug: context?.projectSlug,
        timestamp: new Date().toISOString(),
    };
};

const getProvider = () => window.himetrica;

const sendPendingEvents = () => {
    const provider = getProvider();
    if (!provider?.track) return;

    while (pendingEvents.length > 0) {
        const event = pendingEvents.shift();
        if (event) provider.track(event.name, sanitizeProperties(event.props));
    }
};

export function trackAnalyticsEvent(name: string, props: AnalyticsProperties = {}) {
    if (typeof window === "undefined") return;

    const eventProps = {
        ...getBaseProperties(),
        ...props,
    };

    const provider = getProvider();

    if (provider?.track) {
        provider.track(name, sanitizeProperties(eventProps));
        return;
    }

    pendingEvents.push({ name, props: eventProps });
    window.setTimeout(sendPendingEvents, 250);
}

export function trackPageAccess(props: AnalyticsProperties = {}) {
    if (typeof window === "undefined") return;

    const context = getContext();

    trackAnalyticsEvent("page_accessed", {
        canonical: context?.canonical,
        source: "analytics_initializer",
        referrer: document.referrer,
        ...props,
    });
}

export function identifyAnalyticsUser(payload: AnalyticsIdentifyPayload) {
    if (typeof window === "undefined") return;
    getProvider()?.identify?.(payload);
}

export function resetAnalytics() {
    if (typeof window === "undefined") return;
    getProvider()?.reset?.();
}

const getText = (element: Element) => (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120);

const getDefaultClickEvent = (element: HTMLElement) => {
    if (element instanceof HTMLAnchorElement) {
        const url = new URL(element.href, window.location.href);
        return url.origin === window.location.origin ? "internal_link_clicked" : "external_link_clicked";
    }

    return "control_clicked";
};

const getClickProperties = (element: HTMLElement): AnalyticsProperties => {
    const anchor = element instanceof HTMLAnchorElement ? element : element.closest("a");

    return {
        label: element.dataset.analyticsLabel || element.getAttribute("aria-label") || getText(element),
        location: element.dataset.analyticsLocation,
        href: anchor?.href,
        target: anchor?.target,
        project_slug: element.dataset.analyticsProject || getContext()?.projectSlug,
    };
};

const setupGlobalClickTracking = () => {
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const element = target.closest<HTMLElement>("a, button, summary, [role='button'], [data-analytics-event]");
        if (!element || element.dataset.analyticsIgnore === "true") return;

        const eventName = element.dataset.analyticsEvent || getDefaultClickEvent(element);
        trackAnalyticsEvent(eventName, getClickProperties(element));
    });
};

export function initializeAnalytics() {
    if (typeof window === "undefined") return;
    if (window.__SITE_ANALYTICS_INITIALIZED__) return;

    window.__SITE_ANALYTICS_INITIALIZED__ = true;
    setupGlobalClickTracking();

    window.addEventListener("load", sendPendingEvents, { once: true });
    trackPageAccess();
}
