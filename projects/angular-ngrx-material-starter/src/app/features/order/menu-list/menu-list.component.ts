import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'comidas-ya-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
