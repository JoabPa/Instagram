import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

const Timeline = () => {
  const { photos } = usePhotos();
  return (
    <div className='container col-span-2'>
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              count={4}
              width={640}
              height={600}
              className='mb-5'
            />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <p key={content.docId}>{content.imageSrc}</p>)
      ) : (
        <p className='text-center text-2xl'>Follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
