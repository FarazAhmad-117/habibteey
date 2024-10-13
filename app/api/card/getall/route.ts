import dbConnect from "@/lib/dbConnects";
import Card from "@/model/Card";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req:NextRequest){
    try {
        await dbConnect();
        const cards = await Card.find();
        return NextResponse.json({cards});
    } catch (error) {
        return NextResponse.json({ error, message:"Error getting cards"}, {status: 500});
    }
} 








