import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DoctorTable from "/imports/ui/components/DoctorTable";
import 'antd/dist/antd.css';
import DoctorForm from "/imports/ui/components/DoctorForm";
import {useTracker} from 'meteor/react-meteor-data';
import {Doctor, DoctorsCollection} from "../api/doctors";

const url = 'https://gist.githubusercontent.com/rodcisal/ef7839215d8d17ff9cf07b19e5e7593d/raw/718370f384f8dbcff1548933df45ea3394a223d3/especialidadesMedicas.json';

export interface Specialty {
    _id: string,
    name: string
}


export const App: React.FunctionComponent = () => {
    const doctors: Doctor[] = useTracker(() => DoctorsCollection.find().fetch(), []);
    const [specialties, setSpecialties] = useState<Specialty[]>([])
    const addDoctor = (doctor:Doctor) => DoctorsCollection.insert(doctor);

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(url);
                const specialties: Specialty[] = result.data.filter((specialty: any) => specialty._id).map((specialty: any) => ({
                    _id: specialty._id,
                    name: specialty.nombre
                }));
                setSpecialties(specialties);

            } catch (error) {
                console.log(error);
            }
        })();
    }, []);



    return (<div className="container">
        <h1>Doctod - Lista de Medicos</h1>
        <DoctorForm addDoctor={addDoctor} specialties={specialties}/>
        <DoctorTable doctors={doctors} specialties={specialties}/>
    </div>)
};
