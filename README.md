# 🔨 打地鼠游戏

一个简洁有趣的网页版打地鼠游戏,使用原生 HTML、CSS 和 JavaScript 开发。

## ✨ 功能特性

- 🎮 **简单易玩**：点击击打弹出的地鼠即可得分
- ⏱️ **30秒挑战**：在限定时间内尽可能获得高分
- 🏆 **最高分记录**：自动保存并显示历史最高分
- 📱 **响应式设计**：支持移动端和桌面端
- 🎨 **精美UI**：渐变色设计，流畅动画效果
- 🚀 **难度递增**：随游戏进行，地鼠出现速度加快

## 🚀 快速开始

### 在线体验

直接打开 `index.html` 文件即可在浏览器中游玩。

### 本地运行

1. 克隆仓库：
```bash
git clone https://github.com/meta-one/whack-a-mole-game.git
cd whack-a-mole-game
```

2. 使用浏览器打开 `index.html` 文件，或使用本地服务器：
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (http-server)
npx http-server
```

3. 在浏览器中访问 `http://localhost:8000`

## 🎯 游戏规则

1. 点击 **"开始游戏"** 按钮启动游戏
2. 地鼠会随机从9个洞口中弹出
3. 快速点击弹出的地鼠得分
4. 游戏时长为30秒
5. 挑战更高分数！

## 🛠️ 技术栈

- **HTML5**：游戏结构
- **CSS3**：样式和动画
- **JavaScript (ES6+)**：游戏逻辑
- **LocalStorage**：最高分持久化存储

## 📂 项目结构

```
whack-a-mole-game/
├── index.html      # 游戏主页面
├── style.css       # 样式文件
├── game.js         # 游戏逻辑
└── README.md       # 项目说明
```

## 🎨 核心实现

### 面向对象设计

使用 ES6 Class 组织代码，遵循**单一职责原则**：

```javascript
class WhackAMoleGame {
    constructor() { /* 初始化 */ }
    startGame() { /* 开始游戏 */ }
    whackMole() { /* 击打地鼠 */ }
    endGame() { /* 结束游戏 */ }
}
```

### 动态难度

游戏难度随时间递增，地鼠出现间隔逐渐缩短：

```javascript
const difficulty = Math.max(400, 1000 - (30 - this.timeLeft) * 20);
```

## 🔧 自定义配置

可在 `game.js` 中修改以下参数：

- `timeLeft`：游戏时长（默认30秒）
- `difficulty`：难度曲线
- 洞口数量：修改 HTML 中的 `.hole` 元素数量

## 📝 开发计划

- [ ] 添加音效
- [ ] 增加不同难度模式
- [ ] 添加炸弹地鼠（扣分机制）
- [ ] 多人对战模式
- [ ] 排行榜系统

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

Made with ❤️ by [meta-one](https://github.com/meta-one)
