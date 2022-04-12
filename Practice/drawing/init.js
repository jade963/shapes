console.log("init js is called")
canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
let width = 1000;
let height = 750;
canvas.width = width;
canvas.height = height;
let colArray=[

    [ "rgba(255,255,255,1,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)",
        "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",
        "rgba(255,102,102,1)","rgba(255,255,153,1)", "rgba(0,153,204,1)"
    ],

    [ "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)",
        "rgba(204,0,0,0.67)","rgba(255,204,51,0.67)","rgba(51,51,255,0.67)",
        "rgba(255,102,102,0.67)","rgba(255,255,153,0.67)", "rgba(0,153,204,0.67)"
    ],

    [ "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)",
        "rgba(204,0,0,0.33)","rgba(255,204,51,0.33)","rgba(51,51,255,0.33)",
        "rgba(255,102,102,0.33)","rgba(255,255,153,0.33)", "rgba(0,153,204,0.33)"
    ]
]