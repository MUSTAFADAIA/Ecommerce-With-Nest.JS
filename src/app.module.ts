import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb+srv://mustafa3:HQoSAkO7FGa1A81C@cluster0.tigmoa7.mongodb.net/ecommerceN?retryWrites=true&w=majority"),
    JwtModule.register({
      global: true,
      secret:process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
