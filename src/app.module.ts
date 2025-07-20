import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://mustafa3:HQoSAkO7FGa1A81C@cluster0.tigmoa7.mongodb.net/ecommerceN?retryWrites=true&w=majority"),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
