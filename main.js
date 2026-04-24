const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.16 },
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll("[data-final]").forEach((element) => {
  element.textContent = element.dataset.final;
});

document.querySelectorAll("form[data-netlify]").forEach((form) => {
  form.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(form).entries());
    const payloadField = form.querySelector("[data-json-payload]");
    if (payloadField) {
      payloadField.value = JSON.stringify(data, null, 2);
    }
  });
});

const calculatorInputs = document.querySelectorAll("[data-calc-input]");
const calculatorOutput = document.querySelector("[data-calc-output]");

function updateRevenueEstimate() {
  if (!calculatorOutput || calculatorInputs.length === 0) return;

  const values = Object.fromEntries(
    [...calculatorInputs].map((input) => [input.dataset.calcInput, Number(input.value) || 0]),
  );
  const protectedRevenue = values.cases * values.value * (values.reduction / 100);
  calculatorOutput.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(protectedRevenue);
}

calculatorInputs.forEach((input) => {
  input.addEventListener("input", updateRevenueEstimate);
});

updateRevenueEstimate();
