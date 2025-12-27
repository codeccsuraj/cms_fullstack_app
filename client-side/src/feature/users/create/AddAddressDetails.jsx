import React, { useMemo } from 'react'
import { ButtonInput, SelectInput, TextInput } from '../../../components'
import { useFormik } from 'formik';
import { Country, State, City } from 'country-state-city';

const AddAddressDetails = () => {
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
            isActive: false,
        },
        onSubmit: async (values) => {
            try {
                const payload = {
                    ...values,
                    authId: user?.id
                }
                console.log("Payload to submit:", payload);
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
                <p className='text-3xl font-bold text-[#605c21]'>Add your address details</p>
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
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <SelectInput
                        options={countryOptions}
                        value={formik.values.country}
                        onChange={(val) => formik.setFieldValue("country", val)}
                    />
                </div>

                <div>
                    <label htmlFor="state">State</label>
                    <SelectInput
                        options={stateOptions}
                        value={formik.values.state}
                        onChange={(val) => formik.setFieldValue("state", val)}
                    />
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <SelectInput
                        options={cityOptions}
                        value={formik.values.city}
                        onChange={(val) => formik.setFieldValue("city", val)}
                    />
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
                </div>

                <div>
                    <label htmlFor="livingFrom">Living From</label>
                    <TextInput
                        type='date'
                        name='livingFrom'
                        value={formik.values.livingFrom}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="col-span-full">
                    <label>
                        <input
                            type="checkbox"
                            checked={formik.values.isActive}
                            onChange={(e) => formik.setFieldValue("isActive", e.target.checked)}
                        />{' '}
                        I am currently residing here
                    </label>
                </div>

                <div className='col-span-full flex justify-end'>
                    <ButtonInput type='submit' label='Save changes' />
                </div>
            </form>
        </div>
    );
}

export default AddAddressDetails;
