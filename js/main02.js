const marioListUl = $("#marioList");
let marioSlider = null;
let marioTweener = null;

loadJson("../data/mario.json");
function loadJson(jsonFile) {
  $.ajax({
    url: jsonFile,
    success: function (res) {
      const marioList = res.items;
      let output = "";
      $.each(marioList, function (idx, item) {
        output += `
      <li class="swiper-slide" style="${item.bg}">
      <div class="info" >
      <h2 class="title" data-splitting>${item.title}</h2>
      <p class="desc" data-splitting>${item.desc}</p>
      <a href="${item.link}" target="${item.target}">MORE</a>
      </div>
      <div class="img">
      <img src="${item.img}">
      </div>
      </li>
      `;
      });
      marioListUl.html(output);

      if (marioSlider !== null) {
        marioSlider.destroy();
      }

      marioSlider = new Swiper("#main", {
        slidesPerView: "auto",
        loop: true,
        effect: "coverflow",
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          slideShadows: false,
          depth: 1000,
          stretch: 0,
        },
        pagination: {
          el: "#main .pagination",
          clickable: true,
        },
        mousewheel: true,
      });
      // css 속성 : margin-left:300 / marginLeft:300,
      // transform:translateX(100px) -- 불가 => x: 100
      // rotation:30deg => rotate:30
      if (marioTweener !== null) {
        marioTweener.kill();
        marioTweener.null;
      }
      moveMario("#marioList .swiper-slide-active .img");
    },
  });
}

function moveMario(moveItem) {
  marioTweener = gsap.to(moveItem, {
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    duration: Math.random() + 0.3,
    onComplete: moveMario,
    onCompleteParams: [moveItem],
  });
}

// 재귀함수(recursion)
// function factorial(num) {
//   if (num < 1) {
//     return 1;
//   }
//   return num * factorial(num - 1);
// }
// let result = factorial(5);
// console.log(result);

const gnbList = $("#gnb ul li");

gnbList.on("click", function (e) {
  e.preventDefault();
  const jsonFile = $(this).data("json");
  if ($(this).hasClass("selected")) return;
  $(this).addClass("selected").siblings("li").removeClass("selected");
  loadJson(jsonFile);
});
