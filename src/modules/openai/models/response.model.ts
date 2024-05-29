import OpenAIApi from 'openai';

export type CountryResponse = {
  countries: CountryDetails[];
};

export type CountryDetails = {
  countryName: string;
  description: string;
  visaRequired: boolean;
};

export type OpenAiResponse =
  | OpenAIApi.Chat.Completions.ChatCompletion
  | OpenAIApi.Chat.Completions.ChatCompletion.Choice[]
  | OpenAIApi.Images.ImagesResponse;
