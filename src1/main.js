
Parse.Cloud.job("hello", function(request, response) {


  var axios = require('axios');
  var cheerio = require('cheerio');
  var fs = require('fs');
  var evenInfo = []
  var event=Parse.Object.extend('LatestResearch');
  //var prom = axios.get('https://madmimi.com/s/4abcdc')
  var prom = axios.get('https://www.nature.com/nature/research')
    .then(function (response) {
      if (response.status === 200) {
        var html = response.data;
        var $ = cheerio.load(html);
        $('article').each(function (index, element) {
          evenInfo[index] = {}
          evenInfo[index]['date'] = Date($(element).find('time').text());
          evenInfo[index]['title'] = $(element).find('h3').text()
          evenInfo[index]['description'] = $(element).find('div').find('p').text();
          evenInfo[index]['author'] = $(element).find('ul').last().text();

          //evenInfo[index]['image_URL']=$(element).find('p').last().text() madmimi-image-container
          //evenInfo[index]['image_URL'] = $(element).parent().find('.madmimi-image-container').find('img').attr('src')
          //evenInfo[index]['weblink'] = $(element).find('p').last().find('a').attr('href');



              var row = new event();
              row.set('title', evenInfo[index]['title']);
              row.set('description', evenInfo[index]['description']);
              row.set('date', evenInfo[index]['date']);
              row.set('author', evenInfo[index]['author']);



              //row.set('imageURL', evenInfo[index]['image_URL']);

              row.save(null, {
                useMasterKey: true,
                success: function (suc) {
                  console.log('updated the database successfully !')


                },
                error: function (error) {
                  //response.success('database update failed!', error);

                }
              });





        });

        console.log('scrapped data is here', evenInfo)
      }

      response.success('web scrapping successfull');
    }).catch(function (error) {
      response.success('error in we scrapping!', error);
    })
});

