import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {services} from "../../providers/services";
import {resinfoDTO} from "../../providers/resInfoDTO";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public list:any;

  constructor(public navCtrl: NavController, public services:services) {

   this.services.getLatestResearch().then((data)=>{
     console.log(data)
     this.list=data;

    })


  }

}
