import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import { FooterComponent } from './components/footer/footer.component';

// servicios

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CallbackComponent } from './callback/callback.component';
import { RecetaTarjetaComponent } from './components/recetas/receta-tarjeta.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FormComponent } from './components/recetas/form.component';
import { NoimagePipe } from './components/pipes/noimage.pipe';
import { RecetaIndividualComponent } from './components/recetas/receta-individual.component';
import { LoginComponent } from './components/usuarios/login.component';
import { LoginAuthService } from './services/login-auth.service';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { BuscadorRecetasComponent } from './components/recetas/buscador-recetas.component';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProtegidaComponent,
    CallbackComponent,
    RecetaTarjetaComponent,
    PaginatorComponent,
    FooterComponent,
    FormComponent,
    NoimagePipe,
    RecetaIndividualComponent,
    LoginComponent,
    BuscadorComponent,
    BuscadorRecetasComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, APP_ROUTING],
  providers: [
    AuthService,
    AuthGuardService,
    LoginAuthService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
