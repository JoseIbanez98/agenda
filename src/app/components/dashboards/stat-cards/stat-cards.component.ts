import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-cards',
  standalone: false,
  templateUrl: './stat-cards.component.html',
  styleUrl: './stat-cards.component.css'
})
export class StatCardsComponent {
@Input() icono: string='event';
@Input() colorBackground:string='blue'
@Input() cantidad: number=0;
@Input() contenido: string='Citas hoy';

}
