import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose';
import shopDetail from '@/models/shopdetails'; // Adjust the import based on your actual model path
import serviceDetail from '@/models/ServiceAvailability'; // Adjust the import based on your actual model path
// import { NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig';
connect()
export async function GET(request:NextRequest,res:NextResponse){
    try {
        const shopData = await shopDetail.find({}); 
        console.log("sopdata",shopData)
        let availabilities: {
            startTime: any; endTime: any; location: any; // Assuming Address field in shopDetail is the location
            date: string; // Example: Use current date or slot date from your data
            carShopOwner: any;
        }[] = [];


        shopData.forEach(shop => {
            shop.slots.forEach((slot: { start: any; end: any; }) => {
                const availability = {
                    startTime: slot.start,
                    endTime: slot.end,
                    location: shop.Address, // Assuming Address field in shopDetail is the location
                    date: new Date().toISOString(), // Example: Use current date or slot date from your data
                    carShopOwner: shop.username, // Assuming email field in shopDetail is the car shop owner
                };
                availabilities.push(availability);
            });
        });
        console.log("availabilities",availabilities)
        // const serviceAvailabilities = await serviceDetail.find({}); 
        await serviceDetail.insertMany(availabilities);
        return NextResponse.json("added")

        // res.status(200).json({ message: 'Data transferred successfully' });
    } catch (error:any) {

    }
};


