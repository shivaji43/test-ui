    import { NextRequest, NextResponse } from 'next/server';
    import { getRecommendedAgent } from '@/lib/agents/triage-agent';

    export async function POST(request: NextRequest) {
        try {
            const body = await request.json();
            const { systemPrompt , message } = body;

            if (!message) {
                return NextResponse.json(
                    { error: 'Message is required' },
                    { status: 400 }
                );
            }

            const result = await getRecommendedAgent(systemPrompt, message);
           // console.log(result.finalOutput)

            return NextResponse.json({
                success: true,
                data: result.finalOutput,
                style: result.finalOutput,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Triage agent error:', error);
            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
            );
        }
    }

    export async function GET() {
        return NextResponse.json({
            message: 'Triage Agent API',
            methods: ['POST'],
            description: 'Send a POST request with a message to get triage analysis'
        });
    }