import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { instruction } = body;

        if (!instruction) {
            return NextResponse.json(
                { error: 'Instruction is required' },
                { status: 400 }
            );
        }

        // Process the instruction here
        // You can add your agent logic here
        
        return NextResponse.json({
            message: 'Instruction received successfully',
            instruction: instruction
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}