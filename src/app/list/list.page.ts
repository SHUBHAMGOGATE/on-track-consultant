import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  userlist;
  profileForm:FormGroup
  constructor(private fb:FormBuilder,private usvs:UserService) {
    
  }
  ngOnInit() {
    this.profileForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      email:['',Validators.required],
      dateofbirth:['',Validators.required],
      weight:['',Validators.required],
      height:['',Validators.required],
    }),

    this.userlist=this.usvs.userlist
    // .pipe(map(x=>{
    //   if(x instanceof Array){
    //     x.map(y=>{
    //       let z=this.findage(y.dateofbirth);
    //       return {...y,age:z};
    //     })
    //   }
    // }));;
  }

  onSubmit(){
    this.usvs.addUser(this.profileForm.value);
  }
  findage(dateofbirth:string){
    let n=new Date();
    let y=new Date(dateofbirth)
    return (n.getFullYear()-y.getFullYear());
  }

  // getUserList(){
  //   this.userlist=this.usvs.userlist;
  // }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
