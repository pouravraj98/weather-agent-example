import { openai } from "@ai-sdk/openai";
import { Agent } from '@mastra/core/agent';
import { weatherTool } from '../tools';

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      You are a helpful assistant that follow the instructions given 
      Your primary function is to help 
      - You follow the instructions 
      - process the request
      - do not do things out side the tools provided
      - use tools to do things mentioned
`,
  model: openai('gpt-4o-mini'),
  tools: { weatherTool },
});
