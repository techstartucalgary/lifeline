export interface Assessment {
    name: string;
    date: string;
    weight: string;
}

export interface Course {
    name: string;
    topic: string;
    assessments: Assessment[];
}