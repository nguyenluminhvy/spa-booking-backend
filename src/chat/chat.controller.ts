import { Body, Controller, Post, Req } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('get-or-create')
  async getOrCreateConversation(@Req() req) {
    const userId = req.user.sub;

    return this.chatService.getOrCreateConversation(userId);
  }

  @Post('update-last-message')
  async updateLastMessage(@Body() body: any) {
    const { conversationId, content, senderId } = body;

    return this.chatService.updateLastMessage(
      conversationId,
      content,
      senderId,
    );
  }

  @Post('claim-conversation')
  async claimConversation(@Body() body: any) {
    const { conversationId, staffId } = body;

    return this.chatService.claimConversation(conversationId, staffId);
  }
}
