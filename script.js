// Reproducción de música
let musicPlaying = false;
const music = new Audio('multimedia/Listen To Your Heart.mp3');
function toggleMusic() {
  musicPlaying ? music.pause() : music.play();
  musicPlaying = !musicPlaying;
}

// Scroll a sección
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Juego de preguntas
const questions = [
  { question: "¿Dónde fue su primera cita?", answers: [{ text: "En el cine", correct: true }, { text: "En un restaurante", correct: false }, { text: "En un parque", correct: false }] },
  { question: "¿Qué mascota tienen juntos?", answers: [{ text: "Un perro", correct: true }, { text: "Un gato", correct: false }, { text: "Un conejo", correct: false }] },
  { question: "¿Como se llama su perrijo?", answers: [{ text: "Duki", correct: false }, { text: "Pupi", correct: false }, { text: "Duko", correct: true }] },
  { question: "¿Quien es fanatico de las comedias romanticas?", answers: [{ text: "Abi", correct: false }, { text: "Gonza", correct: true }] },
  { question: "¿En qué lugar le pidio compromiso Gonza a Abi <3 ?", answers: [{ text: "Rosedal de Palermo", correct: false }, { text: "Jardin japones", correct: true }, { text: "En su casa", correct: false }] },
  { question: "La actividad favorita de Abi es:", answers: [{ text: "Salir de joda", correct: false }, { text: "Ver series y comer ramen", correct: true }, { text: "Hacer deporte", correct: false }] },
  { question: "La actividad favorita de Gonza es:", answers: [{ text: "Jugar a la pelota", correct: true }, { text: "Jugar al padel", correct: false }, { text: "Jugar a la pelota 😂", correct: true }] },
  { question: "¿Cuál es el destino para su luna de miel?", answers: [{ text: "Misiones y Brasil", correct: false }, { text: "Mendoza y Chile", correct: false }, { text: "Bariloche y Brasil", correct: true }] }
];

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('score').textContent = '';
  showQuestion();
}

function showQuestion() {
  const questionContainer = document.getElementById('game-container');
  questionContainer.innerHTML = '';
  
  const questionElement = document.createElement('h3');
  questionElement.textContent = questions[currentQuestionIndex].question;
  questionContainer.appendChild(questionElement);

  questions[currentQuestionIndex].answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-button');
    button.onclick = () => selectAnswer(answer.correct, button);
    questionContainer.appendChild(button);
  });
}

function selectAnswer(isCorrect, button) {
  if (isCorrect) {
    button.style.backgroundColor = 'green';
    score++;
  } else {
    button.style.backgroundColor = 'red';
  }
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }, 500);
}

function showScore() {
  document.getElementById('score').textContent = `Puntuación: ${score} de ${questions.length}`;
}

document.addEventListener('DOMContentLoaded', startGame);
// Configura la fecha del evento (en este ejemplo, 29 de noviembre a las 8:00 am)
const eventDate = new Date('November 29, 2024 08:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  // Cálculo de días, horas, minutos y segundos
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Muestra la cuenta regresiva en el div con id="countdown"
  document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // Si la cuenta regresiva termina, muestra un mensaje
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById('countdown').innerHTML = "¡Es el gran día!";
  }
}

// Actualiza la cuenta regresiva cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);
