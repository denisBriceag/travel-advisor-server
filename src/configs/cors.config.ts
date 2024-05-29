import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000', // Specify the front-end URL
  credentials: true, // Enable reading cookies from the request
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  maxAge: 24 * 60 * 60 * 5, // Set the maximum age of preflight requests to 5 days
};
