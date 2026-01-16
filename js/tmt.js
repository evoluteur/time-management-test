// time-management-test
// (c) 2026 Laurent Pellet

const question = (q, idx) => {
  return `<div id="q${idx}_wrapper" class="question">
    <div class="qnum">${idx + 1}</div>
    <div class="qq">
      <div class="qtext">${q}</div>
      <div class="qscale">
        <label><input type="radio" name="q${idx}" value="0" onChange="javascript:setValid(${idx})"/>0</label>
        <label><input type="radio" name="q${idx}" value="1" onChange="javascript:setValid(${idx})"/>1</label>
        <label><input type="radio" name="q${idx}" value="2" onChange="javascript:setValid(${idx})"/>2</label>
        <label><input type="radio" name="q${idx}" value="3" onChange="javascript:setValid(${idx})"/>3</label>
        <label><input type="radio" name="q${idx}" value="4" onChange="javascript:setValid(${idx})"/>4</label>
      </div>
    </div>
  </div>`;
};

let resShown = false;

const setValid = (idx) => {
  const elem = document.getElementById(`q${idx}_wrapper`);
  elem.classList.remove("invalid");
  elem.classList.add("valid");
  if (resShown) {
    showResults(false);
  }
};

const calc = (withAlert = true) => {
  let total = 0;
  let invalids = 0;
  for (let i = 0; i < i18n.qs.length; i++) {
    const radios = document.getElementsByName(`q${i}`);
    let invalid = true;
    for (const r of radios) {
      if (r.checked) {
        invalid = false;
        total += parseInt(r.value, 10);
      }
    }
    const elem = document.getElementById(`q${i}_wrapper`);
    if (invalid) {
      invalids++;
      elem.classList.add("invalid");
    }
  }
  if (invalids && withAlert) {
    setTimeout(() => {
      alert(i18n.invalid.replace("$1", invalids));
    }, 0);
    total = -1;
  }
  return total;
};

const div = (txt, css = "") =>
  css ? `<div class="${css}">${txt}</div>` : `<div>${txt}</div>`;

const showResults = (withAlert = true) => {
  const total = calc(withAlert);
  let h = "";
  if (total > -1) {
    const score = (100 * total) / 80;
    h = div(i18n.score.replace("$1", score));
    if (score < 10) {
      h += div(i18n.scores[0]);
    } else if (score < 30) {
      h += div(i18n.scores[1]);
    } else if (score < 50) {
      h += div(i18n.scores[2]);
    } else if (score < 70) {
      h += div(i18n.scores[3]);
    } else if (score < 90) {
      h += div(i18n.scores[4]);
    } else {
      h += div(i18n.scores[5]);
    }

    h +=
      div(i18n.more) +
      div(i18n.more2) +
      div(
        `<button onclick="window.print()">${i18n.print}</button>` +
          `<button onclick="gotoLolo()">${i18n.improve}</button>`,
        "submit"
      );
    document.getElementById("score").innerHTML = h;
    resShown = true;
  }
};

const gotoLolo = () => {
  window.open("https://laurentpellet.com/coaching/", "_blank");
};

const setup = () => {
  const hRs = i18n.rs.map((r, idx) => `<div>${idx} = ${r}</div>`).join("");
  document.getElementById("intro").innerHTML =
    div(i18n.intro, "no-print") + div(hRs);

  let hTest = i18n.qs.map(question).join("");
  hTest += div(
    `<button onclick="showResults()">${i18n.submit}</button>`,
    "submit"
  );
  document.getElementById("test").innerHTML = hTest;
};
