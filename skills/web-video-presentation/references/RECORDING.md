# 录制与后期合成

网页做完后有三种录制路径：

| 路径 | 适用场景 | 需要准备 |
|---|---|---|
| **Auto 模式** | 已合成音频 | Phase 3 音频合成完成 |
| **Timeline 模式** | 有逐字稿时间戳，不想合成音频 | 运行 `map-timeline.mjs` 生成 `timeline.ts` |
| **Manual 模式** | 无音频无逐字稿 | 无额外准备 |

Timeline 模式和 Auto 模式都支持一镜到底录屏，不需要手动点击推进。

---

## 推荐流程：Auto 模式一镜到底

### 前置

- 章节代码做完，每章都有 `narrations.ts`
- 已经跑过 `npm run extract-narrations` + `npm run synthesize-audio`，
  `public/audio/<id>/<step>.mp3` 全部就位
- `npm run dev` 跑着，浏览器能打开页面

### 录制步骤

1. **浏览器全屏**（F11 / Ctrl+Cmd+F），URL 改成
   `http://localhost:5173/?auto=1`
2. 看到 "Press SPACE to start" 蒙层 = Auto 模式就绪
3. **打开屏幕录制**（QuickTime / OBS / Cmd+Shift+5），开始录
4. **按一次 Space** → 蒙层消失 → step 0 出现，1.mp3 自动播 →
   播完自动推进到 step 1 → 2.mp3 → … → 最后一个 step 播完 → 停在终态
5. **停止录制** → 后期裁掉头尾（Space 那一下、最后停在终态的尾巴）就是
   成品

整个过程**完全不用点鼠标**。音视频天然同步，不需要后期对轨。

> **Auto 模式严格按音频结束推进**（+ 200ms 缓冲），没有"等动画跑完"
> 的兜底。如果你看到某步动画被切了一半 → 说明该 step 动画长于口播，
> 回章节代码改：写更长口播 / 拆 step / 调动画速度。

### 录屏工具

| 平台 | 工具 | 设置 |
|---|---|---|
| macOS | Cmd+Shift+5 → 录制选定窗口 | 选浏览器窗口；浏览器全屏后输出就是 1920×1080 |
| macOS | QuickTime → 文件 → 新建屏幕录制 | 同上 |
| 跨平台 | OBS Studio | 窗口捕获，Canvas 1920×1080，60fps |

### 模式速查

| URL / 快捷键 | 行为 |
|---|---|
| 直接打开（默认） | Manual：点击 / ←→ 推进，不播音频 |
| `?audio=1` 或按 `M` | Audio：进入 step 自动播音频，但**手动点鼠标推进** |
| `?auto=1` 或再按 `M` | Auto：进入 step 自动播 + 自动推进（录制用，需音频） |
| `?timeline=1` 或再按 `M` | Timeline：根据逐字稿时间线自动推进（录制用，无需音频） |
| Auto/Timeline 模式下首次按 `Space` | 启动自动播放（绕过浏览器自动播放限制） |

也可以鼠标移到右上角，会出现一个隐藏的模式切换按钮。

---

## Timeline 模式一镜到底（无音频）

如果你有逐字稿时间戳但没有合成音频，Timeline 模式提供了和 Auto 模式一样的
一镜到底体验：

1. 准备好 `逐字稿.md`（SRT 格式），运行 `node scripts/map-timeline.mjs`
2. 浏览器打开 `http://localhost:5173/?timeline=1`
3. 开始屏幕录制
4. 按 **Space** 启动 → 幻灯片按时间线自动推进 → 最后一个 step 停在终态
5. 停止录制 → 裁头尾即成片

详细配置见 [`TIMELINE-PLAYBACK.md`](TIMELINE-PLAYBACK.md)。

---

## 备用流程：没合成音频时手动录屏

如果你跳过了音频合成（`Checkpoint Audio` 选了"不合成"），按老方法：

1. 浏览器全屏 → 打开 `localhost:5173`（默认 Manual 模式）
2. **刷新一次**清空历史 step
3. 开始录屏 → 按口播节奏点击空白推进 step
4. 后期用任何剪辑软件配音 + 调时间线

### 后期工具

| 工具 | 适合 |
|---|---|
| **DaVinci Resolve** | 跨平台免费、能处理多段音频拼接 |
| **iMovie** | macOS 简单场景 |
| **CapCut / 剪映** | B 站 / 抖音风加字幕 |

---

> agent 在 Checkpoint Audio 后**主动告诉用户**上面 Auto 模式录屏的
> 路径，让用户知道下一步怎么把网页变成 mp4。
