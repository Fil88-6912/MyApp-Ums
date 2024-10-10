import { Routes } from '@angular/router';
import { AboutComponent } from './componenti/about/about.component';
import { ContactComponent } from './componenti/contact/contact.component';
import { HomeComponent } from './componenti/home/home.component'
import { ContattoComponent } from './componenti/contatto/contatto.component';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
import { AuthGuard } from './auth/auth.guard';
import { SingupComponent } from './componenti/singup/singup.component';
import { SinginComponent } from './componenti/singin/singin.component'; 
import { SinguppageComponent } from './componenti/singuppage/singuppage.component';
import { WelcomepageComponent } from './componenti/welcomepage/welcomepage.component';

export const routes: Routes = [
    { path: '', pathMatch:'full', redirectTo: '/singin'},
    { path: 'homepage', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
    { path: 'singup', component: SingupComponent},
    { path: 'singin', component: SinginComponent},
    { path: 'success', component: SinguppageComponent},
    { path: 'welcome', component: WelcomepageComponent, canActivate: [AuthGuard]},
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
        { path: ':id', component: ContattoComponent }
    ]},
    { path: '404', component: NotfoundComponent},
    { path: '**', redirectTo: '/404'}
];
 