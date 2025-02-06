import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import { Express } from 'express';

export default (app: Express): void => {
  // Carrega o arquivo YAML de documentação
  const fileContents = fs.readFileSync('./docs/api-docs.yaml', 'utf8');
  const swaggerDocument = yaml.load(fileContents) as Record<string, any>;

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
