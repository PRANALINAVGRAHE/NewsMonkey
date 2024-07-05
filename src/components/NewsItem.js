import React from 'react'

const NewsItem = (props) =>  {

    let {title,description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
      <div className="card">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left: '90%', zIndex: '1'}}>
        {source}</span>
        
            <img src= {!imageUrl ? "https://cdn.ndtv.com/common/images/ogndtv.png": imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description ? description : "Click on the read more button to get the details."}...</p>
              <p className="card-text"><small class="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
            </div>
          </div>
        </div>
    )
}

export default NewsItem
