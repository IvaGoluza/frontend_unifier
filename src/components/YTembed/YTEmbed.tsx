import React from "react";

interface YTEmbedProps {
  embedId: string;
}

const YoutubeEmbed = ({ embedId }: YTEmbedProps) => (
  <div className="video-responsive">
    <iframe
      className="mb-32 mt-2 h-64 w-80 sm:w-96 md:mt-8 md:h-64 md:w-96 lg:mb-0 lg:h-80 lg:w-[30rem]"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;
