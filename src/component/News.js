
import NewsItem from "./NewsItem";
import { useState,useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import LoadingBar from 'react-top-loading-bar';

export default function News(props) {
    // const articles=[
    //         {
    //             "source": {
    //               "id": "bbc-sport",
    //               "name": "BBC Sport"
    //             },
    //             "author": null,
    //             "title": "England vs Ireland LIVE: second women’s ODI – cricket score, video highlights and text updates",
    //             "description": "England host Ireland in the second women’s one-day international at Civil Service Cricket Club, Belfast – follow text updates and video highlights.",
    //             "url": "http://www.bbc.co.uk/sport/cricket/live/cd1jpmw8gvet",
    //             "urlToImage": "https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png",
    //             "publishedAt": "2024-09-09T13:52:23.3857179Z",
    //             "content": "Lewis b Cross 0 (Ire 1-1)\r\nBut Ireland's other opener, Gaby Lewis, is unable to trouble the scorers today. Kate Cross gives England the perfect start!\r\nEngland's skipper once again gets a wicket in t… [+151 chars]"
    //           },
    //           {
    //             "source": {
    //               "id": "espn-cric-info",
    //               "name": "ESPN Cric Info"
    //             },
    //             "author": null,
    //             "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //             "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //             "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //             "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //             "publishedAt": "2020-04-27T11:41:47Z",
    //             "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //           },
    //           {
    //             "source": {
    //               "id": "espn-cric-info",
    //               "name":   "ESPN Cric Info"
    //             },
    //             "author": null,
    //             "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //             "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //             "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //             "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //             "publishedAt": "2020-03-30T15:26:05Z",
    //             "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //           }
          
    // ]
    const[articles,setArticles]=useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const[loading,setLoading]=useState(true)
    const[progress,setProgress]=useState(0)

    const pageSize=props.pageSize;
    const category=props.category;
    
    const getPost=useCallback(async()=>{
        setProgress(0);
    try
    {
    const response=await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&page=${page}&pageSize=${pageSize}&category=${props.category}&apiKey=d9d5fb5e2d23486baa84e4341bace2c2`,{
        method:"GET",
    })
    setProgress(30);
   setLoading(true)
    const data= await response.json();
    // console.log("fetch data"+data);
    setArticles(data.articles);
    setProgress(50);
    setTotalResults(data.totalResults)
    // console.log(data.totalResults);
    setProgress(100);
   setLoading(false)
}catch(error){
    console.error("error fetching news",error);
}
},[page, pageSize, props.category, props.country])
useEffect(() => {
    getPost();
}, [page,category,getPost]);

 const handlePrevclick = async () => {
    // console.log("previous");
   if(page>1)
   {
    setPage(page-1)
   }
  };

 const  handleNextclick = async () => {
    // console.log("next");
      if(page + 1 <Math.ceil(totalResults/pageSize))
      {
        setPage(page+1)
      }
  };

  return (
    <>
    <LoadingBar
    color='blue'
    progress={progress}
    >
    </LoadingBar>
    <div className="container my-3">
      <h2 className="text-center" style={{marginTop:'80px'}}>NewsMonkey- {props.category} Top Headlines</h2>
      {loading && <Spinner />}
       <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            onClick={handlePrevclick}
            className="btn btn-dark"
          >  &larr;Previous
          </button>
          <button
            disabled={page + 1 >Math.ceil(totalResults /pageSize)}
            rel="noreferrer"
            type="button"
            onClick={handleNextclick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      <div className="row">
      {articles.map((element)=>{
         return <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title?element.title.slice(0,40):''} description={element.description?element.description.slice(0,77):''} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} 
        date={element.publishedAt}/>
      </div>
      })}
      </div>
    </div> 
    </>
  );
}

News.defaultProps={
    country:'us',
    pageSize:8,
    category:'general'
}
News.propType={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
}
