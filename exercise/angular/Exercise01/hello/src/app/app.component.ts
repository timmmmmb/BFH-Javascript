import { Component } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  public title = 'Hello Application';
  public name: string;
  public greeting: string = '';

    public sayHello() {
      if(!this.greeting){
        this.greeting = 'Hello ' + this.name + '!'
      }else{
        this.greeting = 'Hello ' + this.name + '!\n'+this.greeting;
      }
      this.name = '';
    }
}
