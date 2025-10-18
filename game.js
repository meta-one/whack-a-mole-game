class WhackAMoleGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 30;
        this.highScore = this.loadHighScore();
        this.isPlaying = false;
        this.moleTimer = null;
        this.countdownTimer = null;
        this.activeMole = null;

        this.initElements();
        this.initEventListeners();
        this.updateDisplay();
    }

    initElements() {
        this.scoreElement = document.getElementById('score');
        this.timeElement = document.getElementById('time');
        this.highScoreElement = document.getElementById('highScore');
        this.startBtn = document.getElementById('startBtn');
        this.holes = document.querySelectorAll('.hole');
        this.moles = document.querySelectorAll('.mole');
    }

    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());

        this.moles.forEach((mole, index) => {
            mole.addEventListener('click', () => this.whackMole(index));
        });
    }

    startGame() {
        if (this.isPlaying) return;

        this.resetGame();
        this.isPlaying = true;
        this.startBtn.disabled = true;
        this.startBtn.textContent = '游戏进行中...';

        this.startCountdown();
        this.popUpMole();
    }

    resetGame() {
        this.score = 0;
        this.timeLeft = 30;
        this.updateDisplay();
        this.moles.forEach(mole => {
            mole.classList.remove('up', 'whacked');
        });
    }

    startCountdown() {
        this.countdownTimer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    popUpMole() {
        if (!this.isPlaying) return;

        // 隐藏当前地鼠
        if (this.activeMole !== null) {
            this.moles[this.activeMole].classList.remove('up');
        }

        // 随机选择新地鼠
        const randomIndex = this.getRandomHole();
        this.activeMole = randomIndex;
        this.moles[randomIndex].classList.add('up');
        this.moles[randomIndex].classList.remove('whacked');

        // 随机时间后弹出下一个地鼠（提高难度随时间递增）
        const difficulty = Math.max(400, 1000 - (30 - this.timeLeft) * 20);
        const randomTime = this.randomTime(difficulty, difficulty + 600);

        this.moleTimer = setTimeout(() => this.popUpMole(), randomTime);
    }

    getRandomHole() {
        const index = Math.floor(Math.random() * this.moles.length);
        // 避免连续两次同一个洞
        if (index === this.activeMole && this.moles.length > 1) {
            return this.getRandomHole();
        }
        return index;
    }

    randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    whackMole(index) {
        if (!this.isPlaying) return;

        const mole = this.moles[index];

        // 只有当地鼠弹起且未被击打时才计分
        if (mole.classList.contains('up') && !mole.classList.contains('whacked')) {
            this.score++;
            mole.classList.add('whacked');
            this.updateDisplay();

            // 击中后快速收回
            setTimeout(() => {
                mole.classList.remove('up');
            }, 300);
        }
    }

    endGame() {
        this.isPlaying = false;
        clearTimeout(this.moleTimer);
        clearInterval(this.countdownTimer);

        // 隐藏所有地鼠
        this.moles.forEach(mole => {
            mole.classList.remove('up', 'whacked');
        });

        // 更新最高分
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
            this.updateDisplay();
            alert(`🎉 恭喜！新纪录：${this.score} 分！`);
        } else {
            alert(`游戏结束！你的得分：${this.score} 分`);
        }

        this.startBtn.disabled = false;
        this.startBtn.textContent = '再玩一次';
    }

    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.timeElement.textContent = this.timeLeft;
        this.highScoreElement.textContent = this.highScore;
    }

    loadHighScore() {
        const saved = localStorage.getItem('whackAMoleHighScore');
        return saved ? parseInt(saved) : 0;
    }

    saveHighScore() {
        localStorage.setItem('whackAMoleHighScore', this.highScore);
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new WhackAMoleGame();
});
