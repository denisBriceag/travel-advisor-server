import { Injectable } from '@nestjs/common';
import OpenAIApi from 'openai';
import * as process from 'process';
import {
  ChatCompletionAnswerInputDto,
  DalleImageInput,
  DetailsInput,
} from './dtos/chat-completion-answer.dto';
import { requestConstructor } from './utils/request-contructor.util';
import { OpenAiResponse } from './models/response.model';
import { detailsConstructor } from './utils/details-constructor.util';

const SCHEMA_COUNTRUES = {
  countries: {
    countryName: 'Italy',
    description: 'Description',
    visaRequired: true,
    imageUrl: '..image link',
  },
};

const SCHEMA_DETAILS = {
  places: {
    name: 'Italy',
    description: 'Description',
    ticketsRequired: true,
  },
};

@Injectable()
export class OpenaiService {
  private readonly _openapi: OpenAIApi;

  constructor() {
    this._openapi = new OpenAIApi({
      apiKey: process.env.OPEN_AI_SECRET_KEY,
    });
  }

  async getAiModelAnswer(
    input: ChatCompletionAnswerInputDto,
  ): Promise<OpenAiResponse> {
    const content: string = requestConstructor(input);

    try {
      const response = await this._openapi.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Provide output in a valid JSON, The schema should look like this: ${JSON.stringify(SCHEMA_COUNTRUES)}`,
          },
          { role: 'user', content },
        ],
        response_format: { type: 'json_object' },
        model: 'gpt-3.5-turbo',
        temperature: 0.9,
      });

      if (response.choices.length) {
        return response.choices;
      }

      return response;
    } catch (err: unknown) {
      console.log(err);
    }
  }

  async getDetails(input: DetailsInput): Promise<OpenAiResponse> {
    const content: string = detailsConstructor(input);

    try {
      const response = await this._openapi.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Provide output in a valid JSON, The schema should look like this: ${JSON.stringify(SCHEMA_DETAILS)}`,
          },
          { role: 'user', content },
        ],
        response_format: { type: 'json_object' },
        model: 'gpt-3.5-turbo',
        temperature: 0.9,
      });

      if (response.choices.length) {
        return response.choices;
      }

      return response;
    } catch (err: unknown) {
      console.log(err);
    }
  }

  async getImage(input: DalleImageInput): Promise<OpenAiResponse> {
    try {
      return await this._openapi.images.generate({
        model: 'dall-e-3',
        prompt: input.countryName,
        n: 1,
        size: '1792x1024',
        response_format: 'url',
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }
}
