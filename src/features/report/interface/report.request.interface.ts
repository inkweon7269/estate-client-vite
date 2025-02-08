export interface PaginationRequest {
    page: number;
    limit: number;
}

export interface CreateReportRequest {
    apartmentId: number;
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
    memo?: string;
}

export interface UpdateReportRequest extends CreateReportRequest {}
