export class Testplan {
    _id?: string;
    name: string;
    description: string;
    projectId: string;
    builds: Array<string>;
    environments: Array<string>;
    platforms: Array<string>;
    testcases: Array<string>;
    startDate?: string;
    endDate?: string;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
