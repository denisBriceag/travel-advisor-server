import { DetailsInput } from '../dtos/chat-completion-answer.dto';

export function detailsConstructor({
  countryName,
  interests,
}: DetailsInput): string {
  const introMessage: string = `User have chosen the following country to visit: ${countryName}. Basing on his interests (${interests}) and indicated country, please give 10 attractions which user can potentially visit being in this country\n.`;
  const additional: string =
    'I want you to give me the response in the following model: Make an array of objects. Each object will be a place. Each object should have the following keys: name, description where you describe why user should visit specifically this place. ticketsRequired flag. Return the answer as a JSON object. The minimum amount of countries should be 10';

  return introMessage + additional;
}
