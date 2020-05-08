const finalScore = document.getElementById("finalScore");
const recentScore = localStorage.getItem("recentScore");
finalScore.innerHTML = recentScore;