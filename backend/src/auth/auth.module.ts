import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    forwardRef(() => TokenModule),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
