document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("KrANAM6vU27xSj2YI"); // Public Key do EmailJS

    const users = {
        "edgard.freitas": "pirelli",
        "alex.cancian": "pirelli123",
        "carlos.buzatto": "pirelli123",
        "mayara.ferreira": "pirelli123",
        "guilhermesilva.santos@campneus.com.br": "TTPfbz861",
        "rosane.monteiro@campneus.com.br": "PLZhss605",
        "fernanda.teruel@campneus.com.br": "LWUmkl789",
        "bismark.bispo@campneus.com.br": "NCPenn696",
        "adilson.silva@campneus.com.br": "SWUliz821",
        "nilton.santos@campneus.com.br": "UMIkny104",
        "valdir.souza@campneus.com.br": "BJTtut519",
        "ruggero.prata@campneus.com.br": "SLWhzf100",
        "kelson.novaes@campneus.com.br": "RZTpud927",
        "andre.tome@campneus.com.br": "UWQmiw858",
        "elton.milczuk@campneus.com.br": "GYFgrz173",
        "adriano.santana@campneus.com.br": "WOFgbh567",
        "anderson.santos@pirelli.com":"NIEqpm802",
        "tyago.aguiar@pirelli.com":"YIFuiu841",
        "antonio.oliveira@pirelli.com":"KVEoca591",
        "jefferson.santos@pirelli.com":"KHLneb544",
        "emilio.amaral@pirelli.com":"YSMieu017",
        "graciane.dias@pirelli.com":"BRLjta416",
        "rogerio.silva@pirelli.com":"AQLmxh460",
        "kelvin.mendonca@pirelli.com":"TIAvwy136",
        "rodrigo.silveira@pirelli.com":"HADjww254",
        "jader.mourato@pirelli.com":"BIMhfo940",
        "rodrigo.martins":"QQAzaa10"
    };

    // Lista de usuários que podem logar a qualquer hora
    const usuariosSemRestricao = ["edgard.freitas", "alex.cancian", "rodrigo.silveira@pirelli.com", "rodrigo.martins"];

    function login() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const now = new Date();
        const hours = now.getHours();

        // Verifica se o usuário está na lista de exceções
        const isUserAllowedAnytime = usuariosSemRestricao.includes(username);

        // Se o usuário não estiver na lista de exceções, aplica a restrição de horário
        if (!isUserAllowedAnytime && (hours < 8 || hours >= 17)) {
            document.getElementById("error").textContent = "O acesso só é permitido das 08:00 às 17:00.";
            return;
        }

        if (users[username] === password) {
            document.getElementById("loginContainer").classList.add("hidden");
            document.getElementById("welcomeContainer").style.display = "flex";
            document.getElementById("logoutButton").classList.remove("hidden");

            const iframe = document.getElementById("dashboardFrame");
            iframe.src = "https://app.powerbi.com/view?r=eyJrIjoiNjQ1Yjc0YzctZDQyZi00NDJiLTg3OGQtNWIyZmY4ZThlMWI2IiwidCI6IjMxMjY2ODM1LTYwNDAtNGRlZS04NzA2LTkzY2M4OTYyMTYwNCJ9";
            iframe.style.display = "block";

            sendMail(username);
        } else {
            document.getElementById("error").textContent = "Usuário ou senha incorretos";
        }
    }

    function logout() {
        document.getElementById("loginContainer").classList.remove("hidden");
        document.getElementById("welcomeContainer").style.display = "none";
        document.getElementById("logoutButton").classList.add("hidden");

        const iframe = document.getElementById("dashboardFrame");
        iframe.src = "";
        iframe.style.display = "none";
    }

    function sendMail(username) {
        var now = new Date();
        var formattedTime = now.toLocaleString();

        var params = {
            sendername: username,
            message: `O usuário ${username} realizou login no sistema em ${formattedTime}.`,
            timestamp: formattedTime
        };

        var serviceID = "service_7lubw8a";
        var templateID = "template_n7glcjm";

        emailjs.send(serviceID, templateID, params)
        .then(res => {
            console.log("Email enviado com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao enviar o email: ", error);
        });
    }

    document.getElementById("loginButton").addEventListener("click", login);
    document.getElementById("password").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            login();
        }
    });
    document.getElementById("logoutButton").addEventListener("click", logout);
});
