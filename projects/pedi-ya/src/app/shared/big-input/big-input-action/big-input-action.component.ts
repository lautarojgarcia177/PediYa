import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'pedi-ya-big-input-action',
  templateUrl: './big-input-action.component.html',
  styleUrls: ['./big-input-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigInputActionComponent {
  @Input()
  disabled = false;
  @Input()
  fontSet = '';
  @Input()
  fontIcon = '';
  @Input()
  faIcon = '';
  @Input()
  label = '';
  @Input()
  color = '';
  @Input()
  noButtonFrame = false;

  @Output()
  action = new EventEmitter<void>();

  hasFocus = false;

  onClick() {
    this.action.emit();
  }
}
