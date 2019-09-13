import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { JwtService } from '../jwt.service';
import { UserPw } from '../api.userinfo';


@Component({
  selector: 'app-changepw',
  templateUrl: './changepw.component.html',
  styleUrls: ['./changepw.component.css']
})
export class ChangepwComponent implements OnInit {
  pwinfo: UserPw = {id: null, password: null, npassword: null};
  msgalert: String = null;

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
  ) { }

  ngOnInit() {
    let currentdata= this.jwtService.decodeData();
    this.pwinfo.id = currentdata['id'];
  }

  changePassword(form){
    this.apiService.changePassword(this.pwinfo).subscribe((result: string)=>{ // change password
      console.log(result);
      if(result['status']=='changed'){  // if password is changed
        this.msgalert="Change saved";
        this.pwinfo.password = '';
        this.pwinfo.npassword = '';
      }else if(result['status']=='error'){  // if password doesn't match
        this.msgalert="Curret Password is not matched";
      }else{  // unexprected error from DB
        this.msgalert="Sorry, unexprected error occured. Please try it again";
      }
    });
  }

}
