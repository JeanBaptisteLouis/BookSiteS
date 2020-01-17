$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
$('select.dropdown').each(function() {

  var dropdown = $('<div />').addClass('dropdown selectDropdown');

  $(this).wrap(dropdown);

  var label = $('<span />').text($(this).attr('placeholder')).insertAfter($(this));
  var list = $('<ul />');

  $(this).find('option').each(function() {
      list.append($('<li />').append($('<a />').text($(this).text())));
  });

  list.insertAfter($(this));

  if($(this).find('option:selected').length) {
      label.text($(this).find('option:selected').text());
      list.find('li:contains(' + $(this).find('option:selected').text() + ')').addClass('active');
      $(this).parent().addClass('filled');
  }

});

$(document).on('click touch', '.selectDropdown ul li a', function(e) {
  e.preventDefault();
  var dropdown = $(this).parent().parent().parent();
  var active = $(this).parent().hasClass('active');
  var label = active ? dropdown.find('select').attr('placeholder') : $(this).text();

  dropdown.find('option').prop('selected', false);
  dropdown.find('ul li').removeClass('active');

  dropdown.toggleClass('filled', !active);
  dropdown.children('span').text(label);

  if(!active) {
      dropdown.find('option:contains(' + $(this).text() + ')').prop('selected', true);
      $(this).parent().addClass('active');
  }

  dropdown.removeClass('open');
});

$('.dropdown > span').on('click touch', function(e) {
  var self = $(this).parent();
  self.toggleClass('open');
});

$(document).on('click touch', function(e) {
  var dropdown = $('.dropdown');
  if(dropdown !== e.target && !dropdown.has(e.target).length) {
      dropdown.removeClass('open');
  }
});

// light
$('.switch input').on('change', function(e) {
  $('.dropdown, body').toggleClass('light', $(this).is(':checked'));
});

var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function(){
      $(this).next(value).html(this.value);
    });
  });
};

rangeSlider();

function sendMail() {
  var link = "mailto:me@example.com"
           + "?cc=myCCaddress@example.com"
           + "&subject=" + escape("This is my subject")
           + "&body=" + escape(document.getElementById('myText').value)
  ;

  window.location.href = link;
}

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);

