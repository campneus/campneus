document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("KrANAM6vU27xSj2YI");

    const users = {
        "edgard.freitas": "pirelli",
        "alex.cancian": "pirelli123",
        "carlos.buzatto": "pirelli123",
        "mayara.ferreira": "pirelli123"
    };

    const usuariosSemRestricao = ["edgard.freitas", "alex.cancian", "rodrigo.silveira@pirelli.com", "rodrigo.martins"];

    function login() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const now = new Date();
        const hours = now.getHours();

        const isUserAllowedAnytime = usuariosSemRestricao.includes(username);
        if (!isUserAllowedAnytime && (hours < 7.5 || hours >= 18.5)) {
            document.getElementById("error").textContent = "O acesso só é permitido das 07:30 às 18:30.";
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

        var serviceID = "service_7lubw8a";
        var templateID = "template_n7glcjm";

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
        selectDashboard("https://app.powerbi.com/view?r=eyJrIjoiOWI2OTRkYTUtNjBiZC00YWM1LTllZTEtMmQ2MWIyNTJjMzI4IiwidCI6IjMxMjY2ODM1LTYwNDAtNGRlZS04NzA2LTkzY2M4OTYyMTYwNCJ9");
    });
    document.getElementById("atacadoButton").addEventListener("click", function() {
        selectDashboard("https://app.powerbi.com/view?r=eyJrIjoiZDhlY2U0YjMtZWZjOS00NjA5LWEyOGQtMzYzZWI4MzFiYmFhIiwidCI6IjMxMjY2ODM1LTYwNDAtNGRlZS04NzA2LTkzY2M4OTYyMTYwNCJ9");
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
