/* 
* Timeout JavaScript Document 
* created by: Eric Brown 
* last modified: 8/20/10 
*/

/******************************/
/*   TIMEOUT FUNCTIONS                  */
/*****************************/
$(function () {


    /***************************/
    /*   TIMEOUT TOGGLE BUTTON      */
    /***************************/
    $("#toggleBtn").click(function () {
        $("#toggleBtn").text() == "Stop Timeout" ? stopTimeout() : startTimeout();
    });

    /* Stop Function */
    var stopTimeout = function () {
        $("#toggleBtn").text("Start Timeout");
        $("#timeoutContainer").hide();
        $("#timeoutWarning").hide();
        $.idleTimer("destroy");
    }

    /* Start Function */
    var startTimeout = function () {
        $("#toggleBtn").text("Stop Timeout");
        $("#timeoutWarning").animate({
            "height": "toggle"
        }, "fast");

        /******************************/
        /*   ESTABLISH TIMEOUT CONTAINER   */
        /*   calls from 2 additional js files         */
        /*   1) jquery.idletimeout.js                */
        /*   2) jquery.idletimer.js                   */
        /*****************************/
        $.idleTimeout('#timeoutContainer', '#timeoutContainer a', {
            idleAfter: 15, /* idle for this many seconds */
            pollingInterval: 1, /* seconds to query the server to keep the session alive */
            keepAliveURL: 'keepalive.htm', /* file to preserve session state */
            serverResponseEquals: 'OK', /* if file = OK keep the state going */

            /* Timeout Function */
            onTimeout: function () {
                $(this).slideUp();
                $("div#example *").remove();
                alert("Your session has expired!");
                $("div#example").append("<div><p>The application has timed out...</p><p><a href=\"default.htm\">Reload Example</a></p></div>");
            },
            /* Idle Function */
            onIdle: function () {
                /* Account for IE's inability to see :focus pseudo-class */
                if ($.browser.msie === true) {
                    $("a, input, button").bind("blur", function () { $(this).attr("class", "focus"); });
                }
                else {
                    $("a:focus, input:focus, button:focus").attr("class", "focus");
                }
                $(this).slideDown();
                $(this).find("a").focus();
            },
            /* Live Counter for Timeout Container */
            onCountdown: function (counter) {
                $("#timeoutCounter").html(counter);
            },
            /* If session is extended execute these functions */
            onResume: function () {
                $(this).slideUp("fast");
                $("a.focus, input.focus, button.focus").focus();
                $("a.focus, input.focus, button.focus").removeAttr("class");
            }
        });

    }



});