import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();
    const user = await User.findOne({ email });
    const formattedOtp = String(otp).trim();
    const formattedUserOtp = String(user.otp).trim();
    console.log("this is the function for post request of otp",otp)
    console.log("this is the function for post request of otp",user.otp)
    if (user && formattedOtp === formattedUserOtp) {
      user.isVerified = true;
      user.otp = undefined; // Remove the OTP from the database
      await user.save();
      // console.log
      return NextResponse.json({ message: "Email verified successfully." ,success:true});
    } else {
      return NextResponse.json({ message: "Invalid OTP.", success: false });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
