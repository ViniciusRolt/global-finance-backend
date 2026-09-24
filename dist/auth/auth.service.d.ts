import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, // Banco de dados
    jwtService: JwtService);
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
//# sourceMappingURL=auth.service.d.ts.map