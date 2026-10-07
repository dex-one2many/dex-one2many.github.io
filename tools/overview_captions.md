# overview.mp4 · caption cue sheet

Times are in the final video (intro card 7.7 s, contrast 46.1 s, body 178.2 s, then the results). A body scene plays at `speed` x when its caption needs less time than the source window (need = 1.0 s + words / 2.8; 0.6-2.0x). `TTS s` = words / 2.5, the narration time if one is added.

| # | start | end | shown s | speed | source s | words | TTS s | caption |
|---|---|---|---|---|---|---|---|---|
| 1 | 00:00.600 | 00:07.287 | 6.7 | 1.00 | 7.7 | 15 | 6.0 | We introduce Dex-One2Many, a framework that learns generalizable dexterous manipulation from a single human video. |
| 2 | 00:07.687 | 00:17.452 | 9.8 | 1.00 | 9.8 | 28 | 11.2 | Existing methods use the human video as execution-level guidance: they track the hand and object motion in the video and train the robot to reproduce that exact trajectory. |
| 3 | 00:17.452 | 00:24.072 | 6.6 | 1.00 | 6.6 | 21 | 8.4 | Trained in simulation and deployed zero-shot on the real robot, such a policy works in the configuration shown in the video. |
| 4 | 00:24.072 | 00:26.673 | 2.6 | 1.00 | 2.6 | 5 | 2.0 | What if the configuration changes? |
| 5 | 00:26.673 | 00:32.673 | 6.0 | 1.00 | 6.0 | 15 | 6.0 | With the object placed differently, the demonstrated trajectory no longer fits, and the policy fails. |
| 6 | 00:32.673 | 00:38.217 | 5.5 | 1.00 | 5.5 | 13 | 5.2 | To handle configurations beyond the ones shown in the video, we propose Dex-One2Many. |
| 7 | 00:38.217 | 00:47.217 | 9.0 | 1.00 | 9.0 | 17 | 6.8 | Trained from the same single human video, Dex-One2Many completes the task in configurations the video never showed. |
| 8 | 00:47.217 | 00:53.837 | 6.6 | 1.00 | 6.6 | 19 | 7.6 | Our key idea is to abstract the video into stage-wise scene graphs, and let RL learn how to act. |
| 9 | 00:54.137 | 00:58.708 | 4.6 | 0.63 | 2.9 | 10 | 4.0 | The input is a single human video of the task. |
| 10 | 00:58.908 | 01:11.694 | 12.8 | 0.70 | 9.0 | 33 | 13.2 | A vision-language model abstracts the video into one scene graph per stage. Each edge is a predicate, a hand–object or object–object relation such as grasp or inside; the stage sequence gives their order. |
| 11 | 01:11.894 | 01:16.108 | 4.2 | 0.78 | 3.3 | 9 | 3.6 | Object poses, goal poses, and grasps are left free. |
| 12 | 01:16.238 | 01:22.747 | 6.5 | 0.96 | 6.2 | 15 | 6.0 | Each stage graph serves as a generative constraint for sampling reset states; here, Stage 3. |
| 13 | 01:22.847 | 01:28.133 | 5.3 | 1.07 | 5.7 | 12 | 4.8 | First, the anchor object, the pot, is placed anywhere in the workspace. |
| 14 | 01:28.233 | 01:33.519 | 5.3 | 1.22 | 6.4 | 12 | 4.8 | Then Pikachu is sampled where the pre-inside predicate holds, near the pot. |
| 15 | 01:33.579 | 01:42.079 | 8.5 | 1.05 | 8.9 | 21 | 8.4 | For the grasp predicate, the hand is placed at one of many synthesized multi-finger grasps, each with a verified closing command. |
| 16 | 01:42.179 | 01:48.893 | 6.7 | 0.84 | 5.7 | 16 | 6.4 | Each sampled state is instantiated in simulation and kept only if it is collision-free and stable. |
| 17 | 01:48.993 | 01:58.160 | 9.2 | 1.47 | 13.5 | 22 | 8.8 | Repeating this yields many reset states from one graph: different pot positions, object poses, and grasps that all satisfy the same relations. |
| 18 | 01:59.560 | 02:08.417 | 8.9 | 1.06 | 9.4 | 22 | 8.8 | The same procedure is applied to every stage, from the empty-hand start to the goal, reproducing the video's graph sequence in simulation. |
| 19 | 02:08.517 | 02:13.089 | 4.6 | 1.26 | 5.8 | 10 | 4.0 | Ten thousand verified states per stage form the initial-state distribution. |
| 20 | 02:14.729 | 02:20.729 | 6.0 | 1.12 | 6.7 | 14 | 5.6 | The graph is embodiment-agnostic: only the robot model and its grasp set are swapped. |
| 21 | 02:22.259 | 02:26.486 | 4.2 | 1.38 | 5.8 | 7 | 2.8 | Four arm–hand embodiments share one task specification. |
| 22 | 02:27.116 | 02:34.544 | 7.4 | 0.80 | 6.0 | 18 | 7.2 | RL episodes start uniformly from the reset states of every stage, in tens of thousands of parallel environments. |
| 23 | 02:34.574 | 02:44.524 | 10.0 | 0.60 | 6.0 | 26 | 10.4 | For visualization, the environments are arranged in rows by the stage their episode starts from, Stage 4 at the top and Stage 0 at the bottom. |
| 24 | 02:44.554 | 02:48.439 | 3.9 | 1.65 | 6.4 | 7 | 2.8 | Training from stage-wise resets proceeds as follows. |
| 25 | 02:48.469 | 02:53.755 | 5.3 | 1.09 | 5.8 | 12 | 4.8 | With dense predicate rewards, the stages nearest the goal are learned first. |
| 26 | 02:53.785 | 02:58.714 | 4.9 | 1.18 | 5.8 | 11 | 4.4 | Success then propagates backward, since the later stages are already solved. |
| 27 | 02:58.754 | 03:04.039 | 5.3 | 1.13 | 6.0 | 12 | 4.8 | Eventually the full task is solved from the empty-hand start, stage 0. |
| 28 | 03:04.079 | 03:10.896 | 6.8 | 0.93 | 6.4 | 15 | 6.0 | In ablations, removing stage-wise resets drops success from over 90 % to about 16 %. |
| 29 | 03:10.936 | 03:16.222 | 5.3 | 1.15 | 6.1 | 12 | 4.8 | The same procedure trains all four embodiments; each learns the full task. |
| 30 | 03:16.252 | 03:20.823 | 4.6 | 1.29 | 5.9 | 10 | 4.0 | The trained policy completes the task from an empty hand. |
| 31 | 03:23.023 | 03:29.738 | 6.7 | 0.84 | 5.6 | 16 | 6.4 | We evaluate on 500 episodes per embodiment, with initial and goal positions sampled across the workspace. |
| 32 | 03:29.878 | 03:37.663 | 7.8 | 1.44 | 11.2 | 19 | 7.6 | No grasp is retargeted from the video; the policy adopts different grasp types depending on where the object is. |
| 33 | 03:37.713 | 03:45.183 | 7.5 | 0.70 | 5.2 | 18 | 7.2 | The other embodiments are evaluated the same way; across five tasks, the four average about 95 % success. |
| 34 | 03:45.283 | 03:51.998 | 6.7 | 0.89 | 6.0 | 16 | 6.4 | Each embodiment learns its own grasps for the same task structure, from the same single video. |
| 35 | 03:52.037 | 04:00.029 | 8.0 | 1.00 | 8.0 | 24 | 9.6 | In simulation, each task is learned from one human video for four arm–hand embodiments — only the robot model and its grasp set change. |
| 36 | 04:00.029 | 04:07.029 | 7.0 | 1.00 | 7.0 | 12 | 4.8 | Direct manipulation: grasp the object and move it to the target configuration. |
| 37 | 04:07.029 | 04:14.029 | 7.0 | 1.00 | 7.0 | 15 | 6.0 | Success rates over 500 episodes per task, with initial object positions sampled across the workspace. |
| 38 | 04:14.029 | 04:21.029 | 7.0 | 1.00 | 7.0 | 18 | 7.2 | Tool use: grasp a tool and act on another object — the same predicate rewards, no task-specific design. |
| 39 | 04:21.029 | 04:28.176 | 7.1 | 1.00 | 7.1 | 10 | 4.0 | Across five tasks, the four embodiments average 94.6–96.8 % success. |
| 40 | 04:28.176 | 04:39.483 | 11.3 | 1.00 | 11.3 | 26 | 10.4 | Zero-shot sim-to-real on UR3 + Wuji 1. On configurations never shown in the video: 60–85 % success, where the baselines stay at or below 15 %. |
