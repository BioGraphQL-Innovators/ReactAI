//import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from "react";
import { Fragment } from "react";

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answers, setAnswer] = useState();
  const [model, setModel] = useState(null);
  const loadModel = async () => {
    try {
      const loadedModel = await qna.load();
      setModel(loadedModel);
      //console.log('Model loaded')
    }
    catch (error) {
      console.log(error);
      //alert("An error occured");
    }
  }

  useEffect(() => { loadModel() }, [])

  const answerQuestion = async (e) => {
    //console.log("AQ called");
    if (e.which === 13 && model !== null) {
      //console.log('Question submitted.')
      const passage = passageRef.current.value
      const question = questionRef.current.value
      const answers = await model.findAnswers(question,
        passage)
      setAnswer(answers);
      //console.log(answers)
    }
  }




  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(#e90000, transparent)", marginBottom: "50px" }}>
        <img src={logo} className="App-logo" alt="logo" style={{ width: "150px", height: "auto" }} />
        <h1 style={{ fontWeight:"bold"}} >ReactAI</h1>
      </div>

      {model == null ?
        <div style={{ width: "fit-content", margin: "auto" }}>
          <button class="btn btn-primary" type="button" disabled style={{ fontSize: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: "3rem", height: "3rem" }} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            &nbsp;Model is Loading...
          </button>
        </div> :
        <div style={{ width: "70%", margin:"auto" }}>
        
          <div class="mb-3" >
            <label  for="exampleFormControlTextarea1" class="form-label">Passage</label>
            <textarea ref={passageRef} class="form-control" id="exampleFormControlTextarea1" rows="10" ></textarea>
          </div>


          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Ask a question</label>
            <input ref={questionRef} onKeyPress={answerQuestion} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
          </div>


         
          <label>Answers</label>
          {answers ? (answers.map((ans, idx) => <div id="ans"><b>Answer{idx + 1} = </b>{ans.text} {ans.score}</div>)) : ""}
        </div>

      }
    </div>
  );
}

export default App;
