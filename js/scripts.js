console.log("Mazinho Big Daddy na área!");

// selects
const gerarSenhaButton = document.querySelector("#gerar_btn");
const divSenhaGerada = document.querySelector("#senha_gerada");
//new
const optContainer = document.querySelector("#gerar_opt");
const abreOptSpanButton = document.querySelector("#abre_opt");
const inputTamanho = document.querySelector("#tamanho");
const inputLetras = document.querySelector("#letras");
const inputNumeros = document.querySelector("#numeros");
const inputSymbolos = document.querySelector("#symbolos");
const copiarSenhaBtn = document.querySelector("#copiar_senha");
const alertam = document.querySelector("#alerta1");
const alertan = document.querySelector("#alerta2");
const aSenha = document.querySelector("#password");

//funcs
const letrasMinusculas = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
const letrasMaiusculas = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
const numeros = () => {
    return Math.floor(Math.random() * 10).toString();
};
const symbolos = () => {
    const osSymbolos = "(){}[]=<>-+/,.!?@#$%&*;:_^~|";
    return osSymbolos[Math.floor(Math.random() * osSymbolos.length)];
};

const gerarSenha = (letrasMaiusculas, letrasMinusculas, numeros, symbolos) => {
    let senha = "";

    const tamanhoSenha = +inputTamanho.value;
    if (tamanhoSenha < 8) {
        alertam.classList.toggle("hide");
        setTimeout(() => {
            alertam.classList.toggle("hide");;
        }, 3000);
        return;
    };

    const geradores = [];
    if (inputLetras.checked) {
        geradores.push(letrasMaiusculas, letrasMinusculas);
    };
    if (inputNumeros.checked) {
        geradores.push(numeros);
    };
    if (inputSymbolos.checked) {
        geradores.push(symbolos);
    };
    if (geradores.length === 0) {
        alertan.classList.toggle("hide");
        setTimeout(() => {
            alertan.classList.toggle("hide");;
        }, 3000);
        return;
    }

    for (i = 0; i < tamanhoSenha; i = i + geradores.length) {
        geradores.forEach(() => {
            const valorAleatoreo = geradores[Math.floor(Math.random() * geradores.length)]();
            senha += valorAleatoreo;
        });
    };
    senha = senha.slice(0, tamanhoSenha);
    divSenhaGerada.style.display = "block";
    divSenhaGerada.querySelector("h4").innerText = senha;

    gerarSenhaButton.innerText = "Senha gerada!";
    setTimeout(() => {
        gerarSenhaButton.innerText = "Gerar outra senha";
    }, 3000);
};


// events
gerarSenhaButton.addEventListener("click", () => {
    gerarSenha(
        letrasMaiusculas,
        letrasMinusculas,
        numeros,
        symbolos
    );
});

abreOptSpanButton.addEventListener("click", () => {
    optContainer.classList.toggle("hide");
});

copiarSenhaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const senhaGerada = divSenhaGerada.querySelector("h4").innerText;
    navigator.clipboard.writeText(senhaGerada).then(() => {
        aSenha.value = senhaGerada;
        copiarSenhaBtn.innerText = "Copiado";
        setTimeout(() => {
            copiarSenhaBtn.innerText = "Copiar";
        }, 2000);
    });
    console.log("CTRL+C feito!")
})