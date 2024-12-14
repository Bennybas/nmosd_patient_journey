createPathwayDocument(
    {
        width: 600,
        height: 400,
        units: Units.points,
    },
    [
        { content: "TEXT HERE", x: 100, y: 350, width: 100, height: 20 },
        { content: "BUSINESS", x: 300, y: 300, width: 100, height: 20 },
        { content: "tearnwork", x: 300, y: 250, width: 100, height: 20 },
        { content: "OPTION DATA A", x: 450, y: 250, width: 150, height: 20 },
        { content: "OPTION DATA B", x: 450, y: 150, width: 150, height: 20 },
        { content: "VectorStock", x: 300, y: 50, width: 150, height: 20 },
    ],
    [
        { startX: 150, startY: 350, endX: 350, endY: 300 },
        { startX: 350, startY: 300, endX: 350, endY: 250 },
        { startX: 350, startY: 250, endX: 450, endY: 250 },
        { startX: 350, startY: 250, endX: 450, endY: 150 },
    ],
    {
        path: "/path/to/local/image.png",
        x: 300,
        y: 50,
        width: 150,
        height: 100,
    }
);
