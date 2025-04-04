import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC9b7BXNm8HijR-k-GZUJeCJn5gT0rKBbk",
  authDomain: "campneus-dashboard.firebaseapp.com",
  projectId: "campneus-dashboard",
  storageBucket: "campneus-dashboard.firebasestorage.app",
  messagingSenderId: "172203992376",
  appId: "1:172203992376:web:91d4ddf048071f110d8dcd",
  measurementId: "G-E6MZYD2YXG"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.addEventListener("DOMContentLoaded", function () {

    function login() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                document.getElementById("loginContainer").style.display = "none";
                document.getElementById("selectionContainer").style.display = "block";
            })
            .catch((error) => {
                const errorMessage = error.message;
                document.getElementById("error").textContent = "Erro: " + errorMessage;
            });
    }

    function logout() {
        signOut(auth).then(() => {
            document.getElementById("selectionContainer").style.display = "none";
            document.getElementById("loginContainer").style.display = "block";
            document.getElementById("dashboardContainer").style.display = "none";
            document.getElementById("dashboardFrame").src = ""; // Limpar o iframe
        }).catch((error) => {
            console.error("Erro ao sair: ", error);
        });
    }

    function selectDashboard(url) {
        document.getElementById("selectionContainer").style.display = "none";
        document.getElementById("dashboardContainer").style.display = "block";
        const iframe = document.getElementById("dashboardFrame");
        iframe.src = url;
    }

    function sendResetEmail() {
        const email = document.getElementById("resetEmail").value;

        sendPasswordResetEmail(auth, email)
            .then(() => {
                document.getElementById("resetPasswordContainer").style.display = "none";
                document.getElementById("loginContainer").style.display = "block";
                alert("Email de recuperação enviado. Verifique sua caixa de entrada.");
            })
            .catch((error) => {
                const errorMessage = error.message;
                document.getElementById("resetError").textContent = "Erro: " + errorMessage;
            });
    }

    // Eventos de login
    document.getElementById("loginButton").addEventListener("click", login);
    document.getElementById("password").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            login();
        }
    });

    // Eventos de logout
    document.getElementById("logoutButton").addEventListener("click", logout);

    // Eventos de seleção de dashboards
    document.getElementById("varejoButton").addEventListener("click", function () {
        selectDashboard("https://app.powerbi.com/view?r=eyJrIjoiOWI2OTRkYTUtNjBiZC00YWM1LTllZTEtMmQ2MWIyNTJjMzI4IiwidCI6IjMxMjY2ODM1LTYwNDAtNGRlZS04NzA2LTkzY2M4OTYyMTYwNCJ9");
    });

    document.getElementById("atacadoButton").addEventListener("click", function () {
        selectDashboard("https://app.powerbi.com/view?r=eyJrIjoiZDhlY2U0YjMtZWZjOS00NjA5LWEyOGQtMzYzZWI4MzFiYmFhIiwidCI6IjMxMjY2ODM1LTYwNDAtNGRlZS04NzA2LTkzY2M4OTYyMTYwNCJ9");
    });

    // Voltar para a seleção de dashboards
    document.getElementById("backButton").addEventListener("click", function () {
        document.getElementById("dashboardContainer").style.display = "none";
        document.getElementById("selectionContainer").style.display = "block";
    });

    // Esqueci minha senha
    document.getElementById("forgotPasswordButton").addEventListener("click", function () {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("resetPasswordContainer").style.display = "block";
    });

    // Enviar email de recuperação
    document.getElementById("sendResetEmailButton").addEventListener("click", sendResetEmail);

    // Voltar para o login
    document.getElementById("backToLoginButton").addEventListener("click", function () {
        document.getElementById("resetPasswordContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    });
});
