import React, { useMemo } from 'react'
import { ButtonInput, SelectInput, TextInput } from '../../../components'
import { useFormik } from 'formik';
import { Country, State, City } from 'country-state-city';
import { addAddressSchemaValidation } from '../userSchema';
import { useUpdateAddressMutation } from '../../../store/api/userApi';

const AddEducationDetails = ({closeModal}) => {
    const [updateAddress, {isLoading}] = useUpdateAddressMutation()
    const user = JSON.parse(localStorage.getItem("user"));

    const formik = useFormik({
        initialValues: {
            locality: '',
            country: '',
            state: '',
            city: '',
            zipcode: '',
            livingFrom: '',
            livingType: '',
            isActive: true,
        },
        validationSchema: addAddressSchemaValidation,
        onSubmit: async (values) => {
            try {
                const result = await updateAddress({
                    authId : user?.id, 
                    data : values}).unwrap();

                if (result?.success) {
                    closeModal();
                }
                console.log("Payload to submit:", result);
            } catch (err) {
                console.error("Error:", err);
            }
        }
    });

    const countryOptions = useMemo(
        () =>
            Country.getAllCountries().map((c) => ({
                label: c.name,
                value: c.isoCode,
            })),
        []
    );

    const stateOptions = useMemo(() => {
        if (!formik.values.country) return [];
        return State.getStatesOfCountry(formik.values.country).map((s) => ({
            label: s.name,
            value: s.isoCode,
        }));
    }, [formik.values.country]);

    const cityOptions = useMemo(() => {
        if (!formik.values.country || !formik.values.state) return [];
        return City.getCitiesOfState(formik.values.country, formik.values.state).map((c) => ({
            label: c.name,
            value: c.name,
        }));
    }, [formik.values.country, formik.values.state]);

    return (
        <div>
            <div className='header mb-4'>
                <p className='text-3xl font-bold text-[#605c21]'>Add your education & qualification details</p>
                <span className='text-sm'>
                    Fill all the fields marked required (<b className='text-red-500'>*</b>)
                </span>
            </div>

            <form className='grid grid-cols-2 gap-4' onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="locality">Locality</label>
                    <TextInput
                        type='text'
                        name="locality"
                        placeholder='Enter your Hno/Block/Area'
                        value={formik.values.locality}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.locality && formik.errors.locality && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.locality}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <SelectInput
                        options={countryOptions}
                        value={formik.values.country}
                        onChange={(val) => formik.setFieldValue("country", val)}
                    />
                    {formik.touched.country && formik.errors.country && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.country}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="state">State</label>
                    <SelectInput
                        options={stateOptions}
                        value={formik.values.state}
                        onChange={(val) => formik.setFieldValue("state", val)}
                    />
                    {formik.touched.state && formik.errors.state && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.state}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <SelectInput
                        options={cityOptions}
                        value={formik.values.city}
                        onChange={(val) => formik.setFieldValue("city", val)}
                    />
                    {formik.touched.city && formik.errors.city && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.city}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="zipcode">Pincode</label>
                    <TextInput
                        type='text'
                        name='zipcode'
                        placeholder='Enter your area pincode'
                        value={formik.values.zipcode}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.zipcode && formik.errors.zipcode && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.zipcode}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="livingType">Living Type</label>
                    <SelectInput
                        options={[
                            { value: "owned", label: "Owned" },
                            { value: "rented", label: "Rented" },
                            { value: "pg", label: "PG / Paying Guest" },
                            { value: "company_provided", label: "Company Provided" },
                        ]}
                        value={formik.values.livingType}
                        onChange={(val) => formik.setFieldValue("livingType", val)}
                    />
                    {formik.touched.livingType && formik.errors.livingType && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.livingType}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="livingFrom">Living From</label>
                    <TextInput
                        type='date'
                        name='livingFrom'
                        value={formik.values.livingFrom}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.livingFrom && formik.errors.livingFrom && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.livingFrom}
                        </p>
                    )}
                </div>

                <div className='col-span-full flex justify-end'>
                    <ButtonInput type='submit' label='Save changes' />
                </div>
            </form>
        </div>
    );
}

export default AddEducationDetails;
