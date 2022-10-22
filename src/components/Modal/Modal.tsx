import ExitModal from 'components/ExitModal/ExitModal';
import { IModalProps } from 'components/utilities/interfaces';
import React, { RefObject, useEffect, useRef } from 'react';
import './Modal.css';

function Modal(props: IModalProps): JSX.Element {
  const date = props.data.publishedAt.slice(0, 10);

  const decodeHtmlCharCodes = (str: string): string =>
    str
      .replace(/(&#(\d+);)/g, (_match, _capture, charCode: string) =>
        String.fromCharCode(+charCode)
      )
      .replace(/&rsquo;/g, '’')
      .replace(/&nbsp;/g, ' ')
      .replace(/&hellip;/g, '…')
      .replace(/&mdash;/g, '—')
      .replace(/&amp;/g, '&')
      .replace(/&reg;/g, '®')
      .replace(/&trade;/g, '™');
  const descriptionDiv = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    const replaceLink = (text: string): string => {
      descriptionDiv.current!.innerHTML = text;
      return decodeHtmlCharCodes(descriptionDiv.current!.innerHTML);
    };
    replaceLink(props.data.description);
  }, [props.data.description]);

  return (
    <div className="Modal-container">
      <div className="Modal-content__container" onClick={(event) => event.stopPropagation()}>
        <div className="Modal-main-content">
          <div className="Modal-content__header">
            <div className="Modal-source">
              Source: {decodeHtmlCharCodes(props.data.source.name)}
            </div>
          </div>
          <div className="Modal-content__main">
            {props.data.image && (
              <div className="Modal-image__container">
                <img className="Modal-image" src={props.data.image} alt="News image" />
              </div>
            )}
            <div
              className="Modal-content__info"
              style={props.data.image ? { width: '60%' } : { width: '100%' }}
            >
              <div className="Modal-title">{decodeHtmlCharCodes(props.data.title)}</div>
              <div className="Modal-description" ref={descriptionDiv}></div>
            </div>
          </div>
          <div className="Modal-content__footer">
            <div className="Modal-date">Publication date: {date}</div>
            <a href={props.data.url} className="Modal-url" target="blank" rel="noreferrer">
              See in source
            </a>
          </div>
        </div>
        <div className="Modal-exit" onClick={props.handleResult}>
          <ExitModal />
        </div>
      </div>
    </div>
  );
}

export default Modal;
