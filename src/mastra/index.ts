import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { weatherWorkflow } from './workflows';
import { weatherToCookingWorkflow } from './workflows/weather-cooking';
import { weatherAgent, chefAgent } from './agents';

export const mastra = new Mastra({
  workflows: { weatherWorkflow, weatherToCookingWorkflow },
  agents: { weatherAgent, chefAgent },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
