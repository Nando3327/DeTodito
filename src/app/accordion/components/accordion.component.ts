import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

    @Input() expanded = true;
    @Input() title: string;
    @ViewChild('panels', {
        static: true
    }) panels: ElementRef;

    constructor() {
    }

    ngOnInit(): void {

    }

    toogleAccordion($event: any, elementName: string): void {
        $event.stopPropagation();
        $event.preventDefault();


        const expandedAccordion = (this.panels.nativeElement.classList.contains('show'));
        this.panels.nativeElement.classList = (expandedAccordion) ? 'collapse' : 'collapse show';
        this.panels.nativeElement.parentElement.parentElement.classList = (expandedAccordion) ? 'accordion accordion-toggle-plus' : 'accordion accordion-toggle-minus';
    }
}
