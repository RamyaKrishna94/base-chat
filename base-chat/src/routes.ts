import { Routes } from '@angular/router';
import { SignupFormComponent } from '../src/app/signup-form/signup-form.component';
import { LoginFormComponent } from '../src/app/login-form/login-form.component';
import { ChatRoomComponent } from '../src/app/chat-room/chat-room.component';

export const appRoutes : Routes = [
    {path: 'signup', component : SignupFormComponent},
    {path : 'login' , component : LoginFormComponent},
    {path : 'chat', component : ChatRoomComponent},
    {path : '',redirectTo : '/login', pathMatch : 'full'}
];  