export interface Assessment {
    name: string;
    date: string;
    weight: string;
}

export interface Course {
    course: string;
    topic: string;
    assessments: Assessment[];
}