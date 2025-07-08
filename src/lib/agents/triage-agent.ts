import { Agent , Runner } from "@openai/agents";



// export async function callTriageAgent(userPrompt: string) {
//     const runner = new Runner();
//     const response = await runner.run(triageAgent, userPrompt);
//     return response;
// }   

export async function getRecommendedAgent(systemPrompt: string,userRequest: string) {
    
    const triageAgent = Agent.create({
    name: 'Style Triage Agent',
    instructions: systemPrompt,
})
    const runner = new Runner();
    const result = await runner.run(triageAgent, userRequest);
    return result;
}