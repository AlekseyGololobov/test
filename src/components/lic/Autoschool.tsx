import React from 'react';
import './asset/Autoschool.css';

import prepod from './asset/instructor.png';
import book from './asset/book.svg';

export const Autoschool: React.FC = () => {
   const [autoschoolins, setPizzas] = React.useState([]);

   const foo = () => {
      console.log('foo');
   };

   React.useEffect(() => {
      fetch('http://localhost:3002/db.json').then((response) =>
         response.json().then((json) => {
            setPizzas(json.autoschoolins);
         }),
      );
   }, []);
   return (
      <div className="Autoschool">
         <div className="Autoschool_svg">
            <img className="Autoschool_prepod" src={prepod} alt="" />
            <div className="gg">
               <div className="Container">
                  <h1 className="Container_title">автошкола</h1>
                  <span className="Container_description">Добро пожаловать в автошколу!</span>
                  <span className="Container_description">
                     Для того чтобы получить водительское удостоверение,
                     <br /> вам требуетсф выбрать категорию и сдать экзамен.
                  </span>
                  {/* { 
               autoschoolins.map((obj:ITicket) =>{
                return Ticket2(obj,foo)
               } )
              } */}
                  <div className="Container-Ticet_box">
                     {autoschoolins.map((obj: ITicket) => {
                        return <Ticket key={obj.id} {...obj} foo={foo} />
                     })}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

interface ITicket {
   // Ticket?:HTMLDivElement,
   id?: number;
   name?: string;
   types?: number;
   category?: number;
}

interface IFoo extends ITicket {
   foo: () => void;
}

export const Ticket: React.FC<IFoo> = (props: IFoo) => {
   return (
      <div className="Box-Ticket">
         <div className="Box-Categories">
            <p className="Categories_abc">{props.category}</p>
            <div className="Categories_test">
               <span className="Categories_name">{props.name}</span>
            </div>
            <button className="Categories_btn" onClick={props.foo}>
               <img className="Categories_book" src={book} alt="book" />{' '}
               <span className="Categories_text_btn">теория</span>
            </button>
         </div>
      </div>
   );
};
// export const Ticket2:React.FC<ITicket> = (obj:ITicket,foo:()=>void) => {
//     return (
//      <div className="box_ticket">
//          <div className="box_categories">
//              <span className="">
//           {obj.name}
//              </span>
//                  <p>scdv</p>
//              <button onClick={foo}>
//                  теория
//              </button>
//          </div>
//      </div>
//     )
//  }
