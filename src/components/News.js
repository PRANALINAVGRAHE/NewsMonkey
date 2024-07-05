import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
 const [articles, setArticles] = useState([])
 const [loading, setLoading] = useState(true)
 const [page, setPage] = useState(1)
 const [totalResults, setTotalResults] = useState(0)


  const capitalize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2fdb5a8f62cf4f7da12546eae4b6b2e6&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({loading: true});
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsMonkey`;
    updateNews();
  }, [])

  const handlePrevClick = async () => {
    // this.setState({page: this.state.page - 1})
    setPage(page-1)
    updateNews();
  }

  const handleNextClick = async () => {
  setPage(page-1)
  updateNews();
}
  
const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2fdb5a8f62cf4f7da12546eae4b6b2e6&page=${page}&pageSize=${props.pageSize}`;
    setPage(page + 1)

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }

    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0px', marginTop: '90px'}}> NewsMonkey - Top {`${capitalize(props.category)}`} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
          >
        
        <div className="container">
            <div className='row'>

              {articles.map((element) => {
                    return <div className="col-md-4"  key={element.url}>
                    <NewsItem title={element.title? element.title.slice(0, 45): ""} description={element.description? element.description.slice(0, 88): ""} imageUrl={element.urlToImage}
                    newsUrl = {element.url} author = {element.author ? element.author: "Unknown"} date = {element.publishedAt} source={element.source.name}/>
                </div>
              })}

            </div>
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled= {this.state.page +1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
        </div> */}
      
    </>
    )
  }
News.defaultProps={
    country: "in",
    pageSize: 8,
    category: 'sports',
  }

News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
export default News
