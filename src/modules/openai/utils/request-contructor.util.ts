import { ChatCompletionAnswerInputDto } from '../dtos/chat-completion-answer.dto';
import { TravelCompanions } from '../models/request.model';

export function requestConstructor(
  userInput: ChatCompletionAnswerInputDto,
): string {
  const {
    budgetFrom,
    budgetTo,
    nationality,
    climate,
    interests,
    travelDuration,
    accommodation,
    travelCompanions,
    languagePreferences,
    dietaryPreferences,
    mobilityRequirements,
    travelExperience,
    notes,
  } = userInput;
  const introMessage: string = `I want you to make a list of top 20 countries to visit based on input I will provide bellow.\nMy budget starts form ${budgetFrom} to ${budgetTo}.\n`;
  const budget: string = `My budget starts form ${budgetFrom} to ${budgetTo}.\n`;
  const national: string = `My nationality is ${nationality}. Please specify if I need visa to travel in country ypu will mention.\n`;
  const climat: string = `I prefer ${climate} climate.\n`;
  const interest: string = `My interests are: ${interests}.\n`;
  const duration: string = `I am planning to stay for  ${travelDuration}.\n`;
  const placeToStay: string = `I am planning to stay at${accommodation}.\n`;
  const companions: (cmp: TravelCompanions) => string = (cmp) => {
    switch (cmp) {
      case TravelCompanions.Solo:
        return 'I will travel by myself.\n';
      case TravelCompanions.Couple:
        return 'I will with my partner.\n';
      case TravelCompanions.FamilyWithKids:
        return 'I will travel with my family and kids.\n';
      case TravelCompanions.GroupOfFriends:
        return 'I will travel with my friends.\n';
      default:
        return 'I will travel by myself.\n';
    }
  };
  const lang: string = `Preferable language is ${languagePreferences}.\n`;
  const dieta: string = `My dietary preferences are: ${dietaryPreferences}.\n`;
  const mobility: string = `My mobility requirements are: ${mobilityRequirements}.\n`;
  const travelExp: string = `I am ${travelExperience}.\n`;
  const note: string = `Some additional notes are: ${notes}.\n`;
  const additional: string =
    'I want you to give me the response in the following model: Make an array of objects. Each object will be a country. Each object should have the following keys: countryName, description where you describe why namely this country suites the user. requireVisa flag, imageSrc with the link to a beautiful image. Return the answer as a JSON object.';

  return (
    introMessage +
    budget +
    national +
    climat +
    interest +
    duration +
    placeToStay +
    companions(travelCompanions) +
    lang +
    dieta +
    mobility +
    travelExp +
    note +
    additional
  );
}
