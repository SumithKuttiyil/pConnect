import {Injectable} from "@angular/core";
import Parse from 'parse';
import {resinfoDTO} from "./resInfoDTO";


@Injectable()
export class services{


  getLatestResearch(){

    var promise=new Promise((resolve, reject)=>{

      var table=Parse.Object.extend('LatestResearch');
      console.log('entered the services file')
      var query=new Parse.Query(table);
      query.find().then((result)=>{
        var list:resinfoDTO[]=result.map((mcat) => {
          let article = new resinfoDTO();
          article.title = mcat.get('title');
          article.description = mcat.get('description');
          article.author = mcat.get('author');

          article.date = mcat.get('date');
          return article
        });
          resolve(list);

      }

      )


    })


return promise


  }


}
