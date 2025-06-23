// Get DOM elements
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const speakBtn = document.getElementById('speak-btn');

// Load voices and populate select
function populateVoices() {
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// On voices changed (some browsers load them async)
speechSynthesis.onvoiceschanged = populateVoices;
populateVoices();

speakBtn.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(textInput.value);
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[voiceSelect.value];
  utterance.rate = parseFloat(rate.value);
  utterance.pitch = parseFloat(pitch.value);
  speechSynthesis.speak(utterance);
});
