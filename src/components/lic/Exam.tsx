import React from 'react';
import './asset/Exam.css';

import prepod from './asset/instructor.png';

export const Exam: React.FC = () => {
   const [ticexam, setPizzas] = React.useState([]);

   const foo = () => {
      console.log('foo');
   };

   React.useEffect(() => {
      fetch('http://localhost:3002/TicetExam.json').then((response) =>
         response.json().then((json) => {
            setPizzas(json.ticexam);
         }),
      );
   }, []);
   return (
      <div className="Exam">
         <div className="Exam_svg">
            <img className="Exam_prepod" src={prepod} alt="" />
            {ticexam.map((obj: ITicket) => (
               <Ticket key={obj.id} {...obj} foo={foo} />
            ))}
         </div>
      </div>
   );
};
// className="Exam-Container"
interface ITicket {
   id?: number;
   name?: string;
   types?: number;
   category?: number;
   question?: string;
   value1?: string;
   value2?: string;
   value3?: string;
   value4?: string;
}

interface IFoo extends ITicket {
   foo: () => void;
}

export const Ticket: React.FC<IFoo> = (props: IFoo) => {
   return (
      <div className="gg">
         <h3 className="Container_title">
            <span>вопрос {props.id}</span>
            <span> / 20</span>
         </h3>
         <div className="Categories_test">
            <span className="Categories_name">{props.question}</span>
            <textarea className="Container_description"></textarea>
         </div>
         <div className="Btn_ticet">
            <button className="Categories_btn" onClick={props.foo}>
               <span className="Categories_pad">{props.value1}</span>
            </button>
            <button className="Categories_btn" onClick={props.foo}>
               <span className="Categories_pad">{props.value2}</span>
            </button>
            <button className="Categories_btn" onClick={props.foo}>
               <span className="Categories_pad">{props.value3}</span>
            </button>
            <button className="Categories_btn" onClick={props.foo}>
               <span className="Categories_pad">{props.value4}</span>
            </button>
            <button className="Categories_btnanswer" onClick={props.foo}>
            <span className="Categories_text_btn">Подтвердить ответ</span>
         </button>
         </div>
         
      </div>
   );
};
