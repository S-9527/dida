import { INestApplication, ValidationPipe } from "@nestjs/common";

import { HttpExceptionFilter } from "./exception.filter";
import { TransformInterceptor } from "./transfrom.interceptor";

export const appGlobalMiddleware = (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
};
