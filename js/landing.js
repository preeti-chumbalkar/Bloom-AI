console.log("Bloom AI Loaded Successfully");

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 30) {

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";

    }

});

// Feature Card Animation

const cards = document.querySelectorAll(".feature-card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


// AI Chat Animation

const messages = document.querySelectorAll(".chat-message");

messages.forEach((message, index) => {

    message.style.opacity = "0";

    setTimeout(() => {

        message.style.transition = "0.6s";

        message.style.opacity = "1";

    }, index * 400);

});


// Why Bloom AI Card Hover

const whyCards = document.querySelectorAll(".why-card");

whyCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});


// Testimonial Hover Animation

const testimonialCards = document.querySelectorAll(".testimonial-card");

testimonialCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});
// FAQ

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {

    button.addEventListener("click", () => {

        const answer = button.nextElementSibling;

        const icon = button.querySelector("span");

        if(answer.style.display === "block"){

            answer.style.display = "none";

            icon.innerHTML = "+";

        }else{

            answer.style.display = "block";

            icon.innerHTML = "−";

        }

    });

});

// Scroll To Top Button

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});