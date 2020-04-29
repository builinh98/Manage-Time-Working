import { Module } from "@nestjs/common"
import { CheckinsModule } from "./checkins/checkins.module"
import { CheckoutsModule } from "./checkouts/checkouts.module"

@Module({
  imports: [
    CheckinsModule,
    CheckoutsModule,
  ],
})
export class AdminModule {}