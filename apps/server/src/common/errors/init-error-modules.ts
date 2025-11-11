// src/common/errors/init-errors.ts

import { errorMapper } from "./config/error-mapper";
import { PaginationErrorModule } from "./modules/pagination-error-module";
import { ProductErrorModule } from "./modules/product-error-module";

errorMapper.registerModule(PaginationErrorModule);
errorMapper.registerModule(ProductErrorModule);
