import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './services/api/src/authAPI/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('env')
  getEnvData(): string {
    return this.appService.getEnvData();
  }

}
