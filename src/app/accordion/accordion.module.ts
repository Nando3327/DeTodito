import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ACCORDION_COMPONENTS } from './components';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [...ACCORDION_COMPONENTS],
    exports: [...ACCORDION_COMPONENTS],
    entryComponents: []
})
export class AccordionModule {
    constructor() {}
}
