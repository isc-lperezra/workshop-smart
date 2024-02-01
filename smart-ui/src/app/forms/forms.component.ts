import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy {
  type: string | undefined;
  private sub: any;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.type = params['type']; 
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
