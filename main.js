// Script for changing the navigation menu once you start scrolling/showing the contents of the "MEET THE TEAM" section.
$(function(){
$(window).scroll(function(){
  if ($(document).scrollTop() > 70){
    $('nav').addClass('modify');
  }
  else {
    $('nav').removeClass('modify');
  }

  var windscroll = $(window).scrollTop();

  if (windscroll >= 1120) {
      $('#team-members').css('visibility', 'visible');
      $('#team-members').css('height', '1700');
      $('#team-members').css('overflow', 'hidden');
      $('#team-members').css('opacity', '1');

  }
});
});


// Script for Parallax scrolling.
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function(){
        window.location.hash = hash;
      });
    }
  });
});


//Script for typing out the text in the msgNETCONOMY(blue banner) section.
function showText(target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}

//Loading the typing script above and the JSON script (bottom of the file)
window.onload = function() {
  showText("#type_text", "We are hiring people", 0, 50);
  listTeamMembers();
};


//Attempt at making the css class "active-tab" apply to the corresponding navigation link or removing said class by clicking on another link.
//
// var links = document.getElementsByClassName("menu-item");
// for (let i = 0; i < links.length; i++) {
//   links[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active-tab");
//     current[0].className = current[0].className.replace(" active-tab", "");
//     this.className += " active-tab";
//   });
// }


//Script for the effect needed in the "AVAILABLE POSITIONS" section.
var acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.visibility === "visible" && panel.style.height === "300px" ) {
            panel.style.visbility = "hidden";
            panel.style.height = "0";
            $(this).children('i').addClass('fa-plus');
            $(this).children('i').removeClass('fa-minus');
        } else {
            panel.style.visibility = "visible";
            panel.style.height = "300px";
            $(this).children('i').addClass('fa-minus');
            $(this).children('i').removeClass('fa-plus');

        }
    });
}


//Script for requesting the data from the data.json file.
function listTeamMembers() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var teamMembers = JSON.parse(this.responseText);
            let memberList = [];
            let members = teamMembers.team_members;
            console.log(members[0]);
            for(let i = 0; i < members.length; i++) {
              let oneMember = `
              <div class="team-card">
              <div class="img-hover"><img class="re-size" src="${members[i].picture_data[0].src}" alt="${members[i].picture_data[0].alt}"></div>
                <h1>${members[i].name}</h1>
                <h2>${members[i].role}</h2>
                <!-- <p>${members[i].message}</p> -->
                <a href="#"><i class="fab fa-linkedin"></i></a><a href="#"><i class="fab fa-facebook"></i></a>
               </div>
              `;
              memberList.push(oneMember);
            }


            document.querySelector('#team-members').innerHTML = `
              <div>${memberList.join("")}</div>

            `;
        }

    };
    xmlhttp.open("GET", "data.json", true);
    xmlhttp.send();

}
