(() => {
  // src/functions.ts
  var COLORS = {
    positive: ["bg-green-50", "text-green-900"],
    negative: ["bg-red-50", "text-red-900"]
  };
  var addEvent = (addEventButton) => {
    const wrapper = addEventButton.parentElement;
    const valueInput = wrapper.querySelector(".value");
    valueInput.classList.remove("border", "border-red-500");
    const value = parseInt(valueInput.value || "");
    const descInput = wrapper.querySelector(".desc");
    descInput.classList.remove("border", "border-red-500");
    const desc = descInput.value || "";
    if (!value) {
      valueInput.classList.add("border", "border-red-500");
      return;
    }
    if (!desc) {
      descInput.classList.add("border", "border-red-500");
      return;
    }
    appendEventToSquare({
      desc,
      value
    }, addEventButton.closest(".square"));
    valueInput.value = "1";
    descInput.value = "";
  };
  var appendEventToSquare = (event, square) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("event", "flex", "items-center", "mb-2");
    const value = document.createElement("input");
    value.classList.add("value", "w-8", "mr-2", "text-center", "text-slate-900", "bg-amber-50");
    value.value = event.value.toString();
    wrapper.appendChild(value);
    const desc = document.createElement("input");
    desc.value = event.desc;
    const colors = event.value > 0 ? COLORS.positive : COLORS.negative;
    desc.classList.add("desc", "h-7", "flex-1", "mr-2", "pl-2", ...colors);
    wrapper.appendChild(desc);
    const button = document.createElement("button");
    button.innerHTML = "&times;";
    button.classList.add("remove-event", "h-7", "flex", "items-center", "px-2", "border-none", "bg-white", "text-amber-800");
    wrapper.appendChild(button);
    square.querySelector(".events").appendChild(wrapper);
  };
  var getTotals = () => {
    let count = 0;
    let total = 0;
    document.querySelectorAll("[data-square]").forEach((square) => {
      const events = square.querySelectorAll(".event");
      if (events.length) {
        events.forEach((event) => {
          const input = event.querySelector(".value");
          const value = parseInt(input.value || "0");
          if (!isNaN(value)) {
            count++;
            const square2 = event.closest("[data-square]");
            total += square2.dataset.square.startsWith("yes") ? value : -value;
          }
        });
      }
    });
    return { count, total };
  };
  var setScore = () => {
    const { count, total } = getTotals();
    const valueElement = document.querySelector("[data-score] .value");
    const descElement = document.querySelector("[data-score] .desc");
    const scoreElement = document.querySelector("[data-score] .score");
    scoreElement.classList.remove(...COLORS.positive, ...COLORS.negative);
    if (count) {
      descElement.innerText = total === 0 ? "Add at least one more event to calculate the score" : "YOUR SCORE: ";
      valueElement.innerText = total.toString() || "";
      let scoreDescription = "";
      if (total > 0) scoreDescription = "\u{1F44D} You should do it.";
      if (total < 0) scoreDescription = "\u{1F44E} You should not do it.";
      const colors = total > 0 ? COLORS.positive : total < 0 ? COLORS.negative : "";
      scoreElement.classList.add(...colors);
      scoreElement.innerText = scoreDescription;
    } else {
      descElement.innerText = "Add events to calculate the score";
      valueElement.innerText = "";
      scoreElement.innerText = "";
    }
  };

  // src/examples.ts
  var examples = {
    president: {
      "yes-yes": [
        { value: 1, desc: "I will be president of the most powerful country in the world" },
        { value: -1, desc: "I will have to work way harder than now " },
        { value: -1, desc: "I will have to work on things that are way harder than this" },
        { value: 1, desc: 'I will get to move around in "the Beast"' },
        { value: 1, desc: "Marine One!!!" },
        { value: -1, desc: "I will have to wear suites every day" },
        { value: -1, desc: "I will have to think a lot before talking" }
      ],
      "no-yes": [
        { value: 1, desc: "I will be able to travel and live where I want" },
        { value: 1, desc: "I will continue doing what I love" },
        { value: 1, desc: "I can sleep and wake up whenever I want" }
      ],
      "yes-no": [
        { value: 1, desc: "I won't have to pay rent" },
        { value: -1, desc: "I won't be able to write code any more" }
      ],
      "no-no": [
        { value: 1, desc: "I won't have to think about issues I don't care about" },
        { value: -1, desc: "I won't be able to see the oval office" }
      ]
    },
    sports: {
      "yes-yes": [
        { value: 1, desc: "I will feel better" },
        { value: 1, desc: "I will be healthier" },
        { value: 1, desc: "I will probably look better" },
        { value: -1, desc: "I will have to actually do it" }
      ],
      "no-yes": [
        { value: 1, desc: "I will have more time to spend on other stuff" },
        { value: -1, desc: "I will get less and less healthy with time" }
      ],
      "yes-no": [
        { value: -1, desc: "I won't be able to watch so many TV shows" },
        { value: 1, desc: "I won't get breathless every time I climb 2 stairs" }
      ],
      "no-no": [
        { value: 1, desc: "I won't accidentally hurt myself during workouts" },
        { value: -1, desc: "I won't get any stronger than I am now" }
      ]
    }
  };
  var showExample = (button) => {
    document.querySelectorAll(".events").forEach((wrapper) => wrapper.innerText = "");
    const example = button.dataset.example;
    Object.keys(examples[example]).forEach((key) => {
      const square = document.querySelector(`[data-square="${key}"]`);
      const events = examples[example][key];
      events.forEach((event) => appendEventToSquare(event, square));
    });
  };

  // src/app.ts
  (() => {
    document.querySelectorAll(".square footer button").forEach((addEventButton) => {
      addEventButton.addEventListener("click", () => {
        addEvent(addEventButton);
        setScore();
      });
    });
    document.querySelectorAll("[data-example]").forEach((exampleButton) => {
      exampleButton.addEventListener("click", () => {
        showExample(exampleButton);
        setScore();
        document.getElementById("square").scrollIntoView({ behavior: "smooth" });
      });
    });
    document.addEventListener("click", (e) => {
      const eventTarget = e.target;
      if (eventTarget.classList.contains("remove-event")) {
        eventTarget.parentElement.parentElement.removeChild(eventTarget.parentElement);
        setScore();
      }
    });
    document.addEventListener("change", (e) => {
      const eventTarget = e.target;
      if (eventTarget.classList.contains("value") && eventTarget.closest(".event")) {
        setScore();
      }
    });
  })();
})();
