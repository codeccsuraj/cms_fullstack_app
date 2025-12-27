import React from 'react'
import { ButtonInput, SelectInput, TextInput } from '../../../components'
import { useFormik } from 'formik';
import { personalDetailsSchema } from '../userSchema';
import { useAddUserByAuthMutation } from '../../../store/api/userApi';

const AddPersonalInfo = ({closeModal}) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [addUserByAuth, { isLoading, error, isSuccess }] =
        useAddUserByAuthMutation();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            gender: '',
            dob: '',
            nationality: '',
            maritalStatus: '',
            altEmail: '',
            altPhone: '',
            motherName: '',
            fatherName: '',
        },

        validationSchema: personalDetailsSchema,
        onSubmit: async (values) => {
            try {
                const payload = {
                    ...values,
                    authId : user?.id
                }
                const res = await addUserByAuth(payload).unwrap();

                if (res?.success) {
                    closeModal()
                }
            } catch (err) {
                console.error("Error:", err);
            }
        }
    })
    return (
        <div>
            <div className='header mb-4'>
                <p className='text-3xl font-bold text-[#605c21]'>Add your basic details</p>
                <span className='text-sm'>Fill all the fields marked required (<b className='text-red-500'>*</b>)</span>
            </div>
            <form className='grid grid-cols-3 gap-2' onSubmit={formik.handleSubmit}>
                <div className=''>
                    <label htmlFor="firstName">First name</label>
                    <TextInput
                        type='text'
                        name="firstName"
                        placeholder='enter your valid first name'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.firstName}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="middleName">Middle name</label>
                    <TextInput
                        type='text'
                        name='middleName'
                        placeholder='enter your valid middle name'
                        value={formik.values.middleName}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.middleName && formik.errors.middleName && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.middleName}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="lastName">Last name</label>
                    <TextInput
                        type='text'
                        name='lastName'
                        placeholder='enter your valid last name'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.lastName}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="dob">Date of birth</label>
                    <TextInput
                        type='date'
                        name='dob'
                        placeholder='enter your date of birth'
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.dob && formik.errors.dob && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.dob}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="gender">Gender</label>
                    <SelectInput
                        options={
                            [
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Not preferred to answer' }
                            ]
                        }
                        value={formik.values.gender}
                        onChange={(val) => formik.setFieldValue("gender", val)}
                    />
                    {formik.touched.gender && formik.errors.gender && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.gender}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="">Marital status</label>
                    <SelectInput
                        options={[
                            { value: "single", label: "Single" },
                            { value: "married", label: "Married" },
                            { value: "divorced", label: "Divorced" },
                            { value: "widowed", label: "Widowed" },
                            { value: "separated", label: "Separated" },
                            { value: "other", label: "Other" },
                        ]}
                        value={formik.values.maritalStatus}
                        onChange={(val) => formik.setFieldValue("maritalStatus", val)}
                    />
                    {formik.touched.maritalStatus && formik.errors.maritalStatus && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.maritalStatus}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="">Nationality</label>
                    <SelectInput
                        options={[
                            { value: "indian", label: "Indian" },
                            { value: "american", label: "American" },
                            { value: "british", label: "British" },
                            { value: "canadian", label: "Canadian" },
                            { value: "australian", label: "Australian" },
                            { value: "german", label: "German" },
                            { value: "french", label: "French" },
                            { value: "japanese", label: "Japanese" },
                            { value: "chinese", label: "Chinese" },
                            { value: "other", label: "Other" },
                        ]}
                        value={formik.values.nationality}
                        onChange={(val) => formik.setFieldValue("nationality", val)}
                    />
                    {formik.touched.nationality && formik.errors.nationality && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.nationality}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="altEmail">Alternate email</label>
                    <TextInput
                        type='text'
                        name='altEmail'
                        placeholder='enter your alternate contact email'
                        value={formik.values.altEmail}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.altEmail && formik.errors.altEmail && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.altEmail}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="">Alternate phone</label>
                    <TextInput
                        type='text'
                        name='altPhone'
                        placeholder='enter your alternate contact phone'
                        value={formik.values.altPhone}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.altPhone && formik.errors.altPhone && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.altPhone}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="">Mother name</label>
                    <TextInput
                        type='text'
                        name='motherName'
                        placeholder='enter your mother name'
                        value={formik.values.motherName}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.motherName && formik.errors.motherName && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.motherName}
                        </p>
                    )}
                </div>
                <div className=''>
                    <label htmlFor="">Father name</label>
                    <TextInput
                        type='text'
                        name='fatherName'
                        placeholder='enter your father name'
                        value={formik.values.fatherName}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.fatherName && formik.errors.fatherName && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.fatherName}
                        </p>
                    )}
                </div>
                <div className='col-span-full flex justify-end'>
                    <ButtonInput
                        type='submit'
                        label='Save changes'
                        loading={isLoading}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddPersonalInfo
