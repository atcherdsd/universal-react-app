import { decodeHtmlCharCodes } from 'components/utilities/utils';
import React, { RefObject, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { apiStateDataSelector } from 'store/selectors';
import './News.css';

const News: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const uriTitle = decodeURIComponent(params.title as string);
  const { apiData } = useAppSelector(apiStateDataSelector);

  const newsList = apiData.articles.filter((item) => item.title === uriTitle);

  useEffect(() => {
    if (newsList.length === 0) {
      navigate('/');
    }
  }, [newsList, navigate]);

  const newsItem = newsList[0];

  const date = newsItem.publishedAt.slice(0, 10);
  const title = newsItem.title;
  const descriptionDiv = useRef() as RefObject<HTMLDivElement>;
  const warning = useRef('');
  useEffect(() => {
    const replaceLink = (contentWithHTMLLinkTags: string): string => {
      descriptionDiv.current!.innerHTML = contentWithHTMLLinkTags;
      return decodeHtmlCharCodes(descriptionDiv.current!.innerHTML);
    };
    warning.current = replaceLink(newsItem.description);
    replaceLink(newsItem.description);
  }, [newsItem.description]);

  return (
    <>
      <hr className="News-line" />
      <div className="News-button__back">
        <Link to="/">
          <button className="News-button">Back to news</button>
        </Link>
      </div>
      <div className="News-title__wrapper">
        <h2 className="News-title">News in detail</h2>
      </div>
      <div className="News-container">
        <div className="News-content__container">
          <div className="News-main-content">
            <div className="News-content__header">
              <div className="News-source">Source: {decodeHtmlCharCodes(newsItem.source.name)}</div>
            </div>
            <div className="News-content__main">
              {newsItem.image && (
                <div className="News-image__container">
                  <img className="News-image" src={newsItem.image} alt="News image" />
                </div>
              )}
              <div
                className={
                  newsItem.image ? 'News-content__info  info__w60' : 'News-content__info info__w100'
                }
              >
                <div className="News-title">{decodeHtmlCharCodes(title)}</div>
                <div
                  className="News-description"
                  ref={descriptionDiv}
                  dangerouslySetInnerHTML={{ __html: warning.current }}
                ></div>
              </div>
            </div>
            <div className="News-content__footer">
              <div className="News-date">Publication date: {date}</div>
              <a href={newsItem.url} className="News-url" target="blank" rel="noreferrer">
                See in source
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
