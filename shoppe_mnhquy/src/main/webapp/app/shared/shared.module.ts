import { NgModule } from '@angular/core';
import { TimekeeperSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [TimekeeperSharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [TimekeeperSharedLibsModule, FindLanguageFromKeyPipe, JhiLoginModalComponent, HasAnyAuthorityDirective]
})
export class TimekeeperSharedModule {}
