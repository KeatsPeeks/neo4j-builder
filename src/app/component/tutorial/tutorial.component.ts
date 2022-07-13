import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tutorial-component',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent
{
    step: number = 1;
    @Output('onDismiss') onDismiss: EventEmitter<any> = new EventEmitter();

    constructor()
    {

    }

    dismiss(e: any)
    {
        e.preventDefault()
        this.onDismiss.emit()
    }

    next(e: any, step: number)
    {
        e.preventDefault();
        this.step = step;
    }
}
