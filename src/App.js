import './App.css';
import ResultItem from "./components/ResultItem";
import {useState} from "react";

export default function App() {
  const initialState = {
    id: 0,
    date: '',
    distance: '',
  };
  const [form, setForm] = useState(initialState);
  const {date, distance} = form;
  const [data, setData] = useState([]);

  const handlerSubmit = event => {
    event.preventDefault();
    console.log('Вызов handlerSubmit');
    setData(prevData => {
      console.log('Вызов setData');

      const item = prevData.find(d => d.id === form.id);

      if (item) {
        item.distance = (Number(item.distance) + Number(form.distance)).toString();
        return [...prevData];
      } else {
        const newData = [...prevData, {
          id: form.id,
          date: form.date,
          distance: form.distance,
        }];
        newData.sort((a, b) => b.id - a.id);
        return newData;
      }
    });

    setForm({...initialState});
  };

  const handlerChange = event => {
    const { name, value } = event.target;

    if (name === 'date') {
      const timestamp = new Date(value);
      setForm((prevForm) => ({
        ...prevForm,
        id: timestamp.getTime(),
      }));
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  const handlerEdit = event => {
    const item = event.target.closest('.result__item');
    const id = Number(item.dataset.id);

    setData(prevData => prevData.filter(d => d.id !== id));
    const editData = {
      id: id,
      date: item.querySelector('.result__item-date').innerText,
      distance: item.querySelector('.result__item-distance').innerText,
    }
    setForm({...editData});
  };

  const handlerDelete = event => {
    const item = event.target.closest('.result__item');
    const id = Number(item.dataset.id);

    setData(prevData => prevData.filter(d => d.id !== id));
  };

  return (
    <div className="container">
      <form action="" className="form" onSubmit={handlerSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="date">Дата (ДД.ММ.ГГ)</label>
          <input type="text" className="form__input" id="date" name="date" value={date} onChange={handlerChange}/>
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="distance">Пройдено км</label>
          <input type="text" className="form__input" id="distance" name="distance" value={distance} onChange={handlerChange}/>
        </div>
        <button className="form__button">Ok</button>
      </form>
      <div className="result">
        <div className="result__head">
          <div className="result__title">Дата (ДД.ММ.ГГ)</div>
          <div className="result__title">Пройдено км</div>
          <div className="result__title">Действия</div>
        </div>
        <div className="result__data">
          {data.map(item => (
            <ResultItem key={item.id} data={{
              item,
              handlers: {
                handlerEdit,
                handlerDelete,
              },
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}
