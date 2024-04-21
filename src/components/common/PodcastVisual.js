import React from "react";

export const PodcastVisual = ({
  artworkUrl,
  collectionName,
  artistName,
  description,
}) => {
  return (
    <div className="podcast-detail__visual generic_card">
      <div className="podcast-detail__container-image">
        <img src={artworkUrl} alt={`Cover of ${collectionName}`} />
      </div>
      <div className="podcast-detail__info">
        <h1 className="podcast-detail__info-title">{collectionName}</h1>
        <p className="podcast-detail__info-author">by {artistName}</p>
        <p className="podcast-detail__info-description">
          Description: {description}
        </p>
      </div>
    </div>
  );
};
