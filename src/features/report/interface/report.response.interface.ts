export interface ReportResponse {
    id: number;
    createdAt: string;
    space: number;
    middle: number;
    elementary: number;
    kindergarten: number;
    barrier: number;
    hill: number;
    layout: number;
    distance: number;
    sound: number;
    underground: number;
    parking: number;
    clean: number;
    playground: number;
    store: number;
    atm: number;
    memo: string | null;
    totalScore: number;
    apartment: {
        id: number;
        name: string;
        code: string;
        type: string | null;
        year: number | null;
        building: number | null;
        households: number | null;
        corridorType: string | null;
        heatType: string | null;
        developer: string | null;
        contractor: string | null;
        size60: number | null;
        size85: number | null;
        size135: number | null;
        size136: number | null;
        address1: string;
        address2: string | null;
    };
}
export interface ReportPaginationResponse {
    reports: ReportResponse[];
    totalCount: number;
    count: number;
    totalPage: number;
    page: number;
}
