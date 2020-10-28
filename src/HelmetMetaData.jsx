import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
export default function HelmetMetaData(props) {
    let location = useLocation();
    let currentUrl = "https://memento-front-end.herokuapp.com/" + location.pathname;
    let quote = props.quote !== undefined ? props.quote : "";
    let title = props.title !== undefined ? props.title : "Memento - Showcase YourSelf!!";
    let image = props.image !== undefined ? props.image : "https://firebasestorage.googleapis.com/v0/b/eportfolio-incognito.appspot.com/o/logo.png?alt=media&token=8d5b9818-6478-4da1-b0fa-de2511802e72";
    let description = props.description !== undefined ? props.description : "Start uploading your projects so you can show it to the public with a professional manner. Search up your friends, associates or colleagues and be able to see their profile, resume and alongside their projects and all the hardwork they have accomplished over the years. Show the world what your really capable of!";
    let hashtag = props.hashtag !== undefined ? props.hashtag : "#memento";
    return (
        <Helmet>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <meta name="description" content={description} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="CampersTribe" />
            <meta property="og:description" content={description} />
        </Helmet>
    );
}