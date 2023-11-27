import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { SampleComponent } from './sample/sample.component';
const routes = [
    { path: '', component: HomeComponent },
    { path: 'form', component: FormComponent },
    { path: 'view', component: ViewComponent },
    { path: 'sample', component: SampleComponent }
];
export let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
//# sourceMappingURL=app-routing.module.js.map