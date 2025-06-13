import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  standalone: false,
  templateUrl: './circular-progress.component.html',
  styleUrl: './circular-progress.component.css'
})
export class CircularProgressComponent {
  @Input() progress: number = 75; // porcentaje (0-100)
  @Input() label: string = 'SUN';
  @Output() clicked= new EventEmitter<Date>();
  

  private getDayNumber(label:string):number{
    const dias:string[]=['DOM','LUN','MAR','MIE','JUE','VIE','SAB']
    return dias.indexOf(label.toUpperCase());
  }

  public onClick(){
    const today = new Date();
    const todayDay = today.getDay(); 
    const targetDay = this.getDayNumber(this.label);
    const targetDate = new Date(today);

    if(todayDay>targetDay){
      const diferencia=todayDay-targetDay
      targetDate.setDate(today.getDate() - diferencia);

    }else{
      const diferencia=targetDay-todayDay
       targetDate.setDate(today.getDate() + diferencia);
    }
    this.clicked.emit(targetDate);
  }
}
