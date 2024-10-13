import dbConnect from "@/lib/dbConnects";
import Card from "@/model/Card";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";





export async function PUT(req:NextRequest, {params}:{params:{id:string}}){
    try {
        await dbConnect();
        const { frontText, backText, backTitle } = await req.json();
        if(!frontText || !backText || !backTitle){
            return NextResponse.json({ error:"All fields are required"},{status:400});
        }
        const {id} = params;
        if(!id){
            return NextResponse.json({error: "Missing id parameter", message: "Invalid request"},{status: 400});
        }
        const oid = new mongoose.Types.ObjectId(id);
        const card = await Card.findByIdAndUpdate(oid,{
            frontText,
            backText,
            backTitle,
        },{new : true});
        if(!card){
            return NextResponse.json({error: "Card not found", message: "Invalid request"},{status: 404});
        }
        return NextResponse.json({message: "Card updated successfully", card});
    } catch (error) {
        return NextResponse.json({error: error, message: "Error updating card"},{status: 500});
    }
}