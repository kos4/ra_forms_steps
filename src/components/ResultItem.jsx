import {GrClose, GrEdit} from "react-icons/gr";

export default function ResultItem({data}) {
  const {item, handlers} = data;
  return (
    <div className="result__item" data-id={item.id}>
      <div className="result__item-date">{item.date}</div>
      <div className="result__item-distance">{item.distance}</div>
      <div className="result__item-actions">
        <span className="result__item-edit" onClick={handlers.handlerEdit}><GrEdit/></span>
        <span className="result__item-delete" onClick={handlers.handlerDelete}><GrClose/></span>
      </div>
    </div>
  );
}