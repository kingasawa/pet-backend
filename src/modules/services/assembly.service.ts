import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs'; // Dùng * để import toàn bộ module
import axios from 'axios';
import { AssemblyAI } from 'assemblyai'; // Import AssemblyAI
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';

const context = 'You are an English teacher, please talk to me so I can practice my listening and speaking skills in English. Also, Please reply concisely, no more than 10 words per sentence and correct me if I make any mistakes.';

@Injectable()
export class AssemblyService {
  constructor(private configService: ConfigService) {}
  async handleAssembly(socket: Socket, blob: Buffer): Promise<void> {
    if (!socket || typeof socket.emit !== 'function') {
      console.error('Invalid socket object');
      return;
    }
    const API_KEY = this.configService.get('OPENAI_API_KEY');
    const ASSEMBLYAI_API_KEY = this.configService.get('ASSEMBLYAI_API_KEY');
    try {
      const fileBuffer = Buffer.from(new Uint8Array(blob));
      const fileName = `${Date.now()}.m4a`;
      const uploadDir = join(process.cwd(), 'public/uploads');
      const filePath = join(uploadDir, fileName);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Created uploads directory:', uploadDir);
      }

      // Lưu file vào thư mục uploads
      fs.writeFile(filePath, fileBuffer, (err) => {
        if (err) {
          console.error('Error saving file:', err);
        } else {
          console.log('File saved successfully:', filePath);
        }
      });

      socket.emit('uploadSuccess', 'upload success');

      // Khởi tạo client AssemblyAI
      const client = new AssemblyAI({
        apiKey: ASSEMBLYAI_API_KEY,
      });

      const FILE_URL = `https://simplecode.online/uploads/${fileName}`;
      console.log('FILE_URL', FILE_URL);

      const data = {
        audio_url: FILE_URL,
      };

      // Xử lý transcript từ AssemblyAI
      const transcript = await client.transcripts.transcribe(data);
      console.log('transcript.text', transcript.text);
      socket.emit('translate', transcript.text);

      // Gọi API OpenAI
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini-2024-07-18',
          messages: [
            { role: 'system', content: context },
            { role: 'user', content: transcript.text },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Response from OpenAI:', response.data.choices);
      socket.emit('bot_chat', response.data.choices[0].message.content);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
        } else {
          console.log('File deleted successfully');
        }
      });
    } catch (error) {
      console.error('Error in AssemblyService:', error);
      socket.emit('error', 'Error processing audio or chat response');
    }
  }
}
