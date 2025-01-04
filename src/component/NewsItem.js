import React from "react";
 
export default function NewsItem({title,description,imgUrl,newsUrl,author,date}) {

  return (
    <>
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={!imgUrl?"https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0913%2Fr1386015_1296x729_16%2D9.jpg":imgUrl} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()} </small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read...</a>
        </div>
      </div>
    </div>
    </>
  );
}