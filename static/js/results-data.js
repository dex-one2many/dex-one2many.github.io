/* =========================================================
   정량 결과 데이터 (Success rate, %)
   ---------------------------------------------------------
   · methods : 막대 순서대로. color 는 dataviz 검증을 통과한 조합
               (Do as I Do 주황 · CHORD 청록 · Ours 파랑)
   · tasks   : x축 순서
   · values[domain][split][task] = [method0, method1, method2]  (null = N/A)
   숫자를 고치면 차트와 표가 함께 바뀜.
   ========================================================= */
window.RESULTS_DATA = {
  methods: [
    { key: "doasido", label: "Do as I Do",          short: "Do as I Do", color: "#53546d" },
    { key: "chord",   label: "CHORD",               short: "CHORD",      color: "#3a7d70" },
    { key: "ours",    label: "Dex-One2Many (Ours)", short: "Ours",       color: "#f77501", emphasis: true }
  ],
  tasks: ["Doll", "Can", "Stamp", "Hammer", "Sweep"],
  domains: [
    { key: "sim",  label: "Simulation" },
    { key: "real", label: "Real World" }
  ],
  splits: [
    { key: "unseen", label: "Unseen configurations", note: "Object configurations that never appear in the human video", primary: true },
    { key: "seen",   label: "Seen configurations",   note: "Same configuration as the human video" }
  ],
  values: {
    sim: {
      seen:   { Doll: [0, 0, 100],  Can: [100, 100, 100], Stamp: [100, 100, 100], Hammer: [100, 0, 90],   Sweep: [100, 100, 100] },
      unseen: { Doll: [0, 0, 95],   Can: [0, 0, 90],      Stamp: [15, 0, 100],    Hammer: [0, 0, 95],     Sweep: [0, 5, 85] }
    },
    real: {
      seen:   { Doll: [0, 60, 100], Can: [20, 90, 90],    Stamp: [20, 90, 80],    Hammer: [40, null, 70], Sweep: [100, 70, 80] },
      unseen: { Doll: [0, 0, 80],   Can: [0, 15, 75],     Stamp: [10, 0, 85],     Hammer: [5, null, 60],  Sweep: [5, 0, 75] }
    }
  }
};
