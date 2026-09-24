import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(data: CreateUserDto): Promise<{
        access_token: string;
        usuario: {
            id: string;
            email: string;
            nome: string;
        };
    }>;
    login(data: LoginDto): Promise<{
        access_token: string;
        usuario: {
            id: string;
            email: string;
            nome: string;
        };
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map