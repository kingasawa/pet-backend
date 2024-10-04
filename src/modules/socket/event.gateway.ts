import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect, MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AssemblyService } from '@modules/services/assembly.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventGateway');
  constructor(private readonly assemblyService: AssemblyService) {}

  afterInit(server: Server) {
    this.logger.log('Socket.IO Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('uploadFile')
  // async handleUploadAudio(@MessageBody() blob: Buffer, client: Socket): Promise<void> {
  //   console.log('Client object:', client); // In ra đối tượng client để kiểm tra
  //   await this.assemblyService.handleAssembly(client, blob);
  // }
  async handleUploadAudio(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { blob } = data;
    await this.assemblyService.handleAssembly(client, blob);
  }
}
