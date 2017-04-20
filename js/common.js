'use strict';

var Common;

Common = {

    sectionArray: [],
    mainLinkArray: [],

    init: function () {
        var self = this;

        self.initEvents();
        Common.checkFirstSection();
        Common.sectionPosition();
        Common.colorMainMenu();

        $(window).on({
            load: function () {
                Common.slickInit();
            },
            resize: function () {
                $('.team__list').slick('resize');
                Common.colorMainMenu();
            },
            scroll: function () {
                Common.onScroll();
                Common.colorMainMenu();
                Common.checkFirstSection();
            }
        });
    },

    initEvents: function () {

        //btn animation
        $('.btn-download_js').on('click',function (e){
            e.preventDefault();
            var self = this;
            $(this).addClass('active');
            setTimeout(function() {
                $(self).addClass('ready');
            }, 4000);
        });
        $('.btn__inInput').on('click',function (e){
            e.preventDefault();
            var $button = $(this);
            $button.closest('.form__updates_js').addClass('start');
            setTimeout(function(){
                $button.closest('.form__updates_js').addClass('processing').removeClass('start');
            }, 700);
            setTimeout(function() {
                $button.closest('.form__updates_js').addClass('submited').removeClass('processing');
            }, 3000);
        });
        $('.btn-mobMenu').on('click', function (e){
            e.preventDefault();
            $(this).toggleClass('active');
            $('.overlay').toggleClass('active');
            $('.mainNav__wrap').toggleClass('open');
            $('.lang__wrap').toggleClass('visible');
            $('.header-mob').toggleClass('bg');
            $('html').toggleClass('static');
        });
        $('.overlay').on('click', function (){
            $(this).removeClass('active');
            $('.btn-mobMenu').removeClass('active');
            $('.mainNav__wrap').removeClass('open');
            $('.lang__wrap').removeClass('visible');
            $('.header-mob').addClass('bg');
            $('html').removeClass('static');
        });

        //team
        $('.team__btnMore_js').on('click',function (e){
            e.preventDefault();
            $(this).closest('.team__item').addClass('active');
        });
        $('.team__item').on('click',function (){
               if ($(window).width() < 768) {
                   if ($(event.target).closest(".team__detailsClose").length) return;
                   $(this).addClass('active');
               }
        });
        $('.team__detailsClose_js').on('click',function (e){
            e.preventDefault();
            $(this).closest('.team__item').removeClass('active');
        });

        //description visible
        $('.description__link').on('click',function (e){
            e.preventDefault();
            $(this).closest('.description__wrap').toggleClass('continuation-visible');
        });

        //language selection
        $('.dropdown__link').on('click', function(e){
            $('#current__language').text($(this).data("lan"));
        });
        function afterReveal( el ) {
            el.addEventListener('animationend', function( ) {
                if(el.id == 'roadmap'){
                    if ($(window).width() > 991) {
                        $('.roadmap__progressBar').css('width', '46%')
                    } else{
                        $('.roadmap__progressBar').css({
                            height: '46%'
                        });
                    }
                }
                if(el.id == 'structure'){
                    $('.chart__box').addClass('visible');
                }
            });
        }
        var wow = new WOW(
            {
                offset:       0,          // ������ �� ��������, ����� ����� ����������� ��������, �� ��������� 0
                mobile:       true,       // �������� �� ��������� ��������, �� ��������� true
                live:         true,       // ����������� �������� ��������, �� ��������� true
                callback:     afterReveal
            }
        );
        wow.init();

        $('.btn_scroll').click(function(event) {
            var id = $(this).attr("href");
            var target = parseInt($(id).offset().top);
            if ($(window).scrollTop() != target) {
                $('html, body').animate({
                    scrollTop: target
                }, 500);
            }
            event.preventDefault();
        });
        $('.crowdfunding__milestones__link').click(function(event) {
            if ($(window).width() > 1024) {
                $('#crowdfunding__milestones').modal();
            }
            else {
                $('#crowdfunding__milestones__mobile').modal();
            }
        })

        $('.escrow__release__terms__link').click(function(event) {
            if ($(window).width() > 1024) {
                $('#escrow__release__terms').modal();
            }
            else {
                $('#escrow__release__terms__mobile').modal();
            }
        })

        $('.deal__sheet__link').click(function(event) {
            $('#deal__sheet').modal();
        })        
    },
    onScroll: function() {
        var scrollPosition = $(document).scrollTop();
        var windowHeight = $(window).height();
        $('.mainNav__link').each(function () {
            var currentLink = $(this);
            var refElement = $(currentLink.attr("href"));
            if (refElement.position().top <= scrollPosition + 300  && (refElement.offset().top) + refElement.outerHeight(true)  > scrollPosition) {
                $('.mainNav__link').removeClass("active");
                currentLink.addClass("active");
            }
            else{
                currentLink.removeClass("active");
            }
        });
    },

    checkFirstSection: function () {
        var firstSection = $('.large-header'),
            wrap = $('.wrapper'),
            scrollPosition = $(document).scrollTop();
        if (firstSection.innerHeight() > scrollPosition) {
            firstSection.closest(wrap).addClass('firstSection')
        } else{
            firstSection.closest(wrap).removeClass('firstSection')
        }
    },

    sectionPosition: function () {
        this.sectionArray = [];
        var currentTopPixel = 0;
        $(".section").each(function(i,value){
            var section = {
                start: currentTopPixel,
                end: currentTopPixel+$(value).innerHeight(),
                class: $(value).hasClass('section__inverse') ? 'dark' : 'light'
            }
            currentTopPixel += $(value).innerHeight();
            Common.sectionArray.push(section);
        });
    },

    colorMainMenu: function () {
        this.mainLinkArray = [];
        if($(window).width() > 767) {
            $('.mainNav__link').each( function (i,value){
                for(var i in Common.sectionArray) {
                    if($(value).offset().top > Common.sectionArray[i].start && $(value).offset().top <= Common.sectionArray[i].end) {
                        $(value).removeClass('dark').removeClass('light');
                        $(value).addClass(Common.sectionArray[i].class);
                        break;
                    }
                }
            });
        } else {
            $('.mainNav__link ').removeClass('dark').removeClass('light');
        }
    },

    slickInit: function () {
        $('.team__list').slick({
            responsive: [
                {
                    breakpoint: 99999,
                    settings: "unslick"
                },
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                        dots: true,
                        centerPadding: '40px',
                        slidesToShow: 1,
                        adaptiveHeight: true

                    }
                }
            ]
        });
    },


};

$(document).ready(function() {
    Common.init();
});