import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { weatherAgent, chefAgent } from '../agents';

// Step 1: Get weather information
const getWeatherStep = createStep({
  id: 'get-weather',
  description: 'Get current weather for the specified location',
  inputSchema: z.object({
    location: z.string().describe('The location to get weather for'),
  }),
  outputSchema: z.object({
    weatherInfo: z.string().describe('Weather information'),
  }),
  execute: async ({ inputData }) => {
    const result = await weatherAgent.generate([
      { role: 'user', content: `What's the weather like in ${inputData.location}?` }
    ]);
    
    return {
      weatherInfo: result.text,
    };
  },
});

// Step 2: Get cooking recommendations based on weather
const getCookingAdviceStep = createStep({
  id: 'get-cooking-advice',
  description: 'Get cooking recommendations based on weather conditions',
  inputSchema: z.object({
    weatherInfo: z.string().describe('Weather information'),
    location: z.string().describe('The location'),
  }),
  outputSchema: z.object({
    cookingAdvice: z.string().describe('Cooking recommendations'),
  }),
  execute: async ({ inputData }) => {
    const result = await chefAgent.generate([
      { 
        role: 'user', 
        content: `Based on this weather information: "${inputData.weatherInfo}" in ${inputData.location}, what would you recommend I cook today? Please suggest dishes that would be appropriate for this weather.` 
      }
    ]);
    
    return {
      cookingAdvice: result.text,
    };
  },
});

// Create the workflow
export const weatherToCookingWorkflow = createWorkflow({
  id: 'weather-to-cooking',
  inputSchema: z.object({
    location: z.string().describe('Location to get weather and cooking advice for'),
  }),
  outputSchema: z.object({
    location: z.string(),
    weatherInfo: z.string(),
    cookingAdvice: z.string(),
  }),
})
  .then(getWeatherStep)
  .then(getCookingAdviceStep);

weatherToCookingWorkflow.commit();
