import { useEffect } from 'react';

import { useAreaApartmentQuery } from '@/features/area/hooks/useAreaApartmentQuery';
import { useAreaCountyQuery } from '@/features/area/hooks/useAreaCountyQuery';
import { useAreaStateQuery } from '@/features/area/hooks/useAreaStateQuery';
import { useAreaSubDistrictQuery } from '@/features/area/hooks/useAreaSubDistrictQuery';
import { Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
    stateId: number | null;
    countyId: number | null;
    subDistrictId: number | null;
    apartmentId: number | null;
};

const AreaStateSelector = () => {
    const { control, watch, setValue } = useForm<FormValues>({
        defaultValues: {
            stateId: null,
            countyId: null,
            subDistrictId: null,
            apartmentId: null,
        },
    });

    const stateId = watch('stateId');
    const countyId = watch('countyId');
    const subDistrictId = watch('subDistrictId');

    // 선택에 따라 하위 값 초기화
    useEffect(() => {
        setValue('countyId', null);
        setValue('subDistrictId', null);
        setValue('apartmentId', null);
    }, [stateId]);

    useEffect(() => {
        setValue('subDistrictId', null);
        setValue('apartmentId', null);
    }, [countyId]);

    useEffect(() => {
        setValue('apartmentId', null);
    }, [subDistrictId]);

    const { data: states = [] } = useAreaStateQuery();
    const { data: counties = [] } = useAreaCountyQuery(stateId);
    const { data: subDistricts = [] } = useAreaSubDistrictQuery({ stateId, countyId });
    const { data: apartments = [] } = useAreaApartmentQuery({ stateId, countyId, subDistrictId });

    return (
        <>
            <Controller
                name='stateId'
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={states.map((state) => ({ value: state.id, label: state.name }))}
                        style={{ width: 150 }}
                        placeholder='State'
                    />
                )}
            />
            <Controller
                name='countyId'
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={counties.map((county) => ({ value: county.id, label: county.name }))}
                        style={{ width: 150 }}
                        placeholder='County'
                        disabled={!stateId}
                    />
                )}
            />
            <Controller
                name='subDistrictId'
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={subDistricts.map((subDistrict) => ({
                            value: subDistrict.id,
                            label: subDistrict.name,
                        }))}
                        style={{ width: 150 }}
                        placeholder='Sub District'
                        disabled={!countyId}
                    />
                )}
            />
            <Controller
                name='apartmentId'
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={apartments.map((apartment) => ({ value: apartment.id, label: apartment.name }))}
                        style={{ width: 150 }}
                        placeholder='Apartment'
                        disabled={!subDistrictId}
                    />
                )}
            />
        </>
    );
};

export default AreaStateSelector;
