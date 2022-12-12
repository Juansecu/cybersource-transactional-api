/* --- Third-party libraries --- */
import { Module } from '@nestjs/common';

/* --- Services --- */
import { CybersourceService } from './cybersource.service';

@Module({
  providers: [CybersourceService],
  exports: [CybersourceService]
})
export class CybersourceModule {}
