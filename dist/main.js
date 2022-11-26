"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const body_parser_1 = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use((0, body_parser_1.json)({ limit: '50mb' }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SurtiLed')
        .setDescription('SurtiLed API description')
        .setVersion('1.0')
        .addTag('APIs')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map