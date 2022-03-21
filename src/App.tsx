import "./styles.css";
import p5Types from "p5";
import Sketch from "react-p5";
import { useControls } from "leva";

type Color = {
  r: number;
  g: number;
  b: number;
};

const MathColor = (c1: Color) => {
  return { r: c1.r / 255, g: c1.g / 255, b: c1.b / 255 };
};

const ReverseMathColor = (c1: Color) => {
  return {
    r: Math.ceil(c1.r * 255),
    g: Math.ceil(c1.g * 255),
    b: Math.ceil(c1.b * 255)
  };
};

const Screen = (c1: Color, c2: Color) => {
  return {
    r: c1.r + c2.r - c1.r * c2.r,
    g: c1.g + c2.g - c1.g * c2.g,
    b: c1.b + c2.b - c1.b * c2.b
  };
};

const GetPositionFromColumn = (
  p: p5Types,
  column: number,
  maxColumn: number = 10
) => {
  return (p.windowWidth / maxColumn) * column;
};

const GetPositionFromRow = (p: p5Types, row: number, maxRow: number = 10) => {
  return (p.windowHeight / maxRow) * row;
};

export default function App() {
  const data = useControls(() => ({
    Color1: { r: 255, g: 125, b: 125 },
    Color2: { r: 125, g: 255, b: 125 }
  }));
  const DefalutRectSize = (p: p5Types) => {
    return p.width / 15;
  };
  const setup = (p: p5Types, canvasParentref: Element) => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentref);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(p.width / 20);
    p.textFont("Arial");
  };
  const draw = (p: p5Types) => {
    p.background(255, 255, 255);
    p.stroke(0, 0, 0, 255);
    p.fill(data[0].Color1.r, data[0].Color1.g, data[0].Color1.b);
    p.rect(
      p.windowWidth / 5,
      p.height / 2,
      DefalutRectSize(p),
      DefalutRectSize(p)
    );
    p.fill(data[0].Color2.r, data[0].Color2.g, data[0].Color2.b);
    p.rect(
      GetPositionFromColumn(p, 4),
      GetPositionFromRow(p, 5),
      DefalutRectSize(p),
      DefalutRectSize(p)
    );

    const resultColor = ReverseMathColor(
      Screen(MathColor(data[0].Color1), MathColor(data[0].Color2))
    );
    p.fill(resultColor.r, resultColor.g, resultColor.b);
    p.rect(
      GetPositionFromColumn(p, 7),
      p.height / 2,
      DefalutRectSize(p),
      DefalutRectSize(p)
    );

    // rgb text
    p.fill("#000");
    p.textSize(p.width / 40);
    p.text(
      `(${data[0].Color1.r},${data[0].Color1.g},${data[0].Color1.b})`,
      GetPositionFromColumn(p, 2),
      GetPositionFromRow(p, 4)
    );
    p.text(
      `(${data[0].Color2.r},${data[0].Color2.g},${data[0].Color2.b})`,
      GetPositionFromColumn(p, 4),
      GetPositionFromRow(p, 4)
    );
    p.text(
      `(${resultColor.r},${resultColor.g},${resultColor.b})`,
      GetPositionFromColumn(p, 7),
      GetPositionFromRow(p, 4)
    );
    p.text("×", GetPositionFromColumn(p, 3), p.height / 2);
    p.text("=", GetPositionFromColumn(p, 5.5), p.height / 2);
  };
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}
