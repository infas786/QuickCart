import connectDB from "@/config/db"
import Address from "@/models/Address"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { address } = await request.json()

    await connectDB()
    const newAddress = await Address.create({ 
      ...address, 
      userId: userId 
    })

    return NextResponse.json({ 
      success: true, 
      message: "Address added successfully", 
      newAddress 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}