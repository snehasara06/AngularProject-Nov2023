import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ViewComponent } from './view/view.component';
import { SampleComponent } from './sample/sample.component';
export let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            HomeComponent,
            FormComponent,
            ViewComponent,
            SampleComponent
        ],
        imports: [
            HttpClientModule,
            BrowserModule,
            AppRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            MatSelectModule,
            MatFormFieldModule,
            MatTabsModule,
            BrowserAnimationsModule,
            MatInputModule,
            MatCardModule,
            MatCheckboxModule,
            MatRadioModule,
            MatDividerModule,
            MatButtonModule,
            MatIconModule,
            MatDatepickerModule,
            MatNativeDateModule,
            NgFor,
            MatGridListModule,
            MatToolbarModule,
            MatSidenavModule,
            NgMultiSelectDropDownModule.forRoot()
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map