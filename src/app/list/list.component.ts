import { Component } from '@angular/core';
import { IData } from '../IData'; //Interface
import { ListService } from './list.service';


@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html'
})

export class ListComponent{
  tests: IData[] = [];
  errorMessage: string;

  //selected type Interface
  selected: IData[] = [];
  name: string;
  sample: number;
  platform: string;
  newEntry: boolean = true;
  error: boolean = false;
  errMess: string;

  constructor(private _listService: ListService){ //Dependency Service
  }
  ngOnInit(){
    this._listService.getList()
    .subscribe(tests => this.tests = tests,
    error => this.errorMessage = <any>error);
  };
  edit(name, count, sample, platform){
    //With 2 Way binding inserting the content in input fields
    this.selected = [
      {
        name: name,
        count: count,
        sample: sample,
        platform: platform
      }
    ]
    this.name = this.selected[0].name;
    this.sample = this.selected[0].sample;
    this.platform = this.selected[0].platform;
    this.newEntry = false;
  }
  save(name){

    //If New Button was hit before then you are able to insert new entry
    //for this example it is just saved in tests[] (later here backend)
    if(this.newEntry && this.name !== undefined && this.sample !== 0 && this.platform !== undefined
    && (this.platform === "Web" || this.platform === "Mobile")){
      this.tests.push({
        "name": this.name,
        "count": this.tests.length +1,
        "sample": this.sample,
        "platform": this.platform
      })
      this.error = false;
    }else if(!this.newEntry){
      //Overwrite the values (overwrite or set new entry here for backend)
      //Temporary overwrite the properties of tests[]
      //You have to submit the edit button twice so it recognizes the change for that particular element (unsolved bug)
      this.tests.map(element => element.count === (this.selected[0].count) ? element.name = this.name : element.platform = this.platform)
      this.error = false;
    }else{
      //Error Message
      this.errMess = "Please enter the right values"
      this.error = true;
    }
  }
  new(){
    //Reset fields
    this.name = "";
    this.sample = 0;
    this.platform = "";

    this.newEntry = true;
  }
}
