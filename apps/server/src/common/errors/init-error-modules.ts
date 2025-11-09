// src/common/errors/init-errors.ts

import { errorMapper } from "./config/error-mapper";
import { PaginationErrorModule } from "./modules/pagination-error-module";

errorMapper.registerModule(PaginationErrorModule);
