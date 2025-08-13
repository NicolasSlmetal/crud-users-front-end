import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnchorItem } from '../../interfaces/anchor-item';
import { ButtonItem } from '../../interfaces/button-item';

@Component({
  selector: 'app-button-group',
  imports: [RouterLink],
  templateUrl: './button-group.html',
  styleUrl: './button-group.css'
})



export class ButtonGroup {

  buttons = input.required<Array<AnchorItem | ButtonItem>>();

  public isButtonItem(element : AnchorItem | ButtonItem) : element is ButtonItem {
    return element.type === "button";
  }

  public isAnchorItem(element : AnchorItem | ButtonItem) : element is AnchorItem {
    return element.type === "anchor";
  }
}