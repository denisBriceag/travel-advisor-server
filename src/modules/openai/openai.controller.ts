import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ChatCompletionAnswerInputDto,
  DalleImageInput,
} from './dtos/chat-completion-answer.dto';
import { OpenaiService } from './openai.service';
import { OpenAiResponse } from './models/response.model';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly _service: OpenaiService) {}

  @Post('/message')
  @UsePipes(ValidationPipe)
  getModelAnswer(
    @Body(new ValidationPipe({ transform: true }))
    data: ChatCompletionAnswerInputDto,
  ): Promise<OpenAiResponse> {
    return this._service.getAiModelAnswer(data);
  }

  @Post('/image')
  @UsePipes(ValidationPipe)
  getModelImage(
    @Body(new ValidationPipe({ transform: true }))
    data: DalleImageInput,
  ): Promise<OpenAiResponse> {
    return this._service.getImage(data);
  }
}
