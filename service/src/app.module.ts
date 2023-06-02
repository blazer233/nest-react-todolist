import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestLogsModule } from 'nest-logs';
import { TodoModule } from './todo/todo.module';

const databaseLocal: any = {
  host: 'localhost', // 数据库的连接地址host
  username: 'root', // 连接账号
  password: 'root', // 连接密码
  database: 'test_db', // 连接的表名
};
@Module({
  imports: [
    NestLogsModule,
    TypeOrmModule.forRoot({
      ...databaseLocal,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      type: 'mysql',
      port: 3306, // 数据库的端口 3306
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
      // logger: new OrmLogger(),
      synchronize: true, // 是否将实体同步到数据库
      autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
