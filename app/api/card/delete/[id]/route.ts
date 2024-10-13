import dbConnect from "@/lib/dbConnects";
import Card from "@/model/Card";
import mongoose from "mongoose";
import { NextResponse } from "next/server";





export async function DELETE({ params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "Missing id parameter", message: "Invalid request" }, { status: 400 });
        }
        const oid = new mongoose.Types.ObjectId(id);
        const card = await Card.findByIdAndDelete(oid);
        if (!card) {
            return NextResponse.json({ error: "Card not found", message: "Invalid request" }, { status: 404 });
        }
        return NextResponse.json({ message: "Card deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error, message: "Error deleting card" }, { status: 500 });
    }
}