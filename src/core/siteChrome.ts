export interface SiteNavigationItem {
    label: string;
    href: string;
    // Path prefix that marks the item as the current page.
    match: string;
}

export function portfolioNavigation(isPtBr: boolean): SiteNavigationItem[] {
    return [
        { label: "Home", href: isPtBr ? "/pt-br/" : "/", match: isPtBr ? "/pt-br/" : "/" },
        { label: "Apps", href: isPtBr ? "/pt-br/#apps" : "/#apps", match: isPtBr ? "/pt-br/apps/" : "/apps/" },
        { label: "Resume", href: isPtBr ? "/resume/pt-br/" : "/resume/", match: isPtBr ? "/resume/pt-br/" : "/resume/" },
    ];
}
