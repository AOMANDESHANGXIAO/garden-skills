# Timeline Playback —— 基于逐字稿时间线的自动播放

当你有一个带时间戳的口播逐字稿（如 SRT 字幕文件），但**不想走音频合成流程**
时，可以用 timeline 模式让幻灯片根据逐字稿的时间线自动切换 —— 无需任何
音频文件。

## 适用场景

- 有 AI 生成的 SRT 逐字稿（如剪映/飞书妙记/Pinpoint 等导出），想快速预览
  口播节奏
- 不想合成音频，但要自动录屏展示
- 想验证口播稿的节拍分配是否合理（每步时长直观可见）
- 在音频合成前做节奏校准

## 与 auto 模式的区别

| | auto 模式 | timeline 模式 |
|---|---|---|
| 驱动方式 | 音频文件 duration | 逐字稿时间戳 |
| 需要音频 | 是（mp3 per step） | 否 |
| 准备步骤 | Phase 3 音频合成 | 运行 `map-timeline.mjs` 一次 |
| 精度 | 取决于音频录制 | 取决于逐字稿时间戳精度 |

## 工作流

### 1. 准备逐字稿

将 SRT 格式的逐字稿放到 article 目录下，命名为 `逐字稿.md`：

```
1
00:00:00,000 --> 00:00:02,212
你有没有想过一个问题

2
00:00:02,212 --> 00:00:06,300
一瓶矿泉水为什么能和一本书交换
```

支持的格式：标准 SRT（序号 / 时间戳 / 文本 / 空行分隔）。时间戳格式为
`HH:MM:SS,mmm --> HH:MM:SS,mmm`。

### 2. 运行映射脚本

```bash
cd presentation
node scripts/map-timeline.mjs
```

脚本会：
1. 解析 `逐字稿.md` 的所有时间戳段落
2. 遍历每个章节的 `narrations.ts`，将 narration 文本匹配到对应段落
3. 输出 `src/timeline.ts`

**首次运行前**需要编辑 `scripts/map-timeline.mjs` 的配置部分：
- `TRANSCRIPT_PATH`：逐字稿文件路径
- `CHAPTERS` 数组：与 `src/registry/chapters.ts` 保持一致的章节列表

### 3. 验证输出

检查控制台输出，关注标记为 `[FALLBACK]` 的步骤 —— 这些步骤未能自动匹配
到逐字稿段落，使用了估算时长。常见原因是逐字稿与 narration 文本有细微差异
（如同音字：它/他、不/布等）。手动修正 `src/timeline.ts` 中对应条目的
`startMs`/`endMs` 即可。

### 4. 使用 timeline 模式

启动 dev server 后：

1. 按 **`M`** 键循环到 **TIMELINE** 模式（右上角蓝色指示灯）
2. 按 **`Space`** 键开始自动播放
3. 幻灯片按照逐字稿时间线自动切换
4. 可直接访问 `?timeline=1` 默认进入 timeline 模式

播放中可随时：
- 按 **`M`** 切换回其他模式
- 点击进度条跳转到任意章节/步骤（时钟会自动同步到该步骤的起始时间）
- 按 **`→`** / **`Space`** 手动跳过当前步骤

## 架构说明

### timeline.ts 数据格式

```ts
export interface StepTime {
  startMs: number;  // 该步的起始时间（距演示开始的毫秒数）
  endMs: number;    // 该步的结束时间
}

// TIMELINE[chapterIndex][stepIndex] = { startMs, endMs }
export const TIMELINE: StepTime[][] = [
  [  // Chapter 0
    { startMs: 0, endMs: 6300 },       // Step 0: 0.0s → 6.3s
    { startMs: 6300, endMs: 14810 },   // Step 1: 6.3s → 14.8s
  ],
  [  // Chapter 1
    // ...
  ],
];
```

### useTimelinePlayback hook

基于 `requestAnimationFrame` 的时钟循环：
- 记录开始时间，每帧计算 `elapsed = performance.now() - startTime`
- 当 `elapsed >= TIMELINE[chapter][step].endMs` 时触发 `onAdvance`
- 光标变化（手动跳转）时自动重同步时钟
- 到达最后一步时停止

### 与 useAudioPlayer 的关系

两个 hook 互斥：
- `useAudioPlayer`：在 `manual`/`audio`/`auto` 模式下工作
- `useTimelinePlayback`：仅在 `mode === "timeline" && autoStarted` 时激活

两者可以共存于 `App.tsx`，由 `mode` 决定谁在实际工作。

## 故障排查

| 问题 | 原因 | 解决 |
|---|---|---|
| 脚本只解析到 1 个段落 | 逐字稿格式不标准 | 检查行尾（需 `\n` 或 `\r\n`），检查时间戳格式 |
| 大量 `[FALLBACK]` 步骤 | 逐字稿文本与 narration 差异大 | 增加 `normalize()` 函数的字符替换；或手动修正 `timeline.ts` |
| timeline 模式不自动切换 | `useTimelinePlayback` 未接入 App.tsx | 检查 App.tsx 中 `timelineActive` 的条件和 hook 调用 |
| 按 Space 同时启动和跳步 | `useStepper` 的 Space 监听未被子级拦截 | 确认 `useAutoMode` 用了 capture phase 且 `stopImmediatePropagation` |
