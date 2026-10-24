/* STAGE design preview. Independent of the product runtime. */
(function () {
  "use strict";
  var scenes = Array.from(document.querySelectorAll("[data-scene]"));
  var navigation = Array.from(document.querySelectorAll("[data-scene-target]"));
  var replay = document.getElementById("replayButton");
  var toggle = document.getElementById("motionToggle");
  var description = document.getElementById("sceneDescription");
  var status = document.getElementById("sceneStatus");
  if (!scenes.length || !replay || !toggle) return;
  var preference = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var current = 0;
  var descriptions = {
    statement: "한 문장 안에서 기억할 의미만 선명하게 남깁니다.",
    categories: "대상과 이름을 같은 색으로 묶고, 순서대로 시선을 연결합니다.",
    speaker: "이름 하나에 충분한 크기와 여백을 줍니다.",
    chart: "값과 라벨을 먼저 읽고, 선택된 막대 하나에 집중합니다.",
    steps: "다음 행동을 짧은 순서로 보여줍니다."
  };
  function allowed() { return toggle.checked && !(preference && preference.matches); }
  function stop() { scenes.forEach(function (scene) { scene.classList.remove("is-playing"); }); }
  function play() {
    stop();
    document.body.dataset.motionEnabled = String(allowed());
    if (!allowed()) return;
    // Flush the removed class so an explicit replay starts at the first frame.
    void scenes[current].offsetWidth;
    scenes[current].classList.add("is-playing");
  }
  function show(index) {
    current = Math.max(0, Math.min(scenes.length - 1, index));
    scenes.forEach(function (scene, sceneIndex) {
      var active = sceneIndex === current;
      scene.classList.toggle("is-active", active);
      scene.setAttribute("aria-hidden", String(!active));
    });
    var name = scenes[current].dataset.scene;
    navigation.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.sceneTarget === name));
    });
    if (description) description.textContent = descriptions[name] || "";
    var selected = navigation.find(function (button) { return button.dataset.sceneTarget === name; });
    if (status) status.textContent = (selected ? selected.textContent.trim() : name) + " · " + (current + 1) + " / " + scenes.length;
    play();
  }
  navigation.forEach(function (button) {
    button.addEventListener("click", function () {
      var index = scenes.findIndex(function (scene) { return scene.dataset.scene === button.dataset.sceneTarget; });
      if (index >= 0) show(index);
    });
  });
  replay.addEventListener("click", play);
  toggle.addEventListener("change", play);
  function onPreferenceChange() {
    stop();
    document.body.dataset.motionEnabled = String(allowed());
  }
  if (preference) {
    if (preference.addEventListener) preference.addEventListener("change", onPreferenceChange);
    else if (preference.addListener) preference.addListener(onPreferenceChange);
  }
  window.addEventListener("beforeprint", stop);
  document.addEventListener("keydown", function (event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest("input,textarea,select,[contenteditable=true]")) return;
    if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); }
    else if (event.key === "Home") { event.preventDefault(); show(0); }
    else if (event.key === "End") { event.preventDefault(); show(scenes.length - 1); }
  });
  var initial = scenes.findIndex(function (scene) { return scene.classList.contains("is-active"); });
  show(initial >= 0 ? initial : 0);
})();
