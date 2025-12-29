import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserByAuthQuery } from '../../../store/api/userApi';
import { Modal, TextInput } from '../../../components';
import { Country, State } from 'country-state-city';
import { FaPlus } from "react-icons/fa6";
import { AddAddressDetails, AddEducationDetails, AddPersonalInfo } from '../../../feature';

const MODAL_COMPONENETS = {
  PERSONAL_INFO: AddPersonalInfo,
  ADDRESS_INFO: AddAddressDetails,
  EDUCATION_INFO: AddEducationDetails,
}

const ProfilePage = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { data, isLoading, isError } = useGetUserByAuthQuery(authUser?.id);
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    props: {}
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const openModal = (type, props = {}) => {
    setModal({
      isOpen: true,
      type: type,
      props: props
    })
  }

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      props: {},
    });
  };

  const ModalComponent = modal.type ? MODAL_COMPONENETS[modal.type] : null
  return (
    <div className="">
      <div className="">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-3">
          <div className="">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-sm opacity-90">Manage your AI project profile</p>
          </div>
          <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full shadow-md">
              <img
                src="https://xsgames.co/randomusers/avatar.php?g=male"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{authUser?.username}</h2>
              <p className="text-gray-600 mt-1">{authUser?.email}</p>
              <p className="text-gray-600 mt-1">{authUser?.mobile}</p>
              <div className="mt-4">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  AI Project Member
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 border-t">
            {data?.data?.description ? (
              <p className="text-gray-700">{data?.data?.description}</p>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 py-4 bg-green-100 border-2 border-green-800 rounded-2xl">
                <span className="text-gray-800 font-bold">Tell something about yourself</span>
                <button
                  className="p-2 border border-gray-400 rounded-full hover:bg-gray-100 transition cursor-pointer"
                >
                  <FaPlus />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Basic Details */}
        <div className="bg-white p-6">
          {data?.data ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="col-span-full">
                <h2 className="text-xl font-semibold text-gray-800">Basic Details</h2>
              </div>
              {[
                { label: 'First name', value: data?.data?.firstName },
                { label: 'Middle name', value: data?.data?.middleName },
                { label: 'Last name', value: data?.data?.lastName },
                { label: 'Gender', value: data?.data?.gender },
                { label: 'Marital status', value: data?.data?.maritalStatus },
                { label: 'Nationality', value: data?.data?.nationality },
                { label: 'Alt. Email', value: data?.data?.nationality },
                { label: 'Alt. Mobile', value: data?.data?.nationality },
                { label: 'Mother name', value: data?.data?.nationality },
                { label: 'Father name', value: data?.data?.nationality },
              ].map((field, index) => (
                <div key={index} className="group">
                  <label className="form-label">
                    {field.label}
                  </label>
                  <TextInput
                    type="text"
                    value={field.value || ""}
                    readOnly
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4 bg-green-100 border-2 border-green-800 rounded-2xl">
              <span className="text-gray-800 font-bold">Add your basic details</span>
              <button
                className="p-2 border border-gray-400 rounded-full hover:bg-gray-100 transition cursor-pointer"
                onClick={() => openModal("PERSONAL_INFO")}
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>

        <div className='p-6'>
          {data?.data?.address ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Address Details</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {[
                  { label: "Locality/House/Building/Block", value: data?.data?.address?.locality },
                  { label: "Country", value: Country.getCountryByCode(data?.data?.address?.country)?.name},
                  { label: "State", value: State.getStateByCodeAndCountry(data?.data?.address?.state, data?.data?.address?.country)?.name},
                  { label: "City", value: data?.data?.address?.city },
                  { label: "Pincode", value: data?.data?.address?.zipcode },
                ].map((field, idx) => (
                  <div key={idx} className="group">
                    <label className="form-label">
                      {field.label}
                    </label>
                    <TextInput
                      type="text"
                      value={field.value || ""}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4 bg-green-100 border-2 border-green-800 rounded-2xl">
              <span className="text-gray-800 font-bold">Add your current address so employers know where you’re based</span>
              <button
                className="p-2 border border-gray-400 rounded-full hover:bg-gray-100 transition cursor-pointer"
                onClick={() => openModal("ADDRESS_INFO")}
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>

        <div className='p-6'>
          {data?.data?.education?.length > 0 ? (
            <h2 className="text-xl font-semibold text-gray-800">Education Details</h2>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4 bg-green-100 border-2 border-green-800 rounded-2xl">
              <span className="text-gray-800 font-bold">Add your educational background and qualifications</span>
              <button 
                className="p-2 border border-gray-400 rounded-full hover:bg-gray-100 transition cursor-pointer"
                onClick={() => openModal("EDUCATION_INFO")}  
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>
        <div className='p-6'>
          {data?.data?.education?.length > 0 ? (
            <h2 className="text-xl font-semibold text-gray-800">Experience Details</h2>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4 bg-green-100 border-2 border-green-800 rounded-2xl">
              <span className="text-gray-800 font-bold">Share your work experience and career journey </span>
              <button className="p-2 border border-gray-400 rounded-full hover:bg-gray-100 transition">
                <FaPlus />
              </button>
            </div>
          )}
        </div>
        <div className='p-6'>
          {data?.data?.education?.length > 0 ? (
            <h2 className="text-xl font-semibold text-gray-800">Certificates Details</h2>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4 bg-green-100 border-2 border-green-800 rounded-2xl">
              <span className="text-gray-800 font-bold">Add certifications and achievements you’ve earned</span>
              <button className="p-2 border border-gray-400 rounded-full hover:bg-gray-100 transition">
                <FaPlus />
              </button>
            </div>
          )}
        </div>
        <div className='p-6'>
          {data?.data?.education?.length > 0 ? (
            <h2 className="text-xl font-semibold text-gray-800">Projects Details</h2>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4 bg-green-100 border-2 border-green-800 rounded-2xl">
              <span className="text-gray-800 font-bold">Showcase the projects you’ve worked on</span>
              <button className="p-2 border border-gray-400 rounded-full hover:bg-gray-100 transition">
                <FaPlus />
              </button>
            </div>
          )}
        </div>
        <div className='p-6'>
          {data?.data?.education?.length > 0 ? (
            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4 bg-green-100 border-2 border-green-800 rounded-2xl">
              <span className="text-gray-800 font-bold">Add the skills that define your expertise</span>
              <button className="p-2 border border-gray-400 rounded-full hover:bg-gray-100 transition">
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={modal.isOpen} size='xl' onClose={closeModal}>
        {ModalComponent && (
          <ModalComponent
            closeModal={closeModal}
            {...modal.props}
          />
        )}
      </Modal>
    </div>
  );
};

export default ProfilePage;
