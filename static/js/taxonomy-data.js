/* 자동 생성: tools/build_taxonomy.py — 직접 수정하지 말고 exp_figures 를 갱신한 뒤 스크립트를 다시 실행하세요.
   구조: tasks[] → panels[] → corners(바둑판 네 꼭짓점, 이미지 % 좌표), cells{"행,열": {name, img, ...}}, tiles[](대표 타일 라벨 위치)
   ?taxodebug 로 격자 확인, ?task=<key>&taxo=<embodiment key> 로 초기 선택 */
window.TAXONOMY_DATA = {
 "cellFill": 0,
 "tasks": [
  {
   "key": "doll",
   "label": "Doll",
   "panels": [
    {
     "key": "ur3_wuji1",
     "label": "UR3 + Wuji 1",
     "base": "static/images/taxonomy/doll/ur3_wuji1.webp",
     "corners": [
      [
       34.54,
       60.0
      ],
      [
       65.28,
       60.0
      ],
      [
       66.36,
       82.08
      ],
      [
       33.47,
       82.08
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Palmar Pinch",
       "cell": "X3Y2",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Inferior Pincer",
       "cell": "X1Y4",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Large Diameter",
       "cell": "X2Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X1Y4.webp",
       "rep": true,
       "zoomed": true
      },
      "0,4": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Large Diameter",
       "taxonomy": "1_Large_Diameter",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Large Diameter",
       "taxonomy": "1_Large_Diameter",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X2Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "2,0": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X3Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "2,2": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur3_wuji1/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_sharpa",
     "label": "UR5e + Sharpa",
     "base": "static/images/taxonomy/doll/ur5e_sharpa.webp",
     "corners": [
      [
       35.02,
       62.84
      ],
      [
       64.8,
       62.84
      ],
      [
       65.87,
       93.03
      ],
      [
       33.95,
       93.03
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Palmar Pinch",
       "cell": "X2Y2",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Inferior Pincer",
       "cell": "X3Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Prismatic 3 Finger",
       "cell": "X1Y3",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Quadpod",
       "cell": "X2Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Prismatic 3 Finger",
       "taxonomy": "7_Prismatic_3_Finger",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Prismatic 3 Finger",
       "taxonomy": "7_Prismatic_3_Finger",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Prismatic 3 Finger",
       "taxonomy": "7_Prismatic_3_Finger",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X1Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "0,3": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Prismatic 3 Finger",
       "taxonomy": "7_Prismatic_3_Finger",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X2Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "1,2": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X2Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "2,0": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X3Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "2,1": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/doll/ur5e_sharpa/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_wuji2",
     "label": "UR5e + Wuji 2",
     "base": "static/images/taxonomy/doll/ur5e_wuji2.webp",
     "corners": [
      [
       35.79,
       64.39
      ],
      [
       64.03,
       64.39
      ],
      [
       65.01,
       93.31
      ],
      [
       34.82,
       93.31
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Power Sphere",
       "cell": "X1Y1",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Inferior Pincer",
       "cell": "X3Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Prismatic 3 Finger",
       "cell": "X2Y2",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X1Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "0,1": {
       "name": "Prismatic 3 Finger",
       "taxonomy": "7_Prismatic_3_Finger",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Prismatic 3 Finger",
       "taxonomy": "7_Prismatic_3_Finger",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Prismatic 3 Finger",
       "taxonomy": "7_Prismatic_3_Finger",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X2Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "1,2": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X3Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "2,1": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/doll/ur5e_wuji2/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_allegro",
     "label": "UR5e + Allegro",
     "base": "static/images/taxonomy/doll/ur5e_allegro.webp",
     "corners": [
      [
       35.6,
       64.36
      ],
      [
       64.23,
       64.36
      ],
      [
       65.21,
       93.22
      ],
      [
       34.61,
       93.22
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Precision Disk",
       "cell": "X2Y2",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Prismatic 4 Finger",
       "cell": "X2Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Extension Type",
       "cell": "X1Y3",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Power Disk",
       "cell": "X3Y3",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Precision Disk",
       "taxonomy": "12_Precision_Disk",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Extension Type",
       "taxonomy": "18_Extension_Type",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X1Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "0,3": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Extension Type",
       "taxonomy": "18_Extension_Type",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X2Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "1,1": {
       "name": "Precision Disk",
       "taxonomy": "12_Precision_Disk",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X2Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "1,2": {
       "name": "Extension Type",
       "taxonomy": "18_Extension_Type",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Extension Type",
       "taxonomy": "18_Extension_Type",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Precision Disk",
       "taxonomy": "12_Precision_Disk",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X3Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "2,3": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/doll/ur5e_allegro/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    }
   ]
  },
  {
   "key": "can",
   "label": "Can",
   "panels": [
    {
     "key": "ur3_wuji1",
     "label": "UR3 + Wuji 1",
     "base": "static/images/taxonomy/can/ur3_wuji1.webp",
     "corners": [
      [
       34.65,
       61.14
      ],
      [
       65.17,
       61.14
      ],
      [
       66.17,
       82.19
      ],
      [
       33.65,
       82.19
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Inferior Pincer",
       "cell": "X1Y1",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Ring",
       "cell": "X2Y2",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Palmar Pinch",
       "cell": "X2Y3",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Tripod",
       "cell": "X3Y4",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/can/ur3_wuji1/X1Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "0,1": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/can/ur3_wuji1/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/can/ur3_wuji1/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/can/ur3_wuji1/X2Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "1,2": {
       "name": "Palmar Pinch",
       "taxonomy": "9_Palmar_Pinch",
       "img": "static/images/taxonomy/can/ur3_wuji1/X2Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "1,3": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X3Y4.webp",
       "rep": true,
       "zoomed": true
      },
      "2,4": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur3_wuji1/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_sharpa",
     "label": "UR5e + Sharpa",
     "base": "static/images/taxonomy/can/ur5e_sharpa.webp",
     "corners": [
      [
       35.32,
       63.95
      ],
      [
       64.5,
       63.95
      ],
      [
       65.5,
       92.88
      ],
      [
       34.31,
       92.88
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Tripod Variation",
       "cell": "X1Y1",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Quadpod",
       "cell": "X3Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Sphere 3 Finger",
       "cell": "X2Y4",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Sphere 4 Finger",
       "cell": "X2Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X1Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "0,1": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Sphere 4 Finger",
       "taxonomy": "26_Sphere_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Sphere 4 Finger",
       "taxonomy": "26_Sphere_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X2Y4.webp",
       "rep": true,
       "zoomed": true
      },
      "1,4": {
       "name": "Sphere 4 Finger",
       "taxonomy": "26_Sphere_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X2Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "2,0": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X3Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "2,1": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Sphere 4 Finger",
       "taxonomy": "26_Sphere_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Sphere 4 Finger",
       "taxonomy": "26_Sphere_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_sharpa/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_wuji2",
     "label": "UR5e + Wuji 2",
     "base": "static/images/taxonomy/can/ur5e_wuji2.webp",
     "corners": [
      [
       36.2,
       65.97
      ],
      [
       63.63,
       65.97
      ],
      [
       64.52,
       93.3
      ],
      [
       35.31,
       93.3
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Prismatic 3 Finger",
       "cell": "X1Y1",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Quadpod",
       "cell": "X3Y2",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Prismatic 2 Finger",
       "cell": "X1Y4",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Precision Sphere",
       "cell": "X2Y4",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Prismatic 3 Finger",
       "taxonomy": "7_Prismatic_3_Finger",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X1Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "0,1": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X1Y4.webp",
       "rep": true,
       "zoomed": true
      },
      "0,4": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X2Y4.webp",
       "rep": true,
       "zoomed": true
      },
      "1,4": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X2Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "2,0": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X3Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "2,2": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/can/ur5e_wuji2/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_allegro",
     "label": "UR5e + Allegro",
     "base": "static/images/taxonomy/can/ur5e_allegro.webp",
     "corners": [
      [
       36.13,
       65.84
      ],
      [
       63.7,
       65.84
      ],
      [
       64.59,
       93.27
      ],
      [
       35.23,
       93.27
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Prismatic 4 Finger",
       "cell": "X1Y4",
       "at": [
        13.42,
        69.69
       ]
      },
      {
       "label": "Extension Type",
       "cell": "X2Y5",
       "at": [
        86.49,
        69.69
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X1Y4.webp",
       "rep": true,
       "zoomed": true
      },
      "0,4": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Extension Type",
       "taxonomy": "18_Extension_Type",
       "img": "static/images/taxonomy/can/ur5e_allegro/X2Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "2,0": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Prismatic 4 Finger",
       "taxonomy": "6_Prismatic_4_Finger",
       "img": "static/images/taxonomy/can/ur5e_allegro/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    }
   ]
  },
  {
   "key": "stamp",
   "label": "Stamp",
   "panels": [
    {
     "key": "ur3_wuji1",
     "label": "UR3 + Wuji 1",
     "base": "static/images/taxonomy/stamp/ur3_wuji1.webp",
     "corners": [
      [
       34.8,
       61.91
      ],
      [
       65.03,
       61.91
      ],
      [
       66.0,
       83.66
      ],
      [
       33.82,
       83.66
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Writing Tripod",
       "cell": "X1Y1",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Lateral Tripod",
       "cell": "X2Y2",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Prismatic 2 Finger",
       "cell": "X1Y5",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Tripod",
       "cell": "X3Y4",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Writing Tripod",
       "taxonomy": "20_Writing_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X1Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "0,1": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X1Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "1,0": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X2Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "1,2": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X3Y4.webp",
       "rep": true,
       "zoomed": true
      },
      "2,4": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur3_wuji1/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_sharpa",
     "label": "UR5e + Sharpa",
     "base": "static/images/taxonomy/stamp/ur5e_sharpa.webp",
     "corners": [
      [
       35.33,
       63.92
      ],
      [
       64.49,
       63.92
      ],
      [
       65.5,
       92.86
      ],
      [
       34.32,
       92.86
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Quadpod",
       "cell": "X1Y2",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Power Sphere",
       "cell": "X2Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Small Diameter 4 Finger",
       "cell": "X1Y5",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Adduction Grip",
       "cell": "X3Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Quadpod",
       "taxonomy": "27_Quadpod",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X1Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "0,2": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Small Diameter 4 Finger",
       "taxonomy": "36_Small_Diameter_4_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Small Diameter 4 Finger",
       "taxonomy": "36_Small_Diameter_4_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X1Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "1,0": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X2Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "1,1": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Power Sphere",
       "taxonomy": "11_Power_Sphere",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/stamp/ur5e_sharpa/X3Y5.webp",
       "rep": true,
       "zoomed": true
      }
     }
    },
    {
     "key": "ur5e_wuji2",
     "label": "UR5e + Wuji 2",
     "base": "static/images/taxonomy/stamp/ur5e_wuji2.webp",
     "corners": [
      [
       35.81,
       64.75
      ],
      [
       64.02,
       64.75
      ],
      [
       64.97,
       93.34
      ],
      [
       34.85,
       93.34
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Adduction Grip",
       "cell": "X1Y1",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Tip Pinch",
       "cell": "X3Y2",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Prismatic 2 Finger",
       "cell": "X1Y3",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Prismatic 3 Finger",
       "cell": "X2Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X1Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "0,1": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X1Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "0,3": {
       "name": "Tip Pinch",
       "taxonomy": "24_Tip_Pinch",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Tip Pinch",
       "taxonomy": "24_Tip_Pinch",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Prismatic 3 Finger",
       "taxonomy": "7_Prismatic_3_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X2Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "2,0": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Tip Pinch",
       "taxonomy": "24_Tip_Pinch",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X3Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "2,2": {
       "name": "Tip Pinch",
       "taxonomy": "24_Tip_Pinch",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/stamp/ur5e_wuji2/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_allegro",
     "label": "UR5e + Allegro",
     "base": "static/images/taxonomy/stamp/ur5e_allegro.webp",
     "corners": [
      [
       35.6,
       64.22
      ],
      [
       64.23,
       64.22
      ],
      [
       65.21,
       93.22
      ],
      [
       34.61,
       93.22
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Lateral",
       "cell": "X3Y2",
       "at": [
        13.42,
        69.69
       ]
      },
      {
       "label": "Precision Disk",
       "cell": "X1Y3",
       "at": [
        86.49,
        69.69
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Precision Disk",
       "taxonomy": "12_Precision_Disk",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X1Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "0,3": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X3Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "2,2": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/stamp/ur5e_allegro/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    }
   ]
  },
  {
   "key": "hammer",
   "label": "Hammer",
   "panels": [
    {
     "key": "ur3_wuji1",
     "label": "UR3 + Wuji 1",
     "base": "static/images/taxonomy/hammer/ur3_wuji1.webp",
     "corners": [
      [
       34.57,
       59.91
      ],
      [
       65.25,
       59.91
      ],
      [
       66.32,
       81.72
      ],
      [
       33.5,
       81.72
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Extension Type",
       "cell": "X3Y2",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Precision Disk",
       "cell": "X2Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Ring",
       "cell": "X3Y3",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Precision Sphere",
       "cell": "X3Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Precision Disk",
       "taxonomy": "12_Precision_Disk",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X2Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "1,1": {
       "name": "Precision Disk",
       "taxonomy": "12_Precision_Disk",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Extension Type",
       "taxonomy": "18_Extensior_Type",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Extension Type",
       "taxonomy": "18_Extensior_Type",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X3Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "2,2": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X3Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "2,3": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Precision Sphere",
       "taxonomy": "13_Precision_Sphere",
       "img": "static/images/taxonomy/hammer/ur3_wuji1/X3Y5.webp",
       "rep": true,
       "zoomed": true
      }
     }
    },
    {
     "key": "ur5e_sharpa",
     "label": "UR5e + Sharpa",
     "base": "static/images/taxonomy/hammer/ur5e_sharpa.webp",
     "corners": [
      [
       34.88,
       62.62
      ],
      [
       64.93,
       62.62
      ],
      [
       66.02,
       92.88
      ],
      [
       33.8,
       92.88
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Tripod",
       "cell": "X1Y3",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Extension Type",
       "cell": "X2Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Small Diameter",
       "cell": "X1Y5",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Lateral",
       "cell": "X3Y3",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Extension Type",
       "taxonomy": "18_Extensior_Type",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X1Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "0,3": {
       "name": "Small Diameter",
       "taxonomy": "2_Small_Diameter",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Small Diameter",
       "taxonomy": "2_Small_Diameter",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X1Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "1,0": {
       "name": "Extension Type",
       "taxonomy": "18_Extensior_Type",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X2Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "1,1": {
       "name": "Small Diameter",
       "taxonomy": "2_Small_Diameter",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Small Diameter",
       "taxonomy": "2_Small_Diameter",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Tripod",
       "taxonomy": "14_Tripod",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X3Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "2,3": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/hammer/ur5e_sharpa/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_wuji2",
     "label": "UR5e + Wuji 2",
     "base": "static/images/taxonomy/hammer/ur5e_wuji2.webp",
     "corners": [
      [
       36.85,
       67.28
      ],
      [
       62.96,
       67.28
      ],
      [
       63.78,
       93.83
      ],
      [
       36.03,
       93.83
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Extension Type",
       "cell": "X3Y3",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Palmar",
       "cell": "X3Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Ring",
       "cell": "X2Y3",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Tripod Variation",
       "cell": "X3Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Extension Type",
       "taxonomy": "18_Extensior_Type",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Palmar",
       "taxonomy": "30_Palmar",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Palmar",
       "taxonomy": "30_Palmar",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Palmar",
       "taxonomy": "30_Palmar",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Palmar",
       "taxonomy": "30_Palmar",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X2Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "1,3": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Palmar",
       "taxonomy": "30_Palmar",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X3Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "2,1": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Extension Type",
       "taxonomy": "18_Extensior_Type",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X3Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "2,3": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/hammer/ur5e_wuji2/X3Y5.webp",
       "rep": true,
       "zoomed": true
      }
     }
    },
    {
     "key": "ur5e_allegro",
     "label": "UR5e + Allegro",
     "base": "static/images/taxonomy/hammer/ur5e_allegro.webp",
     "corners": [
      [
       35.5,
       64.16
      ],
      [
       64.31,
       64.16
      ],
      [
       65.32,
       93.17
      ],
      [
       34.51,
       93.17
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Extension Type",
       "cell": "X2Y2",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Fingertip Large",
       "cell": "X3Y2",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Power Disk",
       "cell": "X2Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Extension Type",
       "taxonomy": "18_Extension_Type",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Extension Type",
       "taxonomy": "18_Extension_Type",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X2Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "1,2": {
       "name": "Extension Type",
       "taxonomy": "18_Extension_Type",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Extension Type",
       "taxonomy": "18_Extension_Type",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X2Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "2,0": {
       "name": "Fingertip Large",
       "taxonomy": "fingertip_large",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Fingertip Large",
       "taxonomy": "fingertip_large",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X3Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "2,2": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Power Disk",
       "taxonomy": "10_Power_Disk",
       "img": "static/images/taxonomy/hammer/ur5e_allegro/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    }
   ]
  },
  {
   "key": "sweep",
   "label": "Sweep",
   "panels": [
    {
     "key": "ur3_wuji1",
     "label": "UR3 + Wuji 1",
     "base": "static/images/taxonomy/sweep/ur3_wuji1.webp",
     "corners": [
      [
       35.21,
       61.91
      ],
      [
       64.61,
       61.91
      ],
      [
       65.58,
       85.48
      ],
      [
       34.25,
       85.48
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Writing Tripod",
       "cell": "X2Y1",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Sphere 3 Finger",
       "cell": "X3Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Ring",
       "cell": "X1Y3",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Inferior Pincer",
       "cell": "X1Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X1Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "0,3": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Inferior Pincer",
       "taxonomy": "33_Inferior_Pincer",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X1Y5.webp",
       "rep": true,
       "zoomed": true
      },
      "1,0": {
       "name": "Writing Tripod",
       "taxonomy": "20_Writing_Tripod",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X2Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "1,1": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Ring",
       "taxonomy": "31_Ring",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X3Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "2,1": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/sweep/ur3_wuji1/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_sharpa",
     "label": "UR5e + Sharpa",
     "base": "static/images/taxonomy/sweep/ur5e_sharpa.webp",
     "corners": [
      [
       36.19,
       64.09
      ],
      [
       63.63,
       64.09
      ],
      [
       64.58,
       92.94
      ],
      [
       35.25,
       92.94
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Writing Tripod",
       "cell": "X1Y2",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Adduction Grip",
       "cell": "X3Y1",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Lateral",
       "cell": "X3Y4",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Writing Tripod",
       "taxonomy": "20_Writing_Tripod",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Writing Tripod",
       "taxonomy": "20_Writing_Tripod",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X1Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "0,2": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X3Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "2,1": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Lateral",
       "taxonomy": "16_Lateral",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X3Y4.webp",
       "rep": true,
       "zoomed": true
      },
      "2,4": {
       "name": "Adduction Grip",
       "taxonomy": "23_Adduction_Grip",
       "img": "static/images/taxonomy/sweep/ur5e_sharpa/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    },
    {
     "key": "ur5e_wuji2",
     "label": "UR5e + Wuji 2",
     "base": "static/images/taxonomy/sweep/ur5e_wuji2.webp",
     "corners": [
      [
       36.8,
       65.55
      ],
      [
       63.02,
       65.55
      ],
      [
       63.89,
       93.2
      ],
      [
       35.94,
       93.2
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Prismatic 2 Finger",
       "cell": "X1Y1",
       "at": [
        13.42,
        46.88
       ]
      },
      {
       "label": "Lateral Tripod",
       "cell": "X2Y2",
       "at": [
        13.42,
        93.12
       ]
      },
      {
       "label": "Tripod Variation",
       "cell": "X3Y3",
       "at": [
        86.49,
        46.88
       ]
      },
      {
       "label": "Sphere 3 Finger",
       "cell": "X3Y5",
       "at": [
        86.49,
        93.12
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X1Y1.webp",
       "rep": true,
       "zoomed": true
      },
      "0,1": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X1Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "0,3": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Prismatic 2 Finger",
       "taxonomy": "8_Prismatic_2_Finger",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X2Y2.webp",
       "rep": true,
       "zoomed": true
      },
      "1,2": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X2Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "1,3": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Lateral Tripod",
       "taxonomy": "25_Lateral_Tripod",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X3Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "2,3": {
       "name": "Tripod Variation",
       "taxonomy": "21_Tripod_Variation",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Sphere 3 Finger",
       "taxonomy": "28_Sphere_3_Finger",
       "img": "static/images/taxonomy/sweep/ur5e_wuji2/X3Y5.webp",
       "rep": true,
       "zoomed": true
      }
     }
    },
    {
     "key": "ur5e_allegro",
     "label": "UR5e + Allegro",
     "base": "static/images/taxonomy/sweep/ur5e_allegro.webp",
     "corners": [
      [
       36.88,
       65.7
      ],
      [
       62.94,
       65.7
      ],
      [
       63.79,
       93.25
      ],
      [
       36.02,
       93.25
      ]
     ],
     "rows": 3,
     "cols": 5,
     "tiles": [
      {
       "label": "Fingertip Small",
       "cell": "X2Y3",
       "at": [
        13.42,
        69.69
       ]
      },
      {
       "label": "Fingertip Mid",
       "cell": "X1Y3",
       "at": [
        86.49,
        69.69
       ]
      }
     ],
     "cells": {
      "0,0": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X1Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "0,1": {
       "name": "Fingertip Mid",
       "taxonomy": "fingertip_mid",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X1Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "0,2": {
       "name": "Fingertip Mid",
       "taxonomy": "fingertip_mid",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X1Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "0,3": {
       "name": "Fingertip Mid",
       "taxonomy": "fingertip_mid",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X1Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "0,4": {
       "name": "Fingertip Mid",
       "taxonomy": "fingertip_mid",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X1Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "1,0": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X2Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "1,1": {
       "name": "Fingertip Mid",
       "taxonomy": "fingertip_mid",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X2Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "1,2": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X2Y3.webp",
       "rep": true,
       "zoomed": true
      },
      "1,3": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X2Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "1,4": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X2Y5.webp",
       "rep": false,
       "zoomed": false
      },
      "2,0": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X3Y1.webp",
       "rep": false,
       "zoomed": false
      },
      "2,1": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X3Y2.webp",
       "rep": false,
       "zoomed": false
      },
      "2,2": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X3Y3.webp",
       "rep": false,
       "zoomed": false
      },
      "2,3": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X3Y4.webp",
       "rep": false,
       "zoomed": false
      },
      "2,4": {
       "name": "Fingertip Small",
       "taxonomy": "fingertip_small",
       "img": "static/images/taxonomy/sweep/ur5e_allegro/X3Y5.webp",
       "rep": false,
       "zoomed": false
      }
     }
    }
   ]
  }
 ]
};
