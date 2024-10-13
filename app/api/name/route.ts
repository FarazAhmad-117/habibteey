import dbConnect from "@/lib/dbConnects";
import Name from "@/model/Name";
import { NextRequest, NextResponse } from "next/server";







// Funtion to create/update both
export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
        const { name } = await req.json();
        if (!name) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
        const nameCard = await Name.findOne();
        if (!nameCard) {
            const newCard = await Name.create({ name });
            return NextResponse.json({ newCard });
        } else {
            await nameCard.updateOne({ name });
            return NextResponse.json({ nameCard });
        }
    } catch (error) {
        return NextResponse.json({ error, message: "Error creating Name" }, { status: 500 });
    }
}


export async function GET() {
    try {
        await dbConnect();
        const nameCard = await Name.findOne();
        if (!nameCard) return NextResponse.json({ error: "No Name found" }, { status: 404 });
        return NextResponse.json({ nameCard });
    } catch (error) {
        return NextResponse.json({ error, message: "Error getting Name" }, { status: 500 });
    }
}





