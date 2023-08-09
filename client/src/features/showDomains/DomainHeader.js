import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";



// style
import './DomainHeader.css';
// components
import { H1 } from "../../components/fonts/Headings";
import { GreyIconButton } from "../../components/buttons/IconButtons";
// utilities
import { getFaviconFromUrl } from '../../utilities/getFaviconFromUrl';
//server side
import { fetchTitle } from '../titleAndDescription/titleSlice';
import { fetchDescription } from '../titleAndDescription/descriptionSlice';



export function DomainHeader () {
    const dispatch = useDispatch();

    //getting value from URL
    const {slugPath} = useParams()

    // get domain data from store
    const domains = useSelector(state => state.domains.domainsList);
    const domain = domains.find((domain) => domain.slug === slugPath);

    // Get Meta Title Data
    const { data, status, error } = useSelector(state => state.title);
    // Get Meta Descritpion Data
    const { descriptionData, descriptionStatus, descriptionError } = useSelector(state => state.description);

    useEffect(() => {
        dispatch(fetchTitle(domain.url));
        dispatch(fetchDescription(domain.url));
    }, [domain]);


    return (
        <div className='single_domain-header_w'>
            <img alt='logo' className="single_domain-header-icon" src={getFaviconFromUrl(domain.url, 128)}></img>
            <div className="single_domain-header-content_w">
                <H1 copy={domain.name} />
                <div className="single_domain-header-title_and_description_w">
                    <span>title:&nbsp;</span>
                    {status === 'loading' && <span>...</span>}
                    {(data && status === 'succeeded') && <span>{data}</span>}
                    {status === 'failed' && <span>Error: {error}</span>}
                    
                    <span>&nbsp;| description:&nbsp;</span>
                    {descriptionStatus === 'loading' && <span>...</span>}
                    {(descriptionData && descriptionStatus === 'succeeded') && <span>{descriptionData}</span>}
                    {descriptionStatus === 'failed' && <span>Error: {descriptionError}</span>}
                </div>
            </div>
            <GreyIconButton target="_blank" href={domain.url} iconType="open_in_new" />
        </div>
    );
}