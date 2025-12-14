const qs = [
  "Je connais mes grands objectifs professionnels et personnels.",
  "Je sais ce que mon entreprise attend de moi.",
  "Mon agenda reflète mes priorités et intègre des créneaux pour mes sujets de fond.",
  "Je me sens en contrôle de mon agenda",
  "Je prends du plaisir en faisant mes tâches pro et perso.",
  "Je connais mon biorythme et j'organise mes tâches en conséquence.",
  "Je garde des marges de manœuvre pour absorber les imprévus.",
  "Je sais me protéger des interruptions quand je dois me concentrer.",
  'Je sais dire "non" aux sollicitations pour des tâches sans importance pour moi.',
  "Je suis en maitrise et à jour de mes emails et messages.",
  "Je consulte mes emails et messages à des moments bien définis.",
  "Je ne procrastine pas et suis à jour de mes micro-tâches.",
  "Je traite mes micro-tâches dans des plages dédiées.",
  "Je délègue toutes les tâches pro et perso qui peuvent l'être.",
  "Je challenge régulièrement ma façon de travailler et de m'organiser.",
  "J'ai un équilibre Pro/perso qui me permet de rester serein(e) et performant(e) sur la durée",
  "Je suis pleinement présent(e) dans ma vie personnelle et pour mes proches.",
  "J'ai un sommeil de qualité et suffisant pour être en forme la journée.",
  "J'ai des plages réservées pour mes activités sportives, sociales et familiales.",
  "Je termine chaque journée en sachant ce que je ferai le lendemain.",
];

const rs = [
  "Pas du tout d'accord",
  "Plutôt pas d'accord",
  "Neutre",
  "Plutôt d'accord",
  "Tout à fait d'accord",
];

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
  if (resShown) {
    showResults(false);
  }
};

const calc = (withAlert = true) => {
  let total = 0;
  let invalids = 0;
  for (let i = 0; i < qs.length; i++) {
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
      alert(
        `Veuillez répondre à toutes les questions. Il en reste ${invalids} sans réponse.`
      );
    }, 0);
    total = -1;
  }

  return total;
};

const showResults = (withAlert = true) => {
  const total = calc(withAlert);
  let h = "";
  if (total > -1) {
    const score = (100 * total) / 80;
    h = `<div>Votre score total est de <span>${score}%</span>.</div>`;
    if (score < 10) {
      h += `<div>Votre gestion du temps semble très insuffisante. Il est fortement recommandé de revoir vos méthodes d'organisation et de planification pour améliorer votre efficacité et réduire le stress lié à une mauvaise gestion du temps.</div>`;
    } else if (score < 30) {
      h += `<div>Votre gestion du temps est insuffisante. Il serait bénéfique d'adopter de nouvelles stratégies d'organisation et de priorisation pour mieux gérer vos tâches et responsabilités.</div>`;
    } else if (score < 50) {
      h += `<div>Votre gestion du temps est moyenne. Vous pourriez améliorer votre efficacité en affinant vos techniques d'organisation et en vous concentrant davantage sur vos priorités.</div>`;
    } else if (score < 70) {
      h += `<div>Votre gestion du temps est bonne. Vous avez une approche efficace, mais il y a encore des opportunités pour optimiser davantage votre organisation et votre planification.</div>`;
    } else if (score < 90) {
      h += `<div>Votre gestion du temps est très bonne. Vous maîtrisez bien vos méthodes d'organisation et de planification, ce qui vous permet d'être efficace et productif dans vos activités quotidiennes.</div>`;
    }
    h += `<div>Pour aller plus loin, découvrez nos ressources et formations sur la gestion du temps: <a href="https://www.laurentpellet.com" target="_blank">www.laurentpellet.com</a></div>`;
    document.getElementById("score").innerHTML = h;
    resShown = true;
  }
};

const setup = () => {
  const hRs = rs.map((r, idx) => `<div>${idx} = ${r}</div>`).join("");
  document.getElementById("resp").innerHTML = hRs;

  let hTest = qs.map(question).join("");
  hTest += `<div class="submit">
    <button onclick="showResults()">Calculer mon score</button>
  </div>`;
  document.getElementById("test").innerHTML = hTest;
};
