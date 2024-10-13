import dbConnect from "@/lib/dbConnects";
import Card from "@/model/Card";
import { NextRequest, NextResponse } from "next/server";





export async function POST(req:NextRequest){
    try {
        await dbConnect();
        const { frontText, backText, backTitle } = await req.json();
        if(!frontText || !backText || !backTitle){
            return NextResponse.json({ error:"All fields are required"},{status:400});
        }
        const newCard = await Card.create({ frontText, backText, backTitle });
        if(!newCard){
            return NextResponse.json({ error:"Error creating card"},{status:400});
        }
        return NextResponse.json(newCard);
    } catch (error) {
        return NextResponse.json({ error: error, message: "Internal Server Error" }, {status: 500});
    }
}

