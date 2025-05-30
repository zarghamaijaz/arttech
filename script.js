


function animateBlobs(){
    const blobs = document.querySelectorAll(".blob");
    if(blobs){
      const content = document.querySelector("#hero-content");
      const blob1 = document.querySelector("#blob-1");
      const blob2 = document.querySelector("#blob-2");
      const blob3 = document.querySelector("#blob-3");
      const blackCricle = document.querySelector("#black-circle");
      const header = document.querySelector("#header");

      const windowWidth = window.innerWidth;
      const windowheight = window.innerHeight;
      const highest = Math.max(windowWidth, windowheight);
      blackCricle.style.height = `${highest}px`;
      blackCricle.style.width = `${highest}px`;

      // console.log(windowWidth);
      // console.log(windowheight);

      const  blobFloat1 = gsap.to(blob1, {
        duration: 10,
        x: 120,
        y:80,
        rotate: -10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      const  blobFloat2 = gsap.to(blob2, {
        duration: 5,
        y: 50,
        rotate: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      const  blobFloat3 = gsap.to(blob3, {
        duration: 10,
        x: 100,
        rotate: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });




      const controller = new ScrollMagic.Controller();
      var scene = new ScrollMagic.Scene({
        triggerElement: ".hero",
        triggerHook: 0,
        duration: 2000,
      })
        .setPin(".hero")
        // .addIndicators({ name: "Hero pin" }) // add indicators (requires plugin)
        .addTo(controller);
        let lastProgress = 0;
      scene.on("progress", function (e) {
        let p = e.progress;
        // Snap if very close to edges
        if (p < 0.05) p = 0;
        if (p > 0.95) p = 1;
        if(p === 0){
            blobFloat1.play();
            blobFloat2.play();
            blobFloat3.play();
        }
        else{
            blobFloat1.pause();
            blobFloat2.pause();
            blobFloat3.pause();
        }
        if(p < 0.5){
          blackCricle.style.transform = `scale(0)`;
          header.classList.remove("dark");
          const transformPercent = Math.ceil(p / 0.5 * 100);
          gsap.to(blob1, {
            x: `-${transformPercent}%`,
          });
          gsap.to(blob2, {
            x: `-${transformPercent}%`,
          });
          gsap.to(blob3, {
            x: `${transformPercent}%`,
          });
          gsap.to(content, {
            scale: (p) + 1,
            opacity: 1 - (p * 2),
          })
        }
        else if(p > 0.5){
          header.classList.add("dark");
          gsap.to(blob1, {
            x: `-100%`,
          });
          gsap.to(blob2, {
            x: `-100%`,
          });
          gsap.to(blob3, {
            x: `100%`,
          });
          gsap.to(content, {
            scale: 1,
            opacity: 0,
          })
          const transformPercent = (p-0.5) * 2;          
          blackCricle.style.transform = `scale(${transformPercent * 1.5})`;
        }
        lastProgress = p;
        // requestAnimationFrame(() => {
        // })
          
      });
    }
}
animateBlobs();



// Services cards insersection observers

const services = document.querySelector(".services-cards");
if(services){
  const servicesCards = services.querySelectorAll(".services-card");
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
      else{
        entry.target.classList.remove('reveal');
      }
    });
  };
  const observer = new IntersectionObserver(callback, {
    root: null, // use viewport as root
    rootMargin: '0px',
    threshold: 0.25
  });
  servicesCards.forEach(card => observer.observe(card));
}

const globeSection = document.querySelector("#globeViz");
if(globeSection){
  const callback = (entries, observer) => {
    const header = document.querySelector("#header");
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        header.classList.add('dark');
      }
      else{
        header.classList.remove('dark');
      }
    });
  };
  const observer = new IntersectionObserver(callback, {
    root: null, // use viewport as root
    rootMargin: '0px',
    threshold: 0.5
  });
  observer.observe(globeSection);
}


function animateCards(){
    const services = document.querySelector(".services-cards");
    const whiteCricle = document.querySelector("#white-circle");
    const header = document.querySelector("#header");

    const windowWidth = window.innerWidth;
    const windowheight = window.innerHeight;
    const highest = Math.max(windowWidth, windowheight);
    whiteCricle.style.height = `${highest}px`;
    whiteCricle.style.width = `${highest}px`;
    if(services){
      const slides = services.querySelectorAll(".services-card-outer");
      const leftPadding = window.innerWidth / 2;
      let slidesTotalWidth = 0;
      slides.forEach(slide => {
        slidesTotalWidth += slide.offsetWidth;
      });
      const totalDuration = leftPadding + slidesTotalWidth;

      const controller = new ScrollMagic.Controller();
      var scene = new ScrollMagic.Scene({
        triggerElement: ".services-section",
        triggerHook: 0,
        duration: totalDuration,
      })
        .setPin(".services-section")
        // .addIndicators({ name: "Services pin" }) // add indicators (requires plugin)
        .addTo(controller);
        scene.on("progress", function (e) {
          requestAnimationFrame(() => {
            let p = e.progress;
            const slidesProgress = slidesTotalWidth / totalDuration;
            const distance = p * slidesTotalWidth;
            services.style.transform = `translateX(-${distance}px)`
            if(p < slidesProgress){
              header.classList.add("dark");
              whiteCricle.style.transform = `scale(0)`;
            }
            else if(p > slidesProgress){
              header.classList.remove("dark");
              const transformPercent = (p - slidesProgress) / (1 - slidesProgress);
              // Now remap 0 → 1 to 0.1 → 1
              // const remapped = 0.1 + transformPercent * 0.9;
              whiteCricle.style.transform = `scale(${transformPercent * 1.5})`;
            }
          })
      });
    }
}
animateCards()

function mobileMenuFunctionality(){
  const nav = document.getElementById("header-nav");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("menu-open");
  openBtn.addEventListener("click", () => {
    nav.classList.add("active");
  });
  closeBtn.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}mobileMenuFunctionality();


function updateSlideOpacity() {
  document.querySelectorAll('.swiper-slide').forEach(slide => {
    slide.style.opacity = '0.5'; // Default 0.5
  });
  const centerSlide = document.querySelector('.swiper-slide-active');
  if (centerSlide) {
    centerSlide.style.opacity = '1'; // Full opacity on center slide
  }
}
function setEqualSlideHeight() {
  let maxHeight = 0;
  const slides = document.querySelectorAll('.swiper-slide');

  slides.forEach(slide => {
    slide.style.height = 'auto'; // Reset first
    if (slide.offsetHeight > maxHeight) {
      maxHeight = slide.offsetHeight;
    }
  });

  slides.forEach(slide => {
    slide.style.height = maxHeight + 'px';
  });
}
const swiper = new Swiper('.swiper', {
  // Optional parameters
  // direction: 'vertical',
  on: {
    init: function() {
      setEqualSlideHeight();
      updateSlideOpacity();
    },
    resize: function() {
      setEqualSlideHeight();
    },
    slideChangeTransitionEnd: function () {
      updateSlideOpacity();
    },
    slideChange: function () {
      updateSlideOpacity(this);
    },
    transitionEnd: function () {
      updateSlideOpacity(this);
    }
  },
  loop: true,
  slidesPerView: 3,

  autoHeight: true,
  // spaceBetween: 50,
  centeredSlides: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    768: {
      slidesPerView: 2, // when window width >= 768px
    },
    480: {
      slidesPerView: 1, // when window width >= 480px
    },
    // or just
    0: {
      slidesPerView: 1, // for mobile-first (smallest screens)
    }
  }
});




const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
    else{
      entry.target.classList.remove('reveal');
    }
  });
}

const ourTeamSection = document.querySelector(".our-team");
if(ourTeamSection){
  const observer = new IntersectionObserver(observerCallback, {
    root: null, // use viewport as root
    rootMargin: '0px',
    threshold: 0.5
  });
  const teamCards = ourTeamSection.querySelectorAll(".team-card-outer");
  teamCards.forEach(card => observer.observe(card));
}
const projectsSection = document.querySelector(".projects");
if(projectsSection){
  const observer = new IntersectionObserver(observerCallback, {
    root: null, // use viewport as root
    rootMargin: '0px',
    threshold: 0.5
  });
  const projectCards = projectsSection.querySelectorAll(".project-outer");
  projectCards.forEach(card => observer.observe(card));
}




function footerCopyrightYear(){
  const year = new Date().getFullYear();
  document.getElementById("year").textContent = year;
}footerCopyrightYear();