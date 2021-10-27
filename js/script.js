function handleClick() {
  const events = ["click", "ontouch"];
  const cards = document.querySelectorAll(".card");
  const profileList = document.querySelectorAll("li");

  async function changeText(element) {
    //Essa função assíncrona recebe o element e depois..
    let type = element.dataset.type;
    //pega o tipo desse elemento. ex: Daily, Weekly ou Monthly.
    let data = await (await fetch("js/data.json")).json();
    //Nesse pedaço o arquivo json é transformado num objeto javascript.
    data.forEach((category) => {
      //percorre o objeto.
      let name = category.title.toLowerCase().replace(/ /g, "");
      //pega os title desse objeto. ex: work, play, study...
      let current = document.querySelector("." + name + " .current"); //com esses title é possível selecioanr os current e os previous correspondentes a essas categorias.
      let previous = document.querySelector("." + name + " .previous");

      let time = category.timeframes[type]; // aqui são separados as horas correspondentes a cada categoria.

      current.innerHTML = time.current + "hrs"; //já coloco as horas do current dentro de current.
      //Cada current e cada previous vem de6 ccategorias diferentes, por isso dá certo.
      if (type == "daily")
        previous.innerHTML = "Last " + "Day" + " - " + time.previous + "hrs";
      // já coloca as horas do preivous denro do previous correspondente
      else if (type == "weekly")
        previous.innerHTML = "Last " + "Week" + " - " + time.previous + "hrs";
      else
        previous.innerHTML = "Last " + "Month" + " - " + time.previous + "hrs";
    });
  }

  function handleActive(e) {
    const activeClass = "active";
    if (profileList.length) {
      // When the event is triggered the for each starts and if this is different them time, i will remove the active class from that element. In that way each time i click, i remove the active class from every other element.
      profileList.forEach((time) => {
        if (this != time) {
          time.classList.remove(activeClass);
        }
      });

      // if its not different, its only going to add/remove(toggle) the new class in the element that the user clicked.
      this.classList.toggle(activeClass);
      changeText(this);
    }
  }

  profileList.forEach((category) => {
    events.forEach((event) => {
      category.addEventListener(event, handleActive);
    });
  });
}

handleClick();
