# overview.mp4 · caption cue sheet

Times are in the final video (intro card 8.3 s, teaser 31.5 s, body 191.1 s, then the results). A body scene plays at `speed` x when its caption needs less time than the source window (need = 1.0 s + words / 2.8; max 2.0x). `TTS s` = words / 2.5, the narration time if one is added.

| # | start | end | shown s | speed | source s | words | TTS s | caption |
|---|---|---|---|---|---|---|---|---|
| 1 | 00:00.600 | 00:07.929 | 7.3 | 1.00 | 8.3 | 15 | 6.0 | We introduce Dex-One2Many, a framework that learns generalizable dexterous manipulation from a single human video. |
| 2 | 00:08.729 | 00:13.129 | 4.4 | 1.00 | 4.4 | 11 | 4.4 | The only demonstration is a single human video of the task. |
| 3 | 00:13.329 | 00:21.929 | 8.6 | 1.00 | 8.6 | 21 | 8.4 | Instead of imitating the demonstrated motion, we extract the task structure, so poses, goals, and grasps may differ from the video. |
| 4 | 00:22.229 | 00:29.829 | 7.6 | 1.00 | 7.6 | 17 | 6.8 | The same task structure trains any dexterous hand; only the robot model and its grasp set change. |
| 5 | 00:30.129 | 00:39.329 | 9.2 | 1.00 | 9.2 | 18 | 7.2 | Policies are trained entirely in simulation and deployed zero-shot on a real robot. Here is how it works. |
| 6 | 00:40.129 | 00:44.700 | 4.6 | 0.94 | 4.3 | 10 | 4.0 | The input is a single human video of the task. |
| 7 | 00:44.800 | 00:55.081 | 10.3 | 0.75 | 7.7 | 20 | 8.0 | A vision-language model abstracts it into stage-wise scene graphs: which hand–object and object–object relations must hold, and in what order. |
| 8 | 00:55.281 | 01:00.408 | 5.1 | 0.64 | 3.3 | 9 | 3.6 | Object poses, goal poses, and grasps are left free. |
| 9 | 01:00.538 | 01:07.857 | 7.3 | 0.85 | 6.2 | 15 | 6.0 | Each stage graph serves as a generative constraint for sampling reset states; here, Stage 3. |
| 10 | 01:07.957 | 01:13.616 | 5.7 | 1.00 | 5.7 | 12 | 4.8 | First, the anchor object, the pot, is placed anywhere in the workspace. |
| 11 | 01:13.716 | 01:19.456 | 5.7 | 1.12 | 6.4 | 12 | 4.8 | Then Pikachu is sampled where the pre-inside predicate holds, near the pot. |
| 12 | 01:19.516 | 01:28.473 | 9.0 | 0.99 | 8.9 | 21 | 8.4 | For the grasp predicate, the hand is placed at one of many synthesized multi-finger grasps, each with a verified closing command. |
| 13 | 01:28.573 | 01:35.660 | 7.1 | 0.80 | 5.7 | 16 | 6.4 | Each sampled state is instantiated in simulation and kept only if it is collision-free and stable. |
| 14 | 01:35.760 | 01:45.917 | 10.2 | 1.33 | 13.5 | 22 | 8.8 | Repeating this yields many reset states from one graph: different pot positions, object poses, and grasps that all satisfy the same relations. |
| 15 | 01:47.317 | 01:57.689 | 10.4 | 0.90 | 9.4 | 22 | 8.8 | The same procedure is applied to every stage, from the empty-hand start to the goal, reproducing the video's graph sequence in simulation. |
| 16 | 01:57.789 | 02:03.340 | 5.6 | 1.04 | 5.8 | 10 | 4.0 | Ten thousand verified states per stage form the initial-state distribution. |
| 17 | 02:04.980 | 02:11.955 | 7.0 | 0.96 | 6.7 | 14 | 5.6 | The graph is embodiment-agnostic: only the robot model and its grasp set are swapped. |
| 18 | 02:13.485 | 02:18.386 | 4.9 | 1.19 | 5.8 | 7 | 2.8 | Four arm–hand embodiments share one task specification. |
| 19 | 02:19.016 | 02:27.442 | 8.4 | 0.71 | 6.0 | 18 | 7.2 | RL episodes start uniformly from the reset states of every stage, in tens of thousands of parallel environments. |
| 20 | 02:27.472 | 02:37.422 | 9.9 | 0.60 | 6.0 | 26 | 10.4 | For visualization, the environments are arranged in rows by the stage their episode starts from, Stage 4 at the top and Stage 0 at the bottom. |
| 21 | 02:37.452 | 02:41.551 | 4.1 | 1.56 | 6.4 | 7 | 2.8 | Training from stage-wise resets proceeds as follows. |
| 22 | 02:41.581 | 02:46.867 | 5.3 | 1.09 | 5.8 | 12 | 4.8 | With dense predicate rewards, the stages nearest the goal are learned first. |
| 23 | 02:46.897 | 02:52.586 | 5.7 | 1.02 | 5.8 | 11 | 4.4 | Success then propagates backward, since the later stages are already solved. |
| 24 | 02:52.626 | 02:58.673 | 6.0 | 0.99 | 6.0 | 12 | 4.8 | Eventually the full task is solved from the empty-hand start, stage 0. |
| 25 | 02:58.713 | 03:06.631 | 7.9 | 0.80 | 6.4 | 15 | 6.0 | In ablations, removing stage-wise resets drops success from over 90 % to about 16 %. |
| 26 | 03:06.671 | 03:12.861 | 6.2 | 0.99 | 6.1 | 12 | 4.8 | The same procedure trains all four embodiments; each learns the full task. |
| 27 | 03:12.891 | 03:17.463 | 4.6 | 1.29 | 5.9 | 10 | 4.0 | The trained policy completes the task from an empty hand. |
| 28 | 03:19.663 | 03:27.352 | 7.7 | 0.73 | 5.6 | 16 | 6.4 | We evaluate on 500 episodes per embodiment, with initial and goal positions sampled across the workspace. |
| 29 | 03:27.492 | 03:35.277 | 7.8 | 1.44 | 11.2 | 19 | 7.6 | No grasp is retargeted from the video; the policy adopts different grasp types depending on where the object is. |
| 30 | 03:35.327 | 03:44.044 | 8.7 | 0.60 | 5.2 | 18 | 7.2 | The other embodiments are evaluated the same way; across five tasks, the four average about 95 % success. |
| 31 | 03:44.144 | 03:50.874 | 6.7 | 0.89 | 6.0 | 16 | 6.4 | Each embodiment learns its own grasps for the same task structure, from the same single video. |
| 32 | 03:50.962 | 04:01.552 | 10.6 | 1.00 | 10.6 | 24 | 9.6 | In simulation, each task is learned from one human video for four arm–hand embodiments — only the robot model and its grasp set change. |
| 33 | 04:01.552 | 04:09.552 | 8.0 | 1.00 | 8.0 | 12 | 4.8 | Direct manipulation: grasp the object and move it to the target configuration. |
| 34 | 04:09.552 | 04:17.856 | 8.3 | 1.00 | 8.3 | 15 | 6.0 | Success rates over 500 episodes per task, with initial object positions sampled across the workspace. |
| 35 | 04:17.856 | 04:25.856 | 8.0 | 1.00 | 8.0 | 18 | 7.2 | Tool use: grasp a tool and act on another object — the same predicate rewards, no task-specific design. |
| 36 | 04:25.856 | 04:34.006 | 8.1 | 1.00 | 8.2 | 10 | 4.0 | Across five tasks, the four embodiments average 94.6–96.8 % success. |
| 37 | 04:34.006 | 04:46.679 | 12.7 | 1.00 | 12.7 | 26 | 10.4 | Zero-shot sim-to-real on UR3 + Wuji 1. On configurations never shown in the video: 60–85 % success, where the baselines stay at or below 15 %. |
