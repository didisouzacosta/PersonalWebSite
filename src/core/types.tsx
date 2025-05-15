interface Skill {
    title: string,
    description: string
}

interface Education {
    title: string,
    intitution: string,
    period: string,
    description: string
}

interface Certificate {
    title: string,
    url: string
}

interface Project {
    title: string,
    url: string,
    description: string
}

interface Job {
    title: string,
    company: string,
    period: string,
    locale: string,
    description: string,
    skills: string
}

interface Contact {
    label: string,
    description: string,
    url: string
}

interface Language {
    label: string,
    description: string
}

export interface Resume {
    title: string,
    name: string,
    download: {
        label: string,
        url: string,
    },
    openTo: {
        label: string,
        value: string
    },
    age: {
        label: string,
        value: string
    },
    living: {
        label: string,
        value: string
    },
    contacts: Contact[],
    summary: {
        title: string,
        description: string
    },
    skills: {
        title: string,
        items: Skill[]
    }
    educations: {
        title: string,
        items: Education[]
    },
    certificates: {
        title: string,
        items: Certificate[]
    },
    projects: {
        title: string,
        items: Project[]
    },
    jobs: {
        title: string,
        items: Job[]
    },
    languages: {
        title: string,
        items: Language[]
    }
}