import { DetailsInput } from '../dtos/chat-completion-answer.dto';

export function detailsConstructor({
  countryName,
  interests,
  travelCompanions,
  accommodation,
}: DetailsInput): string {
  const introMessage: string = `User have chosen the following country to visit: ${countryName}. Basing on his interests (${interests}), with whom user will travel (${travelCompanions}), accommodation requirements (${accommodation}) and indicated country, please give 10 resorts/spots/holiday centers/tourist traps the where user can potentially stay being in this country\n.`;
  const additional: string =
    'I want you to give me the response in the following model: Make an array of objects. Each object will be a place/resort. Each object should have the following keys: name (resort name), location (The location of the resort), description (Why namely this resort can suite the user), linkToResortBooking (Link To Resort Booking.com page). Return the answer as a JSON object. The minimum amount of objects should be 10';

  return introMessage + additional;
}
