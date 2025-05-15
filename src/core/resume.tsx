import type { Resume } from "./types";

function getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

export const eng: Resume = {
    title: "Adriano Souza Costa - Resume",
    name: "Adriano Souza Costa",
    openTo: {
        label: "Open to",
        value: "Remote"
    },
    age: {
        label: "Age",
        value: getAge("10/28/1988") + " years old"
    },
    living: {
        label: "Living in",
        value: "Bicas • Minas Gerais • Brazil"
    },
    contacts: [
        {
            label: "Phone",
            description: "(+55) 32 99114.7881",
            link: "tel:+5532991147881"
        },
        {
            label: "Mail",
            description: "adrianosouzacostaios@gmail.com",
            link: "mailto:adrianosouzacostaios@gmail.com"
        },
        {
            label: "Linkedin",
            description: "linkedin.com/in/adrianosouzacosta",
            link: "https://linkedin.com/in/adrianosouzacosta"
        },
        {
            label: "Github",
            description: "github.com/didisouzacosta",
            link: "https://github.com/didisouzacosta"
        }
    ],
    summary: {
        title: "Professional summary",
        description: "iOS / macOS Developer with 10+ years of experience in Swift, SwiftUI, Objective-C and UIKit, working on the development of scalable apps with a strong focus on UX, performance, and clean architecture. Solid expertise in integrating REST APIs, iCloud, and Apple technologies. Seeking new challenges in impactful projects."
    },
    skills: {
        title: "Skills",
        items: [
            { title: "Languages", description: "Swift, Objective-C and React Native." },
            { title: "Frameworks", description: "SwiftUI, SwiftData, CoreData, Combine, DeviceActivity, ManagedSettings, Foundation and AudioKit." },
            { title: "Tools", description: "Xcode, Git, Fastlane, Firebase, Github Actions and Travis." },
            { title: "Architectures", description: "MV,  MVC,  MVP, MVVM, MVVMC and Clean Architecture." },
            { title: "Other", description: "Unit tests, CI/CD, Apple Store Connect, Distribute apps out of Apple Store." }
        ]
    },
    jobs: {
        title: "Work experience",
        items: [
            {
                title: "iOS Developer",
                company: "ProDoctor",
                period: "Augost 2021 - Present",
                locale: "Remote",
                description: "Developing native health apps for iOS using Swift and Objective-C, with a focus on user experience, design, and best development practices. Implementing CI/CD pipelines and publishing on the Apple Store.",
                skills: "Swift, Objective-C, StoryBoards, CI/CD, Design"
            },
            {
                title: "iOS Instructor Assistent",
                company: "Digital House Brazil",
                period: "August 2021 - August 2022",
                locale: "Remote",
                description: "Support and co-host on the iOS classes.",
                skills: "Swift, StoryBoards, CI/CD, Apple Store"
            },
            {
                title: "iOS Specialist",
                company: "Wiser Educação",
                period: "March 2021 - August 2021",
                locale: "Remote",
                description: "iOS development in the educational software sector, with a focus on user experience, design, and software quality through best development practices, automated testing, and continuous integration. Creation of optimized components for React Native.",
                skills: "Swift, CI/CD, React Native, Apple Store, Android"
            },
            {
                title: "iOS Developer",
                company: "Consulta Remédios",
                period: "April 2019 - March 2021",
                locale: "Remote",
                description: "iOS development for a health marketplace, with a focus on user experience, design, and software quality through best development practices, automated testing, and continuous integration.",
                skills: "Swift, CI/CD, React Native, Apple Store, Design"
            },
            {
                title: "iOS Developer",
                company: "ProDoctor",
                period: "Augost 2016 - April 2019",
                locale: "Remote",
                description: "Developing native health apps for iOS using Swift and Objective-C, with a focus on user experience, design, and best development practices. Implementing CI/CD pipelines and publishing on the Apple Store.",
                skills: "Swift, Objective-C, StoryBoards, CI/CD, Design"
            },
            {
                title: "iOS Developer",
                company: "Handcom",
                period: "April 2015 - July 2016",
                locale: "OnSite",
                description: "Developing native health apps for iOS using Swift and Objective-C with a focus on user experience, design, and best development practices.",
                skills: "Swift, Objective-C, StoryBoards, CI/CD, Design"
            },
            {
                title: "Developer",
                company: "Appta",
                period: "Octuber 2013 - April 2015",
                locale: "OnSite",
                description: "Front-end development for iOS/Android and back-end development for various sectors and markets, with a focus on user experience, design, and software quality through best development practices. Responsible for team management and organization.",
                skills: "Swift, Objective-C, StoryBoards, CI/CD, Design, Android and DevOps"
            },
            {
                title: "Junior Software Developer",
                company: "Brazip",
                period: "November 2012 - November 2013",
                locale: "OnSite",
                description: "iOS/Android/Flex development focused on support and chat applications, always prioritizing user experience, design, and software quality through best development practices.",
                skills: "Objective-C, StoryBoards, Design, Android"
            },
            {
                title: "Design / Fullstack Developer",
                company: "Trópico Propaganda",
                period: "Octuber 2008 - Octuber 2012",
                locale: "OnSite",
                description: "Designer and Flash developer.",
                skills: "Flash, HTML, CSS, PHP, MySQL, Corel Draw, Photoshop, Design"
            }
        ]
    },
    educations: {
        title: "Educations",
        items: [
            {
                title: "System analytis and development",
                intitution: "Vianna Júnior",
                period: "2016 - 2018",
                description: "The Internet Systems course at Faculdades Integradas Vianna Júnior offers all the qualities needed to train professionals capable of standing out in the market. Students will be equipped to create new platforms and applications for smartphones and tablets, as well as to manage and maintain networks, servers, websites, and databases, supported by a virtual library with over 5,000 digitized titles."
            }
        ]
    },
    certificates: {
        title: "Licenses & Certificates",
        items: [
            {
                title: "Building a Reminders App Clone with SwiftUI & Core Data",
                url: "https://www.udemy.com/certificate/UC-883808bb-a2a9-49a3-bff4-987b78d6f063"
            },
            {
                title: "MV Design Pattern in iOS - Build SwiftUI Apps Apple's Way",
                url: "https://www.udemy.com/certificate/UC-2d801ec5-4f59-484c-9956-26aef88d1940"
            },
            {
                title: "MVVM Design Pattern Using Swift",
                url: "https://www.udemy.com/certificate/UC-3fe6e172-7b07-481e-98ef-5362d05886cc"
            },
            {
                title: "The Complete React Native + Hooks Course [2020 Edition]",
                url: "https://www.udemy.com/certificate/UC-d39e7010-e6d8-4694-b2ca-d2ade49a00f2"
            },
            {
                title: "Agile Management With Scrum",
                url: "https://www.udemy.com/certificate/UC-SAH7BYIK/"
            }
        ]
    },
    projects: {
        title: "Projects",
        items: [
            {
                title: "CleanerXcode",
                url: "https://github.com/didisouzacosta/CleanerXcode",
                description: "CleanerXcode is a macOS tool designed to remove unnecessary Xcode files, such as Derived Data, build caches, device support files and simulator data."
            },
            {
                title: "Formidable",
                url: "https://github.com/didisouzacosta/Formidable",
                description: "The Formidable protocol is designed for objects that manage forms composed of multiple FormField components. By conforming to this protocol, you can leverage built-in functionality to validate, reset, and check the validity of all form fields at once."
            },
            {
                title: "Uncompress",
                url: "https://github.com/didisouzacosta/uncompress-react-native",
                description: "Simple library to decompress files .zip, .rar, .cbz, .cbr in React Native."
            }
        ]
    },
    languages: {
        title: "Languages",
        items: [
            {
                label: "English",
                description: "Intermediate (A2)"
            },
            {
                label: "Portuguese",
                description: "Native"
            }
        ]
    }
}