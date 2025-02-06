interface AreaBaseResponse {
    id: number;
    name: string;
    code: string;
}

export interface AreaStateResponse extends AreaBaseResponse {}
export interface AreaCountryResponse extends AreaBaseResponse {
    stateId: number;
}
export interface AreaSubDistrictResponse extends AreaBaseResponse {
    countyId: number;
}
export interface AreaApartmentResponse extends AreaBaseResponse {
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
}
