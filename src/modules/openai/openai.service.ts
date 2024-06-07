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
    name: 'Resort name...',
    location: 'Resort Location',
    description: 'description',
    linkToResortBooking: 'Link To Resort Booking.com page',
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
        size: '1024x1024',
        response_format: 'url',
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  getCountries(): { countries: string[] } {
    return {
      countries: [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Comoros',
        'Democratic Republic of the Congo',
        'Republic of the Congo',
        'Costa Rica',
        'Croatia',
        'Cuba',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'East Timor',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Eswatini',
        'Ethiopia',
        'Fiji',
        'Finland',
        'France',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Greece',
        'Grenada',
        'Guatemala',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Ivory Coast',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'North Korea',
        'South Korea',
        'Kosovo',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North Macedonia',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Qatar',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Togo',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City',
        'Venezuela',
        'Vietnam',
        'Yemen',
        'Zambia',
        'Zimbabwe',
      ],
    };
  }
}
