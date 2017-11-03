$( document ).ready(function() {
  $(".twttr-button").prop("disabled", true);

  // Below: Assigns random background color to body
  var randomBackgroundImages = ['radial-gradient(50% 100%, #7B92B1 0%, #455979 100%)', 'radial-gradient(50% 100%, #B5EB45 0%, #7ED321 100%)', 'radial-gradient(50% 100%, #FFE211 0%, #FFC107 100%)', 'radial-gradient(50% 100%, #FA7866 0%, #F44336 100%)', "url('External_Files/images/space2.gif')"];
  var drawRandomBackgroundImages = randomBackgroundImages[Math.floor(Math.random() * randomBackgroundImages.length)];
  $('body').css("background-image", drawRandomBackgroundImages);

  // Below: Assigns font color to text in Generate button
  if (drawRandomBackgroundImages !== "url('External_Files/images/space2.gif')") {
    $('.randomizeButton').css("color", drawRandomBackgroundImages.slice(38, 45));
  } else {
    $('.randomizeButton').css("color", "#455979");
  }
  
  var acceptableWords = function(array){
    return array[Math.floor(Math.random() * array.length)];
  };

  var firstwheel = ["Be","Dare","Encourage","Challenge" ,"Disrupt","Do","Recharge","Amplify","Make","One","Beyond","Build","Discover","Create","&nbsp;", "Circulate", "Drive", "Maximize", "Own"];
  var secondwheel = ["The","It","To","&nbsp;", "Your" ,"Every"];
  var thirdwheel =["Heard","Link","Extraordinary","Power","Courage","Amplify","One","Best","Difference","Momentum","All","Unicorn","Recharge","Smorgasbord","Move","Extreme","Future","Focus","Possibilities","Success","Aspire", "Cheer", "Celebrate", "Moment", "Heart"];

  firstwheel.forEach(function(word){
    $("#machine1").append("<div class='word'>"+word+"</div>");
  });
  secondwheel.forEach(function(word){
    $("#machine2").append("<div class='word'>"+word+"</div>");
  });
  thirdwheel.forEach(function(word){
    $("#machine3").append("<div class='word'>"+word+"</div>");
  });


  var clipboard = new Clipboard('.btn');
  $("#copywords").prop("disabled",true);

  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

  if (isSafari === true ){
    clipboard.on('error', function(e) {
        $('.btn').attr("data-toggle", "tooltip").attr("data-placement", "right").attr("title", "Press ⌘+C to copy")
        $('[data-toggle="tooltip"]').tooltip();
    });
  }


  var machine1 = $("#machine1").slotMachine({
    active  : 0,
    delay : 900
  });

  var machine2 = $("#machine2").slotMachine({
    active  : 0,
    delay : 900
  });

  var machine3 = $("#machine3").slotMachine({
    active  : 0,
    delay : 900
  });

  $(".randomizeButton").click(function(){

  var first_two =  {
    "Be" : (acceptableWords([0])),
    "Dare" : (acceptableWords([0, 2, 4, 5])),
    "Encourage" : (acceptableWords([0, 1, 2, 4, 5])),
    "Challenge" : (acceptableWords([0,1, 2, 4, 5])),
    "Disrupt" : (acceptableWords([0, 1, 2, 3, 4, 5])),
    "Do" : (acceptableWords([0, 1, 2, 4,5])),
    "Recharge" : (acceptableWords([0,1,3,4])),
    "Amplify" : (acceptableWords([0, 1,2,4])),
    "Make" : (acceptableWords([0,1,5])),
    "One" : (acceptableWords([2,3])),
    "Beyond" : (acceptableWords([0,5])),
    "Build" : (acceptableWords([0,1,2,4,5])),
    "Discover" : (acceptableWords([0,1,2,4,5])),
    "Create" : (acceptableWords([0,1,2,4])),
    "&nbsp;" : (acceptableWords([0, 3,5])),
    "Circulate" : (acceptableWords([0,2,3,4])), 
    "Drive" : (acceptableWords([0,2,3,4,5])), 
    "Maximize" : (acceptableWords([0,2,4,5])), 
    "Own" : (acceptableWords([0,4,5]))  
  }

  var second_two = {
    "The" : (acceptableWords([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20, 21, 22, 23, 24])),
    "It" : (acceptableWords([7,10,11, 15, 21, 22])),
    "To" : (acceptableWords([2, 10, 12, 13, 14, 17, 20, 21, 22, 23, 24])),
    "&nbsp;" : (acceptableWords([11,13, 20, 21, 22])),
    "Your" : (acceptableWords([0, 3, 4, 7, 9, 11, 12, 14, 16, 17, 18, 19, 21,  23, 24])),
    "Every" : (acceptableWords([0, 3, 6, 9, 11, 13, 14, 18, 19, 21, 23, 24]))
  }

    $("#shareBtn").prop("disabled",true);
    $(".fb-share-button").hide();

    machine1.shuffle();
    machine2.shuffle();
    machine3.shuffle();

    $(".randomizeButton").prop("disabled",true);
    $("#copywords").prop("disabled",true);

    $(".showwords").val("");

    setTimeout(function(){
      

      machine1.stop();
      machine1.setRandomize(acceptableWords(machine1.active));

      machine2.setRandomize(first_two[firstwheel[machine1.active]]);
      machine2.stop();

      machine3.setRandomize(second_two[secondwheel[first_two[firstwheel[machine1.active]]]]);
      machine3.stop();


    },2000);
    
    setTimeout(function(){
      $("#copywords").prop("disabled",false);
      $(".randomizeButton").prop("disabled",false);


      var one = $("#machine1").children().children()[machine1.active+1].innerHTML;
      var two = $("#machine2").children().children()[machine2.active+1].innerHTML;
      var three = $("#machine3").children().children()[machine3.active+1].innerHTML;

      var twitterScript = $("<script id='twitter-script'>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>")
      var eventName;

      if ((one === "" || one === "&nbsp;") && (two === "" || two === "&nbsp;")){
        eventName = three;
        eventHashtag = three;
      } else if (two === "" || two === "&nbsp;"){
        eventName = one+" "+three;
        eventHashtag = one+three;
      } else if (one === "" || one === "&nbsp;") {
        eventName = two + " " + three;
        eventHashtag = two + three;
      } else {
        eventName = one+" "+two+" "+three;
        eventHashtag = one+two+three;
      };

      document.getElementById('shareBtn').onclick = function() {
        FB.ui({
          display: 'popup',
          method: 'share',
          href: 'http://names.events/',
          hashtag: "#EventNameGen",
          quote: "I used the '#EventNameGen' by Gramercy Tech and got '" + eventName + "'! "
        }, function(response){});
      } 

      $("#shareBtn").prop("disabled",false);
      $(".showwords").val(eventName);
      $(".twitter-share-button").hide();
      var $tweetBtn = $('<a style="display: inline"></a>').addClass('twitter-share-button').attr("data-size","large").attr("href","https://twitter.com/share").attr("url","names.events").attr("data-text","I used the '#EventNameGen' by @gramercytech and got '"+eventName+"'!").html("Tweet");
      $(".twttr-button").append($tweetBtn);
      $tweetBtn.hide();
      $(".fb-share-button").show();
      twttr.widgets.load();
      $tweetBtn.show();
      if (isSafari === true ){
        jQuery('.btn').click();
      }
    },4800);
  });  
  
});
