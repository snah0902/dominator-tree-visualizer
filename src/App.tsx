import { useState, useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { make_dom } from 'dominators'
import AceEditor from "react-ace"

type Annotation = {row: number, column: number, type: string, text: string}

function App() {
  const [nodeText, setNodeText] = useState("2");
  const [graphText, setGraphText] = useState("0 1");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);


  const parseGraph = (edges: number[][]) => {
    const adjList : Record<number, number[]> = {};
    edges.forEach((edge) => {
      const [u, v] = edge;
      if (!(u in adjList)) {
        adjList[u] = [];
      }
      if (!(v in adjList)) {
        adjList[v] = [];
      }
      adjList[u].push(v);
    })
    return adjList;
  }

  const updateAnnotations = (text: string) => {
    const edges: number[][] = [];
    const newAnnotations : Annotation[] = [];
    text.split("\n").forEach((line, index) => {
      const numsText = line.split(" ");
      if (numsText.length === 1 && numsText[0] === '') {
        return;
      }
      const nums = numsText.map(Number);
      if (nums.length !== 2) {
        newAnnotations.push({
          row: index,
          column: 0,
          type: "error",
          text: "Line must have two numbers"
        })
      } else {
        edges.push(nums);
      }
    });
    return { edges: edges, annotations: newAnnotations };
  }

  useEffect(() => {
    const { edges, annotations } = updateAnnotations(graphText);
    setAnnotations(annotations);
    const adjList = parseGraph(edges);
  }, [nodeText, graphText]);

  return (
    <>
      <h1>Dominator Tree Visualizer</h1>
      <div>
        <label>
          Number of Nodes:
        </label>
        <AceEditor
        value={nodeText}
        onChange={setNodeText}
        annotations={annotations}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        width="50%"
        height="20px"
      />
      </div>
      <div>
      <label>
        Graph Data:
      </label>
        <AceEditor
        value={graphText}
        onChange={setGraphText}
        annotations={annotations}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        width="50%"
        height="300px"
      />
      </div>
    </>
  )
}

export default App
