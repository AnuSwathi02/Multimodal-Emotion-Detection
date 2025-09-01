import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const fileBuffer = await req.arrayBuffer();
        
        // Create local uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), "local-uploads");
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // Save file locally
        const filePath = join(uploadsDir, `${id}.mp4`);
        await writeFile(filePath, Buffer.from(fileBuffer));

        return new NextResponse("File uploaded successfully", { status: 200 });
    } catch (error) {
        console.error("Mock upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
