'use client'
import React, { useState, useEffect } from 'react';
import NavbarOwner from '../../components/Navbar/NavbarOwner';
import axios from 'axios';

export default function ProfilePage() {
    const [details, setDetails] = useState({
        shopName: '',
        address: '',
        ownerId: '',
        operatingHours: '',
        contactInfo: '',
        isApproved: false,
    });

    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isDetails, setIsDetails] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const response = await axios.get('/api/users/approveShop');
                const shopDetails = response.data.data[0];
                
                if (shopDetails) {
                    setDetails(shopDetails);
                    setIsApproved(shopDetails.isApproved);
                    setIsDetails(true);
                } else {
                    setIsDetails(false);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching shop details:', error);
                setStatusMessage('Error fetching shop details');
                setIsLoading(false);
            }
        };

        fetchShopDetails();
    }, []);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/approveShop', details);
            console.log('Response from shop details update:', response);
            setStatusMessage('Details submitted successfully!');
        } catch (error) {
            setStatusMessage('An error occurred while submitting details');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <NavbarOwner />
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                    {isDetails && isApproved ? (
                        <>
                            <p className="text-green-500 mb-4">
                                Your shop details have been approved!Now you can update your details from here!
                            </p>
                            <div className="border-t pt-4">
                                <h1 className="text-3xl font-bold mb-6">Update Shop Details</h1>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-700">Shop Name:</label>
                                        <input
                                            type="text"
                                            name="shopName"
                                            value={details.shopName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Address:</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={details.address}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Owner's ID:</label>
                                        <input
                                            type="text"
                                            name="ownerId"
                                            value={details.ownerId}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Operating Hours:</label>
                                        <input
                                            type="text"
                                            name="operatingHours"
                                            value={details.operatingHours}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Contact Information:</label>
                                        <input
                                            type="text"
                                            name="contactInfo"
                                            value={details.contactInfo}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                                    >
                                        Update Details
                                    </button>
                                </form>
                                {statusMessage && <p className="mt-4 text-green-500">{statusMessage}</p>}
                            </div>
                        </>
                    ) : (
                        <p className="text-red-500 bg-red-100 border border-red-500 rounded-md px-4 py-3 mb-4">
                            {!isDetails
                                ? 'Shop details not found. Please check again later.'
                                : 'You have to wait until the admin approves your shop details.'}
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}
