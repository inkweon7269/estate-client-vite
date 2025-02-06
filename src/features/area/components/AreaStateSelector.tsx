import { useEffect, useState } from 'react';

import { useAreaApartmentQuery } from '@/features/area/hooks/useAreaApartmentQuery.ts';
import { useAreaCountyQuery } from '@/features/area/hooks/useAreaCountyQuery.ts';
import { useAreaStateQuery } from '@/features/area/hooks/useAreaStateQuery.ts';
import { useAreaSubDistrictQuery } from '@/features/area/hooks/useAreaSubDistrictQuery.ts';
import { Select } from 'antd';

const AreaStateSelector = () => {
    const [stateId, setStateId] = useState<number | null>(null);
    const [countyId, setCountyId] = useState<number | null>(null);
    const [subDistrictId, setSubDistrictId] = useState<number | null>(null);
    const [apartmentId, setApartmentId] = useState<number | null>(null);

    const { data: states = [] } = useAreaStateQuery();
    const { data: counties = [] } = useAreaCountyQuery(stateId);
    const { data: subDistricts = [] } = useAreaSubDistrictQuery({ stateId, countyId });
    const { data: apartments = [] } = useAreaApartmentQuery({ stateId, countyId, subDistrictId });

    useEffect(() => {
        setCountyId(null);
        setSubDistrictId(null);
        setApartmentId(null);
    }, [stateId]);

    useEffect(() => {
        setSubDistrictId(null);
        setApartmentId(null);
    }, [countyId]);

    useEffect(() => {
        setApartmentId(null);
    }, [subDistrictId]);

    const handleStateChange = (value: number) => setStateId(value);
    const handleCountyChange = (value: number) => setCountyId(value);
    const handleSubDistrictChange = (value: number) => setSubDistrictId(value);
    const handleApartmentChange = (value: number) => setApartmentId(value);

    return (
        <>
            <Select
                options={states.map((state) => ({ value: state.id, label: state.name }))}
                style={{ width: 150 }}
                onChange={handleStateChange}
                value={stateId ?? undefined}
            />
            <Select
                options={counties.map((county) => ({ value: county.id, label: county.name }))}
                style={{ width: 150 }}
                onChange={handleCountyChange}
                disabled={!stateId}
                value={countyId ?? undefined}
            />
            <Select
                options={subDistricts.map((subDistrict) => ({ value: subDistrict.id, label: subDistrict.name }))}
                style={{ width: 150 }}
                onChange={handleSubDistrictChange}
                disabled={!countyId}
                value={subDistrictId ?? undefined}
            />
            <Select
                options={apartments.map((apartment) => ({ value: apartment.id, label: apartment.name }))}
                style={{ width: 150 }}
                onChange={handleApartmentChange}
                disabled={!subDistrictId}
                value={apartmentId ?? undefined}
            />
        </>
    );
};

export default AreaStateSelector;
