import { type } from '@testing-library/user-event/dist/type';
import './App.css';
import BmiList from './components/BmiList';
import BmiScore from './components/BmiScore';
import Form from './components/form';
import {useState} from 'react';

function App() {
  const [show, setShow] = useState(false)
  const [changeWeight, setChangeWeight] = useState({wight: "", type: ""});
  const [bmi, setbmi] = useState("00");
  const [bmiType, setbmiType]= useState("Not Calculated");
  const [ bmiRange, setBmiRange] = useState({
   underWeight: {low: ""},
   normal: {low: "", high: ""},
   overWeight: {low: "", high: ""},
   obesityOne: {low: "", high: ""},
   obesityTwo: {low: "", high: ""},
   obesityThree:{ high: ""},
  });
  const onFormSubmit =(w,h) =>{
    let b = calBmi(w, h);
    setbmi(b);
    let bType = weightType(b)
    setbmiType(bType)
    console.log(w,h);
    const range = {
      underWeight: { low: calWeight(18.5, h) },
      normal: { low: calWeight(18.5, h), high: calWeight(24.9, h) },
      overWeight: { low: calWeight(25, h), high: calWeight(29.9,h) },
      obesityOne: { low: calWeight(30, h), high: calWeight(34.9,h) },
      obesityTwo: { low: calWeight(35, h), high: calWeight(39.9,h) },
      obesityThree: { high: calWeight(40,h) },
    };
    setBmiRange(range);
    setChangeWeight(weightChange (b, w, range));
    setShow(true);
  };

  const calBmi =(w, h) => (w / (h * h)).toFixed(2);
  const calWeight = (b, h) => (b * h * h).toFixed(2);
  const weightChange = (b, w, range) => {
    let changeObj;
    if (b > 24.9){
      changeObj={
        wight: (w - range.normal.high).toFixed(2),
        type: "positive",
      };
    return changeObj  
   }else if (b < 18.5){
    changeObj={
      wight: (range.normal.low - w).toFixed(2),
      type: "negative",       
  };
    return changeObj;
    }else {
  changeObj = {wight: 0, type: "normal"};
  return changeObj;
 }
};

  const weightType = (bmi) => {
    if (bmi < 18.5){
      return "Underweight";
    }else if (18.5 < bmi && bmi < 24.9){
      return "Normal";
    }else if (24.9 < bmi && bmi < 29.9){
      return "Overweight";
    }else if (29.9 < bmi && bmi < 34.9){
      return "Obesity Class I";
    }else if (34.9 < bmi && bmi < 39.9){
      return "Obesity Class II";
    }else if (bmi > 39.9) {
      return "Obesity Class III";
    }
  };
  return (
    <>
    <div className='container'>
      <div className='row justify-content-center mt-5 mx-2'>
      <Form getData ={onFormSubmit} />
      </div>
      {show && ( 
      <div className="row justify-content-center mt-5">
        <div className=" col-12 col-sm-6 mb=5">
        <BmiScore bmiNo={bmi} bmiName={bmiType} changeWeight={changeWeight} />
        </div>
        <div className="col-12 col-sm-6 ">
    <BmiList range={bmiRange} bmi={bmi} />
    </div>
    </div>
    )}
    </div>
    </>
  );
}

export default App;
