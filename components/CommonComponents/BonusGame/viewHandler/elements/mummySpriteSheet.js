let mummySpriteSheet = {
    "images": "mummy",
    "frames": [
        [1, 1, 109, 133, 0, 0, 0],
        [1, 136, 70, 137, 0, 0, 0],
        [1, 136, 70, 137, 0, 0, 0],
        [1, 275, 70, 137, 0, 0, 0],
        [1, 275, 70, 137, 0, 0, 0],
        [112, 1, 70, 137, 0, 0, 0],
        [112, 1, 70, 137, 0, 0, 0],
        [184, 1, 70, 137, 0, 0, 0],
        [184, 1, 70, 137, 0, 0, 0],
        [256, 1, 70, 136, 0, 0, -1],
        [256, 1, 70, 136, 0, 0, -1],
        [328, 1, 70, 136, 0, 0, -1],
        [400, 1, 82, 91, 0, -28, -20],
        [1, 414, 68, 101, 0, -28, -10],
        [73, 140, 75, 96, 0, -27, -15],
        [73, 238, 61, 103, 0, -27, -8],
        [150, 140, 75, 81, 0, 0, -4],
        [150, 140, 75, 81, 0, 0, -4],
        [73, 343, 74, 80, 0, 0, -5],
        [73, 343, 74, 80, 0, 0, -5],
        [71, 425, 75, 81, 0, 0, -4],
        [71, 425, 75, 81, 0, 0, -4],
        [400, 94, 75, 80, 0, 0, -5],
        [400, 94, 75, 80, 0, 0, -5],
        [477, 94, 44, 62, 0, 0, 0],
        [477, 94, 44, 62, 0, 0, 0],
        [477, 158, 44, 62, 0, 0, 0],
        [477, 158, 44, 62, 0, 0, 0],
        [227, 140, 75, 81, 0, 0, -4],
        [227, 140, 75, 81, 0, 0, -4],
        [304, 139, 75, 81, 0, 0, -4],
        [304, 139, 75, 81, 0, 0, -4],
        [381, 176, 75, 81, 0, 0, -4],
        [136, 238, 74, 80, 0, 0, -5],
        [136, 238, 74, 80, 0, 0, -5],
        [212, 223, 53, 106, 0, -27, -5],
        [267, 223, 45, 106, 0, -28, -5],
        [314, 222, 45, 104, 0, -29, -7],
        [361, 259, 45, 62, 0, -2, 0],
        [361, 259, 45, 62, 0, -2, 0],
        [408, 259, 45, 62, 0, -2, 0],
        [149, 320, 45, 62, 0, -2, 0],
        [149, 384, 46, 58, 0, -1, -4],
        [148, 444, 45, 62, 0, -2, 0],
        [196, 331, 47, 49, 0, 0, -13],
        [197, 382, 44, 62, 0, 0, 0],
        [195, 446, 44, 62, 0, 0, 0],
        [195, 446, 44, 62, 0, 0, 0],
        [245, 331, 47, 53, 0, 0, -9],
        [243, 386, 45, 59, 0, -2, -3],
        [241, 447, 44, 62, 0, 0, 0],
        [241, 447, 44, 62, 0, 0, 0],
        [294, 331, 44, 62, 0, 0, 0],
        [294, 331, 44, 62, 0, 0, 0],
        [290, 395, 47, 52, 0, 0, -10],
        [287, 449, 44, 62, 0, 0, 0],
        [287, 449, 44, 62, 0, 0, 0],
        [340, 328, 44, 62, 0, 0, 0],
        [340, 328, 44, 62, 0, 0, 0],
        [386, 323, 44, 62, 0, 0, 0],
        [386, 323, 44, 62, 0, 0, 0],
        [432, 323, 44, 62, 0, 0, 0],
        [432, 323, 44, 62, 0, 0, 0],
        [455, 259, 44, 62, 0, 0, 0],
        [455, 259, 44, 62, 0, 0, 0],
        [333, 449, 44, 62, 0, -3, 0],
        [333, 449, 44, 62, 0, -3, 0],
        [333, 449, 44, 62, 0, -3, 0],
        [333, 449, 44, 62, 0, -3, 0],
        [333, 449, 44, 62, 0, -3, 0],
        [333, 449, 44, 62, 0, -3, 0],
        [340, 392, 46, 55, 0, -1, -7],
        [388, 387, 44, 62, 0, -3, 0],
        [388, 387, 44, 62, 0, -3, 0],
        [388, 387, 44, 62, 0, -3, 0],
        [434, 387, 44, 62, 0, -3, 0],
        [434, 387, 44, 62, 0, -3, 0],
        [434, 387, 44, 62, 0, -3, 0],
        [434, 387, 44, 62, 0, -3, 0],
        [379, 451, 44, 62, 0, -3, 0],
        [425, 451, 44, 62, 0, -3, 0]
    ],

    "animations": {
        "mum_start": { "frames": [0] },
        "mummy_body": { "frames": [1, 3, 5, 7, 9, 11, 10, 8, 6, 4, 2], speed: 12/25  },
        "mum_arm_start": { "frames": [15, 35, 36, 37, 13, 12, 14], speed: 30/25 },
        "mum_arm_idle": { "frames": [18, 33, 23, 21, 17, 28, 30, 32, 31, 29, 16, 20, 22, 34, 19], speed: 19/25 },
        "mum_head_idle": { "frames": [24, 26, 64, 62, 60, 58, 56, 53, 51, 47, 45, 46, 50, 52, 55, 57, 59, 61, 63, 27, 25] },
        "mum_head_start": { "frames": [38, 42, 48, 44, 54, 71, 49, 79, 80, 78, 65, 72, 66, 75, 67, 73, 68, 76, 69, 74, 70, 77, 40, 41, 43, 39], speed: 25/25, next: "mum_head_idle" }
    },

    framerate: 25
};

export default mummySpriteSheet;