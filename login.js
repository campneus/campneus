document.addEventListener("DOMContentLoaded", function () {
    function verificarEmailJS() {
        if (typeof emailjs === "undefined") {
            console.log("Aguardando carregamento do EmailJS...");
            setTimeout(verificarEmailJS, 500);
        } else {
            console.log("EmailJS carregado e pronto!");
        }
    }

    const users = {
        "edgard.freitas": "pirelli1",
        "alex.cancian": "pirelli123",
        "pedro.sales@pirelli.com": "Pirelli@9K25",
        "igor.mazzi": "Pirelli@998D",
        "carlos.buzatto": "pirelli123",
        "mayara.ferreira": "Pirelli@123",
        "guilhermesilva.santos@campneus.com.br": "TTPfbz861",
        "carlos.venancio@campneus.com.br": "AFGabn122",
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
        "rodrigo.martins":"QQAzaa10",
        "andressa.oliveira@campneus.com.br":"FMOdzs278",  
        "marcos.salomao@campneus.com.br":"OZTthm006",  
        "renato.andrade@campneus.com.br":"ULOyas490",  
        "herick.queiroz@campneus.com.br":"MVJbog516",  
        "teodolindo.torres@campneus.com.br":"QXGocb013",  
        "michael.vieira@campneus.com.br":"IJBaxq300",  
        "marcos.chioca@campneus.com.br":"JZVuhl466",  
        "angelo.damas@campneus.com.br":"TMXqjp567",  
        "luciano.gomes@campneus.com.br":"ESUinv271",  
        "alex.silva@campneus.com.br":"GVCjnp203",  
        "claudio.cardoso@campneus.com.br":"GJSaka872",  
        "bruno.ferreira@campneus.com.br":"UKDrep391",  
        "joao.bernardes@campneus.com.br":"EIZbdk621",  
        "jonathan.barreto@campneus.com.br":"FRGeri764"
    };

    const usuariosSemRestricao = ["edgard.freitas", "alex.cancian", "rodrigo.silveira@pirelli.com", "rodrigo.martins", "pedro.sales@pirelli.com"];

    function login() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const now = new Date();
        const hours = now.getHours();

        const isUserAllowedAnytime = usuariosSemRestricao.includes(username);
        if (!isUserAllowedAnytime && (hours < 7 || hours >= 19)) {
            document.getElementById("error").textContent = "O acesso só é permitido das 07:00 às 19:00.";
            return;
        }

        if (users[username] === password) {
            document.getElementById("loginContainer").style.display = "none";
            document.getElementById("selectionContainer").style.display = "flex";
            sendMail(username);
        } else {
            document.getElementById("error").textContent = "Usuário ou senha incorretos";
        }
    }

    function logout() {
        document.getElementById("loginContainer").style.display = "flex";
        document.getElementById("selectionContainer").style.display = "none";
        document.getElementById("dashboardContainer").style.display = "none";
        document.getElementById("dashboardFrame").src = "";
    }

    function selectDashboard(url) {
        document.getElementById("selectionContainer").style.display = "none";
        document.getElementById("dashboardContainer").style.display = "flex";
        const iframe = document.getElementById("dashboardFrame");
        iframe.src = url;
        iframe.style.display = "block";
    }

    function sendMail(username) {
        var now = new Date();
        var formattedTime = now.toLocaleString();
        var params = {
            sendername: username,
            message: `O usuário ${username} realizou login no sistema em ${formattedTime}.`,
            timestamp: formattedTime
        };

        var serviceID = "service_pgaxlwt";
        var templateID = "template_ebja9y1";

        emailjs.send(serviceID, templateID, params)
        .then(res => console.log("Email enviado com sucesso!"))
        .catch(error => console.error("Erro ao enviar o email: ", error));
    }

    document.getElementById("loginButton").addEventListener("click", login);
    document.getElementById("password").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            login();
        }
    });
    document.getElementById("logoutButton").addEventListener("click", logout);
    document.getElementById("varejoButton").addEventListener("click", function() {
        selectDashboard("https://app.powerbi.com/view?r=eyJrIjoiYmZiNTUyZGEtYTY4NC00MjI0LThhNWQtMjAzMGM2NmQ0NmVkIiwidCI6IjMxMjY2ODM1LTYwNDAtNGRlZS04NzA2LTkzY2M4OTYyMTYwNCJ9");
    });
    document.getElementById("atacadoButton").addEventListener("click", function() {
        selectDashboard("https://app.powerbi.com/view?r=eyJrIjoiZjVlZWU3Y2YtZjBhZS00MjhkLTg4NmMtZWViZjYyOTU5OWVhIiwidCI6IjMxMjY2ODM1LTYwNDAtNGRlZS04NzA2LTkzY2M4OTYyMTYwNCJ9");
    });
    //document.getElementById("industrialCarButton").addEventListener("click", function() {
    //    selectDashboard("");
    // });
    //document.getElementById("industrialMotoButton").addEventListener("click", function() {
    //    selectDashboard("");
    //});
    document.getElementById("backButton").addEventListener("click", function() {
        document.getElementById("dashboardContainer").style.display = "none";
        document.getElementById("selectionContainer").style.display = "flex";
    });
});
