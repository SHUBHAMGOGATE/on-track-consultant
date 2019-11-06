import { Component } from '@angular/core';
import { UserService } from '../list/user.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userlist
  dietForm:FormGroup;
  constructor(private fb:FormBuilder, private usvs:UserService) {
    this.userlist=this.usvs.userlist;
    this.dietForm=this.fb.group({
      email:['',Validators.required],
      from:['',Validators.required],
      to:['',Validators.required],
      schedule:this.fb.array([
        this.fb.group({
          title:['',Validators.required],
          start_time:['',Validators.required],
          end_time:['',Validators.required],
          description:['',Validators.required]
        })
      ])
    })
  }
  addGroup(){
    let a=this.dietForm.get('schedule') as FormArray;
    a.push(
      this.fb.group({
      title:['',Validators.required],
      start_time:['',Validators.required],
      end_time:['',Validators.required],
      description:['',Validators.required]
    })
    );
  }
  addDiet(){
    console.log(this.dietForm.value);
    let newdiet=this.dietForm.value;
    let duration=Math.abs(Math.floor((new Date(newdiet.from).getTime()-new Date(newdiet.to).getTime())/(1000*3600*24)));
    console.log(duration)
    newdiet.schedule=newdiet.schedule.map(
      element=>{
        console.log({...element,following:new Array<boolean>(duration)})
        return {...element,following:new Array<boolean>(duration).fill(false)}
      }
    )
    this.usvs.addDiet(newdiet).then(x=>this.dietForm.reset).catch(err=>console.error(err));
    console.log(newdiet);
  }
  changeUser(event){

  }
}
