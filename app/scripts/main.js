'use strict';

$(document).ready(function(){

    /* Scroll hire me button to contact page */
    $('.hire-me').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 500);
        return false;
    });

    /* Sticky menu */
    $('.navbar').sticky({topSpacing: 0});


    /* Scroll spy and scroll filter */
    $('#main-menu').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollThreshold: 0.5,
        scrollSpeed: 750,
        filter: '',
        easing: 'swing'
    });

    /* Charts*/

    $('.chart').waypoint(function() {
        $(this).easyPieChart({
            barColor: '#3498db',
            size: '150',
            easing: 'easeOutBounce',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
    }, {
        triggerOnce: true,
        offset: 'bottom-in-view'
    });


    /* VEGAS Home Slider */

    $.vegas('slideshow', {
        backgrounds:[
            { src:'images/slider-01.jpg', fade:1000 },
            { src:'images/slider-02.jpg', fade:1000 },
            { src:'images/slider-03.jpg', fade:1000 },
            { src:'images/slider-04.jpg', fade:1000 }
        ]
    })('overlay', {
        src:'images/overlay-16.png'
    });
    $('#vegas-next').click(function() {
        $.vegas('next');
    });
    $('#vegas-prev').click(function() {
        $.vegas('previous');
    });

    /* Contact form */

    $('#thanks-contact').hide();

    $('#contact-form').validate({
        rules: {
            name: {
                minlength: 2,
                required: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                minlength: 2,
                required: true
            }
        },
        submitHandler: function(form) {
            var submit = $('#submit-contact');
            var submitText = submit.text();
            submit.text($('#sending-contact').val());
            $.post('/contact.php', $(form).serialize(), function() {
                $('#thanks-contact').fadeIn(500);
                submit.hide();
                submit.text(submitText);
            });
        }
    });

    $('#thanks-contact a').on('click', function(){
        $('#submit-contact').fadeIn(500);
        $('#thanks-contact').hide();
        $('#message').val('');
    });
});