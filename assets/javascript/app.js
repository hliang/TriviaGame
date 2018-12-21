$(document).ready(function () {
    // question pool
    var questionPool = [
        // q: question, c: choices, ai: index of answer, remarkImg: image for remark
        { q: "In the children's book series, where is Paddington Bear originally from?", choices: ["India", "Peru", "Canada", "Iceland"], ai: 1, remarkImg: "./assets/images/Paddington.jpg" },
        { q: "On which of these might you win a large amount of money?", choices: ["National Flattery", "National Lottery", "National Battery", "National Pottery"], ai: 1, remarkImg: "./assets/images/National-lottery.jpg" },
        { q: "What letter must appear at the beginning of the registration number of all non-military aircraft in the U.S.?", choices: ["N", "A", "U", "L"], ai: 0, remarkImg: "./assets/images/US_Registration_Closeup.jpg" },
        { q: "Which insect shorted out an early supercomputer and inspired the term 'computer bug'?", choices: ["Moth", "Roach", "Fly", "Beetle"], ai: 0, remarkImg: "./assets/images/bug.jpg" },
        { q: "Who'ss the president", choices: ["Lady Gaga", "Justin Bieber", "Donald Trump", "I don't have a president"], ai: 2, remarkImg: "./assets/images/president.jpg" },
        { q: "where is Wakanda", choices: ["South Ameria", "Europe", "Africa", "No Where"], ai: 3, remarkImg: "./assets/images/wakanda.jpg" }
    ];
    var n = 5; // number of questions
    questionPool = questionPool.sort(() => .5 - Math.random()).slice(0,n); // randomly sample n elements from the array
    var timePerQuestion = 15; // timer allowed for each question, in seconds
    var timeLeft = timePerQuestion;
    var breakAfterAnswer = 3; // the wait time between user's answer and displaying new question
    var questionEntry = null;
    var answerTimer = 0;
    var showQuestionInterval = 0;
    var usersAnswer = null;
    var answerCorrect = 0;
    var answerWrong = 0;
    var answerEmtpy = 0;

    function displayNextQuestion() {
        console.log("==== displayNextQuestion() ========")
        if (questionPool.length == 0) {
            clearInterval(showQuestionInterval);
            // display score
            $("#timerDiv").html($("<p>").text("All Done!"));
            $("#remark").empty();
            $("#remark").append($("<p>").text("Corect: " + answerCorrect));
            $("#remark").append($("<p>").text("Incorrect: " + answerWrong));
            $("#remark").append($("<p>").text("Unanswerd: " + answerEmtpy));
            $("#remark").append($("<p>").text("You can take: $" + answerCorrect/n * 1000000));
            $("#gamewrapper").addClass("bg-takemoney");
            return;
        }
        // hide remark div, in case it's shown
        $("#remark").hide();
        // clear old timer
        clearInterval(answerTimer);
        clearInterval(showQuestionInterval);
        // show related elements on page
        $("#timer").text(timePerQuestion);
        $("#timerDiv").show();
        $("#question").show();
        $("#choicesDiv").show();
        // select random entry
        var qi = Math.floor(Math.random() * questionPool.length);
        questionEntry = questionPool[qi];
        console.log(questionEntry);
        // remove entry from pool
        questionPool.splice(qi, 1)
        $("#question").html($("<p>").text(questionEntry["q"]));
        questionEntry["choices"].forEach(function (choice, ci) {
            $("#answer-" + ci).text(choice);
        });

        // reset user's answer
        usersAnswer = null;

        // countdown
        timeLeft = timePerQuestion;
        // $("#countdown-bar").css("width", "100%"); 
        // $("#countdown-bar").css("transition", "width 100ms linear");
        // $("#countdown-bar").css("width", (100 * (timeLeft) / timePerQuestion) + "%");
        answerTimer = setInterval(function () {
            $("#timer").text(--timeLeft);
            // $("#countdown-bar").css("width", (100 * (timeLeft-1) / timePerQuestion) + "%");
            console.log(timeLeft);
            if (timeLeft <= 0) { // timeout
                checkAnswer();
                clearInterval(answerTimer);
            }
            // $("#countdown-bar").css("transition", "width 1000ms linear");
        }, 1000);
    }

    // check answer and display remarks
    function checkAnswer() {
        console.log("==== checkAnswer() ========")
        // check answer
        var img = $("<img />", { "src": questionEntry["remarkImg"] });
        if (timeLeft <= 0) {
            answerEmtpy++;
            $("#remark").html($("<p>").text("Out Of Time!"));
            $("#remark").append($("<p>").text("Answer should be: " + questionEntry.choices[questionEntry.ai]));
        } else if (usersAnswer == questionEntry.choices[questionEntry.ai]) {
            console.log("yes");
            answerCorrect++;
            $("#remark").html($("<p>").text("Yes!"));
        } else {
            console.log("no");
            answerWrong++;
            $("#remark").html($("<p>").text("Nope!"));
            $("#remark").append($("<p>").text("Answer should be: " + questionEntry.choices[questionEntry.ai]));
            // count = 3;
            // counter = setInterval(timer, 1000);
        }
        $("#remark").append(img);

        // display remark
        $("#question").hide();
        $("#choicesDiv").hide();
        $("#remark").show();

        // start a new question in x seconds
        setTimeout(displayNextQuestion, breakAfterAnswer * 1000);
        showQuestionInterval = setInterval(displayNextQuestion, timePerQuestion * 1000);
    }

    $(".answer").on("click", function () {
        // stop timer
        clearInterval(answerTimer);
        clearInterval(showQuestionInterval);

        usersAnswer = $(this).find("span").text();
        console.log("user picked answer =" + usersAnswer);

        // check answer
        checkAnswer();
    });


    $("#btn-start").on("click", function () {
        // smoothly show first question
        var annimateTime = 500;
        $("#startscreen").fadeOut(annimateTime - 300); // hide start screen
        setTimeout(displayNextQuestion, annimateTime); // show first question
        // show next question every x seconds
        showQuestionInterval = setInterval(displayNextQuestion, timePerQuestion * 1000);
        console.log("showQuestionInterval=" + showQuestionInterval);
    });

    // displayNextQuestion();
    // $("#remark").hide();
    // $("#timerDiv").hide();
    // $("#question").hide();
    // $("#choicesDiv").hide();

});


function trim1(t) {
    return t.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}
function Manager(t, e, n) {
    function o() {
        $("#loading_screen").hide(),
        i(),
        $("#initial_screen").show(),
        f($("#intro"), 100, 17)
    }
    function i() {
        R = "initialScreen",
        $("#title").text(b.title),
        $("#category").text(b.category),
        $("#author").text("Author: " + b.author),
        $("#intro").text(b.intro),
        $("#category_icon").show(),
        $("#category_icon").attr("src", b.category_icon)
    }
    function s() {
        w = [],
        T = -1;
        var t = b.questions[I];
        if ($("#qcategory").text(t.qcategory),
        $("#qtext").text(t.qtext),
        $("#qinfo").html(t.qinfo),
        I == b.qcount - 1 && (void 0 !== document.ontouchstart ? $(".hand_info").text("Tap anywhere to see results") : $("#next_btn").text("My Results")),
        0 == t.qtype && $("#qhint").text(t.qhint),
        $("#timer_number").text(100),
        $("#arrow_div").css("left", 530),
        $("#timer_box").css("width", 400),
        $("#question_box").text(I + 1 + " of " + b.qcount),
        0 == t.qinfo.length ? $("#qinfo").hide() : $("#qinfo").show(),
        t.qtype >= 1) {
            if (2 == t.qtype)
                var e = truefalseIndices(t.qchoices.length);
            else
                var e = computeRandomIndices(t.qchoices.length);
            $("#next_btn").css("background-position", "0 0");
            for (var n = 0; n < t.qchoices.length; n += 1)
                $("#option" + n).css("background-position", "0 0").text(t.qchoices[e[n]])
        } else
            $("#enter_btn").css("background-position", "0 0"),
            $("#text_label").val("").css("background-color color", "white")
    }
    function r(t) {
        if (t && t.stopPropagation(),
        !x) {
            w.push($("#text_label").val()),
            $("#enter_btn").hide();
            for (var e = 0 == b.questions[I].qtype ? b.questions[I].qanswer : [b.questions[I].qanswer], n = 0; n < e.length; n += 1)
                if ($("#text_label").val().toLowerCase() == Base64.decode(e[n]).toLowerCase())
                    return $("#text_label").css("background-color", "green"),
                    clearInterval(m),
                    S += Math.ceil(q),
                    $("#score_box").text(S),
                    void c(!0);
            $("#text_label").css("background-color", "red"),
            q -= 50,
            setTimeout(function() {
                q > 0 && ($("#enter_btn").show(),
                $("#text_label").val("").css("background-color", "white"))
            }, 500)
        }
    }
    function a(t) {
        if (t.stopPropagation(),
        !x) {
            var e = $("#" + t.target.id);
            return trim1(e.text()) == trim1(Base64.decode(b.questions[I].qanswer)) ? (w.push(e.text()),
            e.css("background-position", "0 -60px"),
            clearInterval(m),
            S += Math.ceil(q),
            $("#score_box").text(S),
            void c(!0)) : void ("0px -90px" != e.css("background-position") && (w.push(e.text()),
            e.css("background-position", "0 -90px"),
            q -= 1 == b.questions[I].qtype ? 50 : q))
        }
    }
    function c(t) {
        if (!x && v != I) {
            x = !0,
            v = I,
            A.results_string += "," + Math.ceil(q),
            A.attempts_string += "," + (t ? w.length : 0),
            b.questions[I].qtype >= 1 ? $("#qanswer").text(Base64.decode(b.questions[I].qanswer)) : $("#qanswer").text(Base64.decode(b.questions[I].qanswer[0]));
            var e = "No guess";
            t ? e = w[w.length - 1] : w.length > 0 && (e = w[0]),
            A.user_answers_string += "|" + e,
            setTimeout(function() {
                $("#game_screen").fadeOut(200, function() {
                    $("#game_screen").hide(),
                    t ? ($("#incorrect").hide(),
                    $("#correct").show()) : ($("#correct").hide(),
                    $("#incorrect").show()),
                    $("#result_screen").show(),
                    R = "resultScreen",
                    $("#qinfo").scrollTop(0),
                    f($("#qanswer"), 28, 20),
                    navigator.userAgent.match(/MSIE ([0-9]+)\./) && ($("#qinfo").width(691),
                    setTimeout(function() {
                        $("#qinfo").width(690)
                    }, 50)),
                    x = !1
                })
            }, 600)
        }
    }
    function u() {
        q -= 100 * (Date.now() - T) / y,
        T = Date.now(),
        0 >= q && (q = 0),
        $("#timer_number").text(Math.ceil(q)),
        $("#arrow_div").css("left", q / 100 * 400 + 130),
        $("#timer_box").css("width", q / 100 * 400),
        0 >= q && ($("#enter_btn").hide(),
        clearInterval(m),
        c(!1))
    }
    function l() {
        clearTimeout(window.thetimer),
        $(".possible_option").hide(),
        $("#qhint").hide(),
        $("#text_label").hide(),
        $("#enter_btn").hide(),
        $("#game_screen").show(),
        f($("#qtext"), 100, 22),
        R = "animatingQuestion",
        $("#qtext").css("top", "230px").hide().fadeIn(1e3, function() {
            window.thetimer = setTimeout(function() {
                "animatingQuestion" == R && (R = "none",
                d())
            }, b.questions[I].read_delay ? 1e3 * b.questions[I].read_delay : 5e3)
        })
    }
    function d() {
        $("#qtext").animate({
            top: "125px"
        }, 500, function() {
            function t(o) {
                return function() {
                    return o == b.questions[I].qchoices.length ? (x = !1,
                    q = 100,
                    T = Date.now(),
                    void (m = setInterval(u, k))) : ($("#option" + o).height("auto").show(),
                    f($("#option" + o), 28.5, 20),
                    void $("#option" + o).height(28).css("left", n).animate({
                        left: "50"
                    }, e, t(o + 1)))
                }
            }
            if (b.questions[I].qtype >= 1) {
                var e = 250
                  , n = "650px";
                t(0)()
            } else {
                $("#qhint").show(100),
                $("#enter_btn").show(100);
                var o = $("#qtext").height();
                $("#enter_btn").css("top", 210 + o + "px"),
                $("#qhint").css("top", 150 + o + "px"),
                $("#text_label").show().val("").focus().css("background-color", "white").css("top", 175 + o + "px").css("left", "650px").animate({
                    left: "300px"
                }, 100, function() {
                    x = !1,
                    q = 100,
                    T = Date.now(),
                    m = setInterval(u, k)
                })
            }
        })
    }
    function h(e) {
        if (window.location.href.indexOf("funtrivia") < 1 && alert("Copyright FunTrivia.com"),
        e && e.stopPropagation(),
        R = "none",
        !x) {
            if (I == b.qcount - 1 && 0 == resultsposted)
                return resultsposted = 1,
                void g();
            if (-1 == I && 0 == startsignalsent) {
                startsignalsent = 1;
                var n = "http://www.funtrivia.com/duel/startduel.cfm?qid=" + t
                  , o = $.ajax(n);
                o.fail(function(t, e) {
                    I = -1111,
                    alert("Unable to contact server.  It appears your connection is not working correctly.  Please try back again later." + e)
                })
            }
            I++,
            x = !0;
            var i = 0 == I ? "#initial_screen" : "#result_screen";
            $(i).fadeOut(500, function() {
                $(i).hide(),
                s(),
                l()
            })
        }
    }
    function f(t, e, n) {
        t.css("font-size", n + "px");
        for (var o = 0; 100 > o && t.height() > e; )
            o++,
            n -= .3,
            t.css("font-size", n + "px")
    }
    function p() {
        var e = new Date
          , i = Math.round(e.getTime() / 1e4);
        dataloaded = 1,
        $.getJSON(t ? "http://www.funtrivia.com/qserver2.cfm?timed=1&qid=" + t + "&skey=" + n + "&bust=" + i : "json/data.json", function(t) {
            b = t,
            $("#categoryimage").attr("src", b.categoryimage),
            $("#mini_logo").attr("src", b.categoryimage),
            setTimeout(o, 500)
        })
    }
    function g() {
        var t = {
            ATTEMPTS_STRING: A.attempts_string.substring(1),
            USER_ANSWERS_STRING: "",
            RESULTS_STRING: A.results_string.substring(1),
            PASS_THROUGH_STRING: e,
            THE_CODE: 13 * e.length + 12 * S,
            SVERSION: "source7",
            TOTAL: S
        }
          , n = document.createElement("form");
        n.setAttribute("method", "post"),
        n.setAttribute("action", b.post_to_url);
        for (key in t) {
            var o = document.createElement("input");
            o.setAttribute("type", "hidden"),
            o.setAttribute("name", key),
            o.setAttribute("value", t[key]),
            n.appendChild(o)
        }
        document.body.appendChild(n),
        n.submit(),
        document.body.removeChild(n)
    }
    function _() {
        I = -1;
        var t = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
        t ? ($(".btn").remove(),
        $("#result_screen").on("touchend", function() {
            scrollVar == $("#qinfo").scrollTop() && h(),
            scrollVar = -10
        }),
        $("#result_screen").on("touchstart", function() {
            scrollVar = $("#qinfo").scrollTop()
        }),
        $("#initial_screen").on("touchend", h)) : ($(".hand_info").remove(),
        $(".hand_info_next").remove(),
        $(document).on("keyup", function(t) {
            if ("animatingQuestion" == R)
                R = "none",
                d();
            else if ("resultScreen" == R || "initialScreen" == R) {
                var e = t && t.which ? t.which : t.keyCode;
                13 == e && h()
            }
        }),
        $(".btn").mouseenter(function() {
            x || $(this).css("background-position", "0 28px")
        }),
        $(".btn").mouseleave(function() {
            x || $(this).css("background-position", "0 0")
        }),
        $(".possible_option").mouseenter(function() {
            x || "0px 0px" != $(this).css("background-position") || $(this).css("background-position", "0 -30px")
        }),
        $(".possible_option").mouseleave(function() {
            x || "0px -30px" != $(this).css("background-position") || $(this).css("background-position", "0 0")
        }),
        $("#qcorrectionURL").mouseenter(function() {
            $(this).css("color", "#660066"),
            $(this).css("text-decoration", "underline")
        }),
        $("#qcorrectionURL").mouseleave(function() {
            $(this).css("color", "#0066FF"),
            $(this).css("text-decoration", "none")
        }));
        var e = window.ontouchstart ? "touchend" : "click";
        $("#start_btn").on(e, h),
        $("#next_btn").on(e, h),
        $("#enter_btn").on(e, r),
        $(".possible_option").on(e, a),
        $("#qcorrectionURL").on(e, function(t) {
            t.stopPropagation(),
            window.open(b.questions[I].qcorrectionURL)
        }),
        $("#text_label").keypress(function(t) {
            var e = t.keyCode ? t.keyCode : t.which;
            "13" == e && r(),
            t.stopPropagation()
        }),
        $("#game_screen").on(e, function() {
            "animatingQuestion" == R && (R = "none",
            d())
        }),
        0 == dataloaded && p()
    }
    var m, q, x, b, w, v = -1, y = 3e4, k = 100, T = -1, S = 0, I = 0, R = "none", A = {
        user_answers_string: "",
        attempts_string: "",
        results_string: ""
    };
    _()
}
function computeRandomIndices(t) {
    for (var e = [], n = 0; t > n; n++)
        e.push(n);
    for (var o, i, n = 0; t * t > n; n++) {
        o = Math.floor(Math.random() * t),
        o == t && (o = 0),
        i = Math.floor(Math.random() * t),
        i == t && (i = 0);
        var s = e[o];
        e[o] = e[i],
        e[i] = s
    }
    return e
}
function truefalseIndices(t) {
    for (var e = [], n = 0; t > n; n++)
        e.push(n);
    return e
}
var scrollVar, thetimer = "", resultsposted = 0, dataloaded = 0, startsignalsent = 0;
Date.now = Date.now || function() {
    return +new Date
}
;