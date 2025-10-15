let stopwatchInterval = null;
let stopwatchTime = 0;
let stopwatchRunning = false;

let timerInterval = null;
let timerTime = 0;
let timerRunning = false;

function switchTab(tab, event) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tab).classList.add('active');
}

function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatTimerDisplay(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        let startTime = Date.now() - stopwatchTime;
        
        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            document.getElementById('stopwatchDisplay').textContent = formatTime(stopwatchTime);
        }, 10);
    }
}

function pauseStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    document.getElementById('stopwatchDisplay').textContent = '00:00:00';
}

function startTimer() {
    if (!timerRunning) {
        if (timerTime === 0) {
            let minutes = parseInt(document.getElementById('minutesInput').value) || 0;
            let seconds = parseInt(document.getElementById('secondsInput').value) || 0;
            timerTime = minutes * 60 + seconds;
            
            if (timerTime === 0) {
                alert('時間を設定してください');
                return;
            }
        }
        
        timerRunning = true;
        
        timerInterval = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                document.getElementById('timerDisplay').textContent = formatTimerDisplay(timerTime);
            } else {
                pauseTimer();
                alert('タイマー終了！');
            }
        }, 1000);
    }
}

function pauseTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    timerTime = 0;
    
    let minutes = parseInt(document.getElementById('minutesInput').value) || 5;
    let seconds = parseInt(document.getElementById('secondsInput').value) || 0;
    document.getElementById('timerDisplay').textContent = formatTimerDisplay(minutes * 60 + seconds);
}

document.getElementById('minutesInput').addEventListener('input', () => {
    if (!timerRunning) {
        resetTimer();
    }
});

document.getElementById('secondsInput').addEventListener('input', () => {
    if (!timerRunning) {
        resetTimer();
    }
});