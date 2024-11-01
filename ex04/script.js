const inputAltura = document.getElementById("inputAltura");
const inputPeso = document.getElementById("inputPeso");
const btCalcular = document.getElementById("btCalcular");
const pResult = document.getElementById("pResult");

function handleBtCalcularClick() {
  if (!inputAltura.value) {
    alert("Digite a altura");
    return;
  }

  if (!inputPeso.value) {
    alert("Digite o peso");
    return;
  }

  const altura = Number(inputAltura.value);
  const peso = Number(inputPeso.value);
  const imc = peso / altura ** 2;
  pResult.innerHTML = "IMC = " + imc.toFixed(2);
}

btCalcular.onclick = handleBtCalcularClick;
