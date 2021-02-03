import React from 'reatc';
import ReactDOM from 'react-dom';
import $ from 'jquery';


let windowHeight = $(window).height();
let bgContainer = $(".main_section");
let header = $("header");
let mainSection = $(".main_section__content");
let mainSectionHeight = mainSection.height();
let mainSectionOffsetTop = mainSection.offset().top;
let bgHeight = $(window).width() / 3.8; // get background image height based on image proportions
let bgPositionY = windowHeight - bgHeight/2; // centering main section background
let discussionItems = $('.discussion_section__item');

// starting position of main section background based on window height
bgContainer.css('background-position-y', bgPositionY);

$(window).scroll(function(){
    // reposition main section background on window scroll
    if ($(window).scrollTop() < windowHeight) {
        bgContainer.css('background-position-y', bgPositionY - $(window).scrollTop());
    } 
    
    // show/hide header
    if ($(window).scrollTop() > mainSectionOffsetTop + mainSectionHeight){
        header.addClass("active");
    } else {
        header.removeClass("active");
    }

    // animate discussion section items
    discussionItems.each(function(){
        if ($(window).scrollTop() > $(this).offset().top - windowHeight + $(this).height()/2) {
            if(!$(this).hasClass('active')){
                $(this).addClass('active');
                // animate text
                animateText(this);
            }
        } else {
            $(this).removeClass('active');
        }
    })
});


// animate text function
function animateText(curObj){

    let curText;

    // define texts for each block 
    const gitInstall = [
        '> tar -zxf git-2.8.0.tar.gz<br>',
        '> cd git-2.8.0<br>', 
        '> make configure<br>', 
        '> ./configure --prefix=/usr<br>', 
        '> make all doc info<br>', 
        '> sudo make install install-doc install-html install-info', 
    ];
    const gitInit = [
        '> git init<br>',
        '> touch README.md<br>', 
        '> git add README.md<br>', 
        '> git commit -m "[create repository]"', 
    ];
    const nodeJS = [
        '> cinst nodejs.install<br>',
        '> node --version',
    ];
    const npm = [
        '> npm init<br>',
        '> npm -v',  
    ];
    const html = [
        '&lt;!DOCTYPE html&gt;<br>',
        '&lt;html lang=&quot;en&quot;&gt;<br>', 
        '&lt;head&gt;<br>', 
        '    &lt;meta charset=&quot;UTF-8&quot;&gt;<br>', 
        '    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;<br><br>', 
        '    &lt;title&gt;Document&lt;/title&gt;<br>', 
        '&lt;/head&gt;<br>', 
        '&lt;body&gt;<br>', 
        '<br>', 
    ];
    const css = [
        '@font-face {<br>',
        '    font-family: "Lato Regular";<br>', 
        '    src: url("../fonts/lato-regular-webfont.woff2") format("woff2");<br>', 
        '    font-style: normal;<br>', 
        '    font-weight: normal;<br>', 
        '}<br>', 
        'html, body{<br>', 
        '    font-family: "Lato Regular";<br>', 
        '    padding: 0;<br>', 
        '    margin: 0;<br>', 
        '}', 
    ];

    // define the required text for the current element
    switch ($(curObj).find('h5').text()) {
        case 'Система контролю версій':
            curText = gitInstall;
            break;
        case 'Git':
            curText = gitInit;
            break;
        case 'Node.js':
            curText = nodeJS;
            break;
        case 'Менеджер пакетів':
            curText = npm;
            break;
        case 'HTML':
            curText = html;
            break;
        case 'CSS':
            curText = css;
            break;
    }

    let currentLine = 0;
    let count = 0;
    let outputText = '';
    // target element for text output
    let outputElement = $(curObj).find('.discussion_section__item__content');
    // animate text
    typeLine();
    
    // text animation function
    function typeLine(){
        let interval = setTimeout(function(){
            outputText += curText[currentLine][count];
            $(outputElement).html(outputText);
            count++;
            // check if we reached the end of the current line
            if(count >= curText[currentLine].length){
                count = 0;
                currentLine++;
                // check if we reached the end of text
                if (currentLine == curText.length){
                    clearTimeout(interval);
                    outputElement.html(outputText);
                    return true;
                }
            }
            typeLine()
        }, getRandomInt(getRandomInt(100 * 3.0)));
    }

    // function for randomize time between characters output
    function getRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    }
}