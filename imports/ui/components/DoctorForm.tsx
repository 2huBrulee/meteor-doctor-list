import React from "react";
import {useForm, Controller} from 'react-hook-form';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import {Doctor} from "/imports/api/doctors";
import {Specialty} from "/imports/ui/App";
import {validate} from 'rut.js';


const DoctorForm: React.FC<DoctorFormProps> = ({specialties, addDoctor}) => {
    const {handleSubmit, control, errors, reset} = useForm();
    const onSubmit = (data: any) => {
        addDoctor(data as Doctor);
        reset({name: "", rut: "", lastNameF: "", lastNameM: "", specialty: ""});
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Item label="RUT" validateStatus={!!errors.rut ? "error" : ""}
                       help={!!errors.rut ? errors.rut.message : ""}>
                <Controller
                    as={Input}
                    name="rut"
                    control={control}
                    type="text"
                    rules={{
                        required: REQUIRED_FIELD_ERROR,
                        validate: value => validate(value) || RUT_INVALID_ERROR
                    }}
                />
            </Form.Item>

            <Form.Item label="Nombres" validateStatus={!!errors.name ? "error" : ""}
                       help={!!errors.name ? errors.name.message : ""}>
                <Controller
                    as={Input}
                    name="name"
                    control={control}
                    type="text"
                    rules={{
                        required: REQUIRED_FIELD_ERROR,
                        maxLength: {value: MAX_LENGTH, message: MAX_LENGTH_ERROR}
                    }}
                />
            </Form.Item>

            <Form.Item label="Apellido Paterno" validateStatus={!!errors.lastNameF ? "error" : ""}
                       help={!!errors.lastNameF ? errors.lastNameF.message : ""}>
                <Controller
                    as={Input}
                    name="lastNameF"
                    control={control}
                    type="text"
                    rules={{
                        required: REQUIRED_FIELD_ERROR,
                        maxLength: {value: MAX_LENGTH, message: MAX_LENGTH_ERROR}
                    }}
                />
            </Form.Item>

            <Form.Item label="Apellido Materno" validateStatus={!!errors.lastNameM ? "error" : ""}
                       help={!!errors.lastNameM ? errors.lastNameM.message : ""}>
                <Controller
                    as={Input}
                    name="lastNameM"
                    control={control}
                    type="text"
                    rules={{
                        required: REQUIRED_FIELD_ERROR,
                        maxLength: {value: MAX_LENGTH, message: MAX_LENGTH_ERROR}
                    }}
                />
            </Form.Item>

            <Form.Item label="Especialidad" validateStatus={!!errors.specialty ? "error" : ""}
                       help={!!errors.specialty ? errors.specialty.message : ""}>
                <Controller
                    as={
                        <Select
                            defaultValue=""
                            placeholder="Elija una especialidad"
                        >
                            {specialties.map((specialty: Specialty) => (
                                <Select.Option key={specialty._id}
                                               value={specialty._id}>{specialty.name}</Select.Option>
                            ))}
                        </Select>}
                    control={control}
                    rules={{required: REQUIRED_FIELD_ERROR}}
                    name="specialty"/>

            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Ingresar
                </Button>
            </Form.Item>
        </form>
    )
};

export default DoctorForm;

interface DoctorFormProps {
    addDoctor: (doctor: Doctor) => void;
    specialties: Specialty[];
}

const MAX_LENGTH = 20;
const REQUIRED_FIELD_ERROR = 'Debes llenar este campo';
const RUT_INVALID_ERROR = 'RUT Invalido';
const MAX_LENGTH_ERROR = 'Maximo de ' + MAX_LENGTH + ' caracteres';
