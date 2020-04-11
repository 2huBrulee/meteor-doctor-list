import Table from 'antd/lib/table'
import React from "react";
import {Doctor} from "../../api/doctors";
import {Specialty} from "/imports/ui/App";

const DoctorTable: React.FC<DoctorTableProps> = ({doctors, specialties}) => {
    const columns = [
        {
            title: 'RUT',
            dataIndex: 'rut',
            key: 'rut',
        },
        {
            title: 'Nombres',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Apellido Paterno',
            dataIndex: 'lastNameF',
            key: 'lastNameF',
        },
        {
            title: 'Apellido Materno',
            dataIndex: 'lastNameM',
            key: 'lastNameM',
        },
        {
            title: 'Especialidad',
            dataIndex: 'specialty',
            key: 'specialty',
            render: (specialtyID: string) => {
                if (specialtyID) {
                    const specialtiesFound = specialties.filter(specialtyInfo => specialtyInfo._id == specialtyID);
                    const specialtyName = specialtiesFound[0]?.name || '';
                    return (
                        <span>{specialtyName}</span>
                    )
                } else {
                    return (<span/>)
                }
            }
        },
    ];


    return (<Table columns={columns} dataSource={doctors}/>)
};

export default DoctorTable;

interface DoctorTableProps {
    doctors: Doctor[];
    specialties: Specialty[]
}

